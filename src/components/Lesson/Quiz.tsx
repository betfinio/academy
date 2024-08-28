import { QuizCompleteModal } from '@/src/components/Lesson/QuizCompleteModal.tsx';
import { useCompleteLesson, useLesson, useLessonStatus } from '@/src/lib/query';
import { useQuiz } from '@/src/lib/query/quiz.ts';
import type { QuizOption as QuizOptionType, QuizQuestion } from '@/src/lib/types.ts';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { roundToOneDecimalPoint } from '@/src/utils/utils.ts';
import { ZeroAddress } from '@betfinio/abi';
import { Button } from 'betfinio_app/button';
import { Dialog, DialogContent } from 'betfinio_app/dialog';
import { RadioGroup, RadioGroupItem } from 'betfinio_app/radio-group';
import { cx } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Loader } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

const encodeErrors = (errors: Record<string, Set<string>>): Record<string, string[]> => {
	return Object.entries(errors).reduce((acc, [question, error]) => {
		acc[question] = Array.from(error);
		return acc;
	}, {});
};

const decodeErrors = (errors: Record<string, string[]>): Record<string, Set<string>> => {
	return Object.entries(errors).reduce((acc, [question, error]) => {
		acc[question] = new Set(error);
		return acc;
	}, {});
};

export const Quiz = () => {
	const { lesson } = Route.useParams();
	const { data: lessonData = null } = useLesson(Number(lesson));
	const { address = ZeroAddress } = useAccount();
	const { data: lessonStatus } = useLessonStatus(Number(lesson), address);
	const { mutate: complete, isSuccess, data: mutationData } = useCompleteLesson();

	const { data: quiz = [], isLoading: isQuizLoading } = useQuiz(Number(lesson));

	const localStorageErrors = decodeErrors(JSON.parse(localStorage.getItem(`lesson-${lesson}`))?.errors ?? {});
	const localStorageSelected = JSON.parse(localStorage.getItem(`lesson-${lesson}`))?.selected ?? {};
	const localStorageCorrect = JSON.parse(localStorage.getItem(`lesson-${lesson}`))?.correct ?? {};

	const [selectedAnswers, setSelectedAnswers] = useState<{
		[key: number]: string | undefined;
	}>(localStorageSelected ?? {});
	const [errorAnswers, setErrorAnswers] = useState<{ [key: number]: Set<string> }>(localStorageErrors ?? {});
	const [correctAnswer, setCorrectAnswers] = useState<{ [key: number]: string | undefined }>(localStorageCorrect ?? {});
	const [exp, setExp] = useState<{ [key: number]: number }>({});

	const [modalOpen, setModalOpen] = useState(false);

	const finished = useMemo(() => {
		return !!(lessonStatus?.done === true || isSuccess || mutationData);
	}, [isSuccess, mutationData, lessonStatus]);

	const handleOptionChange = (questionIndex: number, optionIndex: string) => {
		setSelectedAnswers((prev) => ({
			...prev,
			[questionIndex]: optionIndex,
		}));
	};

	useEffect(() => {
		validateAnswers();
	}, [quiz.length]);

	useEffect(() => {
		if (mutationData) {
			const { error, status } = mutationData;
			if (String(status).startsWith('2')) {
				setModalOpen(true);
			} else if (error) {
				console.error(error);
			}
		}
	}, [isSuccess, mutationData]);

	const allAnswered = useMemo(() => {
		return quiz.length > 0 && quiz.every((_, index) => selectedAnswers[index] !== undefined);
	}, [quiz, selectedAnswers]);

	const validateAnswers = (): { hasError: boolean; syncExp: number } => {
		if (quiz.length === 0) return;
		let hasError = false;
		const errors = { ...errorAnswers };
		const correct = { ...correctAnswer };
		const answers = Object.entries(selectedAnswers);
		let syncExp = 0;
		for (const [question, answer] of answers) {
			const correctAnswer = (quiz[question] as QuizQuestion).options.findIndex((option) => option.is_right).toString();
			if (answer !== correctAnswer) {
				hasError = true;
				if (!errors[question]) {
					errors[question] = new Set();
				}
				errors[question].add(answer);
			} else {
				correct[question] = answer;
				const newExp = errors[question]?.size > 0 ? roundToOneDecimalPoint(quiz[question].exp / 2) : quiz[question].exp;
				syncExp += newExp;

				setExp((prevState) => ({ ...prevState, [question]: newExp }));
			}
		}

		setErrorAnswers(errors);
		setCorrectAnswers(correct);
		const normalizedErrors = encodeErrors(errors);
		localStorage.setItem(
			`lesson-${lesson}`,
			JSON.stringify({
				errors: normalizedErrors,
				correct,
				selected: selectedAnswers,
			}),
		);
		return { hasError, syncExp };
	};

	const calculateXp = (): number => {
		return Object.entries(exp).reduce((acc, [question, exp]) => {
			return acc + exp;
		}, 0);
	};

	const handleSubmit = async () => {
		if (!allAnswered) {
			return;
		}
		const { hasError, syncExp } = validateAnswers();
		if (hasError) {
			return;
		}

		complete({ lesson: Number(lesson), xp: syncExp || lessonData.xp });
	};

	const handleClose = () => {
		setModalOpen(false);
	};

	return (
		<Dialog open={modalOpen} onOpenChange={handleClose}>
			<DialogContent className={'academy'}>
				<QuizCompleteModal onClose={handleClose} newXp={calculateXp()} />
			</DialogContent>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1 }}
				className={cx('mt-10  bg-quiz-background rounded-[10px] p-6', isQuizLoading && 'animate-pulse')}
			>
				<span className={'text-gray-500'}>Quiz question:</span>
				<div className={'flex flex-col gap-8 min-h-[300px]'}>
					{isQuizLoading ? (
						<div className={'w-full h-full grow flex items-center justify-center'}>
							<Loader className={'animate-spin'} />
						</div>
					) : (
						quiz.map(({ question, options }, index) => (
							<motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.5 }} key={index}>
								<div className={'flex justify-between items-center'}>
									<span className={'text-lg font-semibold'}>
										{index + 1}. {question}
									</span>
									<span className={cx('font-semibold text-yellow-400 opacity-0 duration-500', exp[index] && 'opacity-100')}>+{exp[index]}XP</span>
								</div>

								<div className={cx('mt-4 flex flex-col gap-2', correctAnswer[index] !== undefined && 'pointer-events-none')}>
									<RadioGroup
										onValueChange={(value) => handleOptionChange(index, value.toString())}
										disabled={correctAnswer[index] !== undefined}
										value={selectedAnswers[index] || ''}
									>
										{options.map((option, i) => {
											const optionIndex = i.toString();
											return (
												<motion.div
													initial={{ opacity: 0, y: 5 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: index + i * 0.1 }}
													key={option.content}
												>
													<QuizOption
														hasError={errorAnswers[index]?.has(optionIndex)}
														correct={correctAnswer[index] === optionIndex}
														option={option}
														index={optionIndex}
													/>
												</motion.div>
											);
										})}
									</RadioGroup>
								</div>
							</motion.div>
						))
					)}
				</div>

				<div className={'mt-6 flex justify-end'}>
					<AnimatePresence mode={'wait'}>
						{finished ? (
							<motion.div key="nextLesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
								<Button className={' cursor-pointer group'}>
									<span className={'duration-300'}>Next lesson</span>
									<ArrowRight height={18} className={'group-hover:translate-x-[3px] duration-300'} />
								</Button>
							</motion.div>
						) : (
							<motion.div key="submitButton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
								<Button disabled={isQuizLoading || !allAnswered || finished} onClick={handleSubmit} className={'w-32 duration-300'}>
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

const QuizOption: FC<{ option: QuizOptionType; index: number; hasError: boolean; correct: boolean }> = ({ option, index, hasError, correct }) => {
	return (
		<label
			className={cx(
				'flex flex-row border border-transparent items-center gap-2 rounded-xl p-3 px-4 bg-primary cursor-pointer hover:bg-primaryLight duration-100',
				hasError && '!border-red-400',
				correct && '!border-green-400',
			)}
		>
			<RadioGroupItem value={index} />
			{index}. {option.content}
		</label>
	);
};
