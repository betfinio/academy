import type { QuizOption as QuizOptionType } from '@/src/lib/types';
import { RadioGroup } from '@betfinio/components/ui';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { QuizOption } from './QuizOption';

interface QuizQuestionProps {
	index: number;
	question: string;
	options: QuizOptionType[];
	exp?: number;
	selectedAnswer?: number;
	correctAnswer?: number;
	errorAnswers?: Set<number>;
	onOptionChange: (questionIndex: number, optionId: number) => void;
}

export const QuizQuestion: FC<QuizQuestionProps> = ({ index, question, options, exp, selectedAnswer, correctAnswer, errorAnswers, onOptionChange }) => {
	return (
		<motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.5 }}>
			<div className="flex justify-between items-center">
				<span className="text-lg font-semibold">
					{index + 1}. {question}
				</span>
				<span className={cx('font-semibold text-secondary-foreground opacity-0 duration-500', exp && 'opacity-100')}>+{exp}XP</span>
			</div>
			<div className={cx('mt-4 flex flex-col gap-2', correctAnswer !== undefined && 'pointer-events-none')}>
				<RadioGroup
					onValueChange={(value: string) => onOptionChange(index, Number(value))}
					disabled={correctAnswer !== undefined}
					value={(selectedAnswer !== undefined ? selectedAnswer : -1).toString()}
				>
					{options.map((option) => (
						<QuizOption
							key={option.id}
							option={option}
							index={option.id}
							hasError={errorAnswers?.has(option.id) || false}
							correct={correctAnswer === option.id}
						/>
					))}
				</RadioGroup>
			</div>
		</motion.div>
	);
};
