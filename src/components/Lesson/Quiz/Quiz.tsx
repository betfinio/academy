import { QuizCompleteModal } from '@/src/components/Lesson/Quiz/QuizCompleteModal';
import { DEFAULT_MINIMAL_STAKE } from '@/src/lib/global.ts';
import { useAdvancedLessons, useCompleteLesson, useLesson, useLessonStatus, useNextSectionId, useStaked } from '@/src/lib/query';
import { useQuiz } from '@/src/lib/query/quiz';
import { Route } from '@/src/routes/_index/lesson/$section/$lesson.tsx';
import { roundToOneDecimalPoint } from '@/src/utils/utils';
import { ZeroAddress } from '@betfinio/abi';
import { cn } from '@betfinio/components';
import { Button, Dialog, DialogContent, DialogDescription, DialogTitle } from '@betfinio/components/ui';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, House, Loader } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { QuizQuestion } from './QuizQuestion';

type Errors = Record<string, Set<number>>;
type SerializedErrors = Record<string, number[]>;
type Selected = Record<string, number>;
type Correct = Record<string, number>;

interface answersState {
	errors: Errors;
	selected: Selected;
	correct: Correct;
}

const getInitialQuizState = (lesson: string, address: string): answersState => {
	const storedData = JSON.parse(localStorage.getItem(`lesson-${lesson}-${address}`) || '{}');

	const errors = decodeErrors(storedData?.errors || {});
	const selected = storedData?.selected || {};
	const correct = storedData?.correct || {};

	return {
		selected,
		errors,
		correct,
	};
};

const encodeErrors = (errors: Errors): SerializedErrors => {
	return Object.fromEntries(Object.entries(errors).map(([question, errorSet]) => [question, Array.from(errorSet)]));
};

const decodeErrors = (errors: SerializedErrors): Errors => {
	return Object.fromEntries(Object.entries(errors).map(([question, errorArray]) => [question, new Set<number>(errorArray)]));
};

export const Quiz = () => {
	const { t, i18n } = useTranslation('academy');
	const { lesson, section } = Route.useParams();
	const { data: lessonData = null } = useLesson(Number(lesson));
	const { address = ZeroAddress } = useAccount();
	const { data: lessonStatus } = useLessonStatus(Number(lesson), address);
	const { mutate: complete, isSuccess, data: mutationData } = useCompleteLesson();
	const { data: staked = 0n } = useStaked(address || ZeroAddress);
	const { data: quiz = {}, isLoading: isQuizLoading } = useQuiz(Number(lesson));
	const { data: lessons = [] } = useAdvancedLessons(Number(section));
	const { data: nextSection } = useNextSectionId(Number(section));

	const nextLocked = useMemo(() => {
		return BigInt(DEFAULT_MINIMAL_STAKE) * 10n ** 18n > staked;
	}, [staked]);

	const navigate = useNavigate();

	const finalQuiz = quiz[i18n.language] || [];
	const current = lessons.findIndex((l) => l.id === Number(lesson));
	const next = lessons[current + 1];
	const handleNext = async () => {
		if (!next) {
			if (nextSection === 0 || nextLocked) {
				await navigate({ to: '/advanced' });
			} else {
				await navigate({ to: '/lesson/$section', params: { section: nextSection } });
			}
		} else {
			await navigate({
				to: '/lesson/$section/$lesson',
				params: { lesson: lessons[current + 1].id.toString(), section: lessons[current + 1].section.toString() },
			});
		}
	};

	const [answers, setAnswers] = useState(() => getInitialQuizState(lesson, address));
	const [exp, setExp] = useState<{ [key: number]: number }>({});
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (finalQuiz.length === 0) return;
		const newState = getInitialQuizState(lesson, address);
		validateAnswers(newState);
		setAnswers(newState);
	}, [lesson, address, finalQuiz.length]);

	const finished = useMemo(() => {
		return !!(lessonStatus?.done === true || isSuccess || mutationData);
	}, [isSuccess, mutationData, lessonStatus]);

	const handleOptionChange = (questionIndex: number, optionId: number) => {
		setAnswers((prev) => ({
			...prev,
			selected: {
				...prev.selected,
				[questionIndex]: optionId,
			},
		}));
	};

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
		return finalQuiz.length > 0 && finalQuiz.every((_, index) => answers.selected[index] !== undefined);
	}, [finalQuiz, answers.selected]);

	const validateAnswers = (answers: answersState): { hasError: boolean; syncExp: number } => {
		if (finalQuiz.length === 0) return { hasError: true, syncExp: 0 };

		let hasError = false;
		const newErrors: Errors = { ...answers.errors };
		const newCorrect: Correct = { ...answers.correct };
		setExp({});

		let syncExp = 0;
		finalQuiz.forEach((q, i) => {
			const correctOption = q.options.find((option) => option.is_right);
			const correctAnswerId = correctOption?.id;
			const selectedAnswerId = answers.selected[i];
			if (selectedAnswerId !== correctAnswerId) {
				hasError = true;
				newErrors[i] = newErrors[i] || new Set<number>();
				if (selectedAnswerId || selectedAnswerId === 0) newErrors[i].add(selectedAnswerId);
			} else {
				newCorrect[i] = selectedAnswerId;
				const newExp = newErrors[i]?.size ? roundToOneDecimalPoint(q.exp / 2) : q.exp;
				syncExp += newExp;
				setExp((prev) => ({ ...prev, [i]: newExp }));
			}
		});

		setAnswers((prev) => ({
			...prev,
			errors: newErrors,
			correct: newCorrect,
		}));

		saveToLocalStorage(newErrors, newCorrect, answers.selected);

		return { hasError, syncExp };
	};

	const saveToLocalStorage = (errors: Errors, correct: Correct, selected: Selected) => {
		const encodedErrors = encodeErrors(errors);
		localStorage.setItem(
			`lesson-${lesson}-${address}`,
			JSON.stringify({
				errors: encodedErrors,
				correct,
				selected,
			}),
		);
	};

	const calculateXp = (): number => {
		return Object.values(exp).reduce((acc, xp) => acc + xp, 0);
	};

	const handleSubmit = async () => {
		if (!allAnswered) return;

		const { hasError, syncExp } = validateAnswers(answers);
		if (hasError) return;

		complete({ lesson: Number(lesson), xp: syncExp || lessonData?.xp || 0 });
	};

	const handleClose = () => {
		setModalOpen(false);
	};

	if (finalQuiz.length === 0) {
		return null;
	}

	return (
		<Dialog open={modalOpen} onOpenChange={handleClose}>
			<DialogContent className={'academy'}>
				<QuizCompleteModal onButtonClick={handleNext} onClose={handleClose} newXp={calculateXp()} />
				<DialogTitle className={'hidden'} />
				<DialogDescription className={'hidden'} />
			</DialogContent>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1 }}
				className={cn('mt-10 bg-quiz-background relative rounded-[10px] p-6 duration-300', isQuizLoading && 'animate-pulse')}
			>
				{address === ZeroAddress && <WalletWarning />}
				<div className={cn(address === ZeroAddress && 'blur-sm pointer-events-none')}>
					<span className={'text-gray-500'}>{t('quiz.quiz')}:</span>
					<div className={'flex flex-col gap-8 min-h-[300px]'}>
						{isQuizLoading ? (
							<div className={'w-full h-full grow flex items-center justify-center'}>
								<Loader className={'animate-spin'} />
							</div>
						) : (
							finalQuiz.map(({ question, options }, index) => (
								<QuizQuestion
									key={index}
									index={index}
									question={question}
									options={options}
									exp={exp[index]}
									selectedAnswer={answers.selected[index]}
									correctAnswer={answers.correct[index]}
									errorAnswers={answers.errors[index]}
									onOptionChange={handleOptionChange}
								/>
							))
						)}
					</div>
					<div className={'mt-6 flex justify-end'}>
						<AnimatePresence mode={'wait'}>
							{finished ? (
								<motion.div key="nextLesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
									<Button className={'cursor-pointer group'} onClick={handleNext}>
										{next ? (
											<>
												<span className={'duration-300'}>{t('quiz.nextLesson')}</span>
												<ArrowRight height={18} className={'group-hover:translate-x-[3px] duration-300'} />
											</>
										) : nextSection === 0 || nextLocked ? (
											<>
												<span className={'duration-300'}>{t('quiz.overview')}</span>
												<House height={18} className={'duration-300'} />
											</>
										) : (
											<>
												<span className={'duration-300'}>{t('quiz.nextSection')}</span>
												<ArrowRight height={18} className={'group-hover:translate-x-[3px] duration-300'} />
											</>
										)}
									</Button>
								</motion.div>
							) : (
								<motion.div key="submitButton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
									<Button disabled={isQuizLoading || !allAnswered || finished} onClick={handleSubmit} className={'w-32 duration-300'}>
										{t('quiz.submit')}
									</Button>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</motion.div>
		</Dialog>
	);
};

export const WalletWarning: FC = () => {
	const { t } = useTranslation();
	return (
		<div className="sticky top-0 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-center font-bold py-4 px-6 rounded-lg shadow-lg">
			<div className="relative z-10">
				<span className="text-lg">{t('quiz.walletNotConnected')}</span>
				<p className="mt-1 text-sm">{t('quiz.pleaseConnectYourWallet')}</p>
			</div>
		</div>
	);
};
