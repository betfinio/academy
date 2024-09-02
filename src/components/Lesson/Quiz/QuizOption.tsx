import type { QuizOption as QuizOptionType } from '@/src/lib/types';
import { RadioGroupItem } from 'betfinio_app/radio-group';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';

interface QuizOptionProps {
	option: QuizOptionType;
	index: string;
	hasError: boolean;
	correct: boolean;
}

export const QuizOption: FC<QuizOptionProps> = ({ option, index, hasError, correct }) => {
	return (
		<label
			className={cx(
				'flex flex-row border border-transparent items-center gap-2 rounded-xl p-3 px-4 bg-primary cursor-pointer hover:bg-primaryLight duration-100',
				hasError && '!border-red-400',
				correct && '!border-green-400',
			)}
		>
			<RadioGroupItem value={index} classname={'shrink-0'} />
			{option.content}
		</label>
	);
};
