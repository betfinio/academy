import type { QuizOption as QuizOptionType } from '@/src/lib/types';
import { RadioGroupItem } from '@betfinio/components/ui';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';

interface QuizOptionProps {
	option: QuizOptionType;
	index: number;
	hasError: boolean;
	correct: boolean;
}

export const QuizOption: FC<QuizOptionProps> = ({ option, index, hasError, correct }) => {
	return (
		<label
			className={cx(
				'flex flex-row border border-transparent items-center gap-2 rounded-xl p-3 px-4 bg-background cursor-pointer hover:bg-primary-light duration-100',
				hasError && '!border-red-400',
				correct && '!border-green-400',
			)}
		>
			<RadioGroupItem value={index.toString()} className={'shrink-0'} />
			{option.content}
		</label>
	);
};
