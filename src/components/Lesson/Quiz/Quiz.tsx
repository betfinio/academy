import { QuizCompleteModal } from '@/src/components/Lesson/Quiz/QuizCompleteModal.tsx';
import { useCompleteLesson, useLesson, useLessonStatus } from '@/src/lib/query';
import { useQuiz } from '@/src/lib/query/quiz';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson';
import { roundToOneDecimalPoint } from '@/src/utils/utils';
import { ZeroAddress } from '@betfinio/abi';
import { Link } from '@tanstack/react-router';
import { Button } from 'betfinio_app/button';
import { Dialog, DialogContent } from 'betfinio_app/dialog';
import { cx } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Loader } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { QuizQuestion } from './QuizQuestion';

const encodeErrors = (errors: Record<string, Set<string>>): Record<string, string[]> => {
	return Object.fromEntries(Object.entries(errors).map(([question, error]) => [question, Array.from(error)]));
};

const decodeErrors = (errors: Record<string, string[]>): Record<string, Set<string>> => {
	return Object.fromEntries(Object.entries(errors).map(([question, error]) => [question, new Set(error)]));
};

export const Quiz: FC = () => {
	const { lesson } = Route.useParams();
	const lessonId = Number(lesson);
	const { data: lessonData = null } = useLesson(lessonId);
	const { address = ZeroAddress } = useAccount();
	const { data: lessonStatus } = useLessonStatus(lessonId, address);
	const { mutate: complete, isSuccess, data: mutationData } = useCompleteLesson();
	const { data: quiz = [], isLoading: isQuizLoading } = useQuiz(lessonId);

	const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | undefined>>(() => {
		const savedData = JSON.parse(localStorage.getItem(`lesson-${lesson}-${address}`) || '{}');
		return savedData?.selected ?? {};
	});

	const [errorAnswers, setErrorAnswers] = useState<Record<number, Set<string>>>(() => {
		const savedData = JSON.parse(localStorage.getItem(`lesson-${lesson}-${address}`) || '{}');
		return decodeErrors(savedData?.errors ?? {});
	});

	const [correctAnswers, setCorrectAnswers] = useState<Record<number, string | undefined>>(() => {
		const savedData = JSON.parse(localStorage.getItem(`lesson-${lesson}-${address}`) || '{}');
		return savedData?.correct ?? {};
	});

	const [exp, setExp] = useState<Record<number, number>>({});
	const [modalOpen, setModalOpen] = useState(false);

	const finished = useMemo(() => lessonStatus?.done || isSuccess || Boolean(mutationData), [lessonStatus, isSuccess, mutationData]);

	useEffect(() => {
		validateAnswers();
	}, [quiz.length]);

	useEffect(() => {
		if (mutationData?.status?.toString().startsWith('2')) {
			setModalOpen(true);
		} else if (mutationData?.error) {
			console.error(mutationData.error);
		}
	}, [mutationData]);

	const allAnswered = useMemo(() => quiz.length > 0 && quiz.every((_, index) => selectedAnswers[index] !== undefined), [quiz, selectedAnswers]);

	const validateAnswers = (): { hasError: boolean; syncExp: number } => {
		if (quiz.length === 0) return { hasError: true, syncExp: 0 };

		let hasError = false;
		let syncExp = 0;
		const errors = { ...errorAnswers };
		const correct = { ...correctAnswers };

		for (const [strQuestion, answer] of Object.entries(selectedAnswers)) {
			const questionIndex = Number(strQuestion);
			const questionData = quiz[questionIndex];
			const correctAnswerIndex = questionData.options.findIndex((option) => option.is_right).toString();

			if (answer !== correctAnswerIndex) {
				hasError = true;
				errors[questionIndex] = errors[questionIndex] || new Set();
				if (answer) errors[questionIndex].add(answer);
			} else {
				correct[questionIndex] = answer;
				const newExp = errors[questionIndex]?.size ? roundToOneDecimalPoint(questionData.exp / 2) : questionData.exp;
				syncExp += newExp;
				setExp((prev) => ({ ...prev, [questionIndex]: newExp }));
			}
		}

		setErrorAnswers(errors);
		setCorrectAnswers(correct);

		localStorage.setItem(`lesson-${lesson}-${address}`, JSON.stringify({ errors: encodeErrors(errors), correct, selected: selectedAnswers }));

		return { hasError, syncExp };
	};

	const calculateXp = () => Object.values(exp).reduce((acc, xp) => acc + xp, 0);

	const handleSubmit = async () => {
		if (!allAnswered) return;

		const { hasError, syncExp } = validateAnswers();
		if (!hasError) complete({ lesson: lessonId, xp: syncExp || lessonData?.xp || 0 });
	};

	const handleOptionChange = (questionIndex: number, optionIndex: string) => {
		setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
	};

	const handleClose = () => setModalOpen(false);

	if (!quiz.length) return null;

	return (
		<Dialog open={modalOpen} onOpenChange={handleClose}>
			<DialogContent className="academy">
				<QuizCompleteModal onClose={handleClose} newXp={calculateXp()} />
			</DialogContent>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1 }}
				className={cx('mt-10 bg-quiz-background rounded-[10px] p-6', isQuizLoading && 'animate-pulse')}
			>
				<span className="text-gray-500">Quiz question:</span>
				<div className="flex flex-col gap-8 min-h-[300px]">
					{isQuizLoading ? (
						<div className="w-full h-full flex items-center justify-center">
							<Loader className="animate-spin" />
						</div>
					) : (
						quiz.map(({ question, options }, index) => (
							<QuizQuestion
								key={index}
								index={index}
								question={question}
								options={options}
								exp={exp[index]}
								selectedAnswer={selectedAnswers[index]}
								correctAnswer={correctAnswers[index]}
								errorAnswers={errorAnswers[index]}
								onOptionChange={handleOptionChange}
							/>
						))
					)}
				</div>
				<div className="mt-6 flex justify-end">
					<AnimatePresence mode="wait">
						{finished ? (
							<motion.div key="nextLesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
								<Link to="/advanced">
									<Button className="cursor-pointer group">
										<span className="duration-300">Next lesson</span>
										<ArrowRight height={18} className="group-hover:translate-x-[3px] duration-300" />
									</Button>
								</Link>
							</motion.div>
						) : (
							<motion.div key="submitButton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
								<Button disabled={isQuizLoading || !allAnswered || finished} onClick={handleSubmit} className="w-32 duration-300">
									Submit
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</Dialog>
	);
};
