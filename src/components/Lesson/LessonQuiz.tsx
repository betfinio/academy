import { Button } from 'betfinio_app/button';
import type { FC } from 'react';

export type QuizOption = {
	content: string;
	is_right: boolean;
};

export type QuizQuestion = {
	question: string;
	exp: number;
	options: QuizOption[];
};

export type Quiz = QuizQuestion[];

export const quizQuestions = [
	{
		question: 'How to ..?',
		exp: 100,
		options: [
			{ content: 'Answer 1', is_right: false },
			{ content: 'Answer 2', is_right: false },
			{ content: 'Answer 3', is_right: false },
			{ content: 'Answer 4', is_right: true },
		],
	},

	{
		question: 'How to ..?',
		exp: 50,
		options: [
			{ content: 'Answer 1', is_right: true },
			{ content: 'Answer 2', is_right: false },
			{ content: 'Answer 3', is_right: false },
			{ content: 'Answer 4', is_right: false },
		],
	},
];

export const LessonQuiz = () => {
	const questions = quizQuestions ?? [];

	return (
		<div className={'mt-10 bg-[#161A25] rounded-[10px] p-6'}>
			<span className={'text-[#6A6F84]'}>Quiz question:</span>

			<div className={'flex flex-col gap-8'}>
				{questions.map(({ question, options, exp }, index) => (
					<div key={index}>
						<div className={'flex justify-between items-center'}>
							<span className={'text-lg font-semibold'}>
								{index + 1}. {question}
							</span>
							<span className={'font-semibold text-yellow-400'}>+{exp}XP</span>
						</div>

						<div className={'mt-4 flex flex-col gap-2'}>
							{options.map((option) => (
								<QuizOption option={option} index={index} key={option.content} />
							))}
						</div>
					</div>
				))}
			</div>

			<div className={'mt-6 flex justify-end'}>
				<Button variant={'default'} className={'text-xs px-8 py-2'}>
					Submit
				</Button>
			</div>
		</div>
	);
};

const QuizOption: FC<{ option: QuizOption; index: number }> = ({ option, index }) => {
	return (
		<label className={'bg-[#201C40] py-2.5 px-4 rounded-[10px] flex items-center gap-2.5 cursor-pointer'}>
			<input type="radio" name={`quiz-${index}`} className={'peer hidden'} />
			<div className={'w-[20px] h-[20px] rounded-full bg-yellow-400 duration-300 peer-checked:bg-red-600'} />
			<span className={'text-xs'}>{option.content}</span>
		</label>
	);
};
