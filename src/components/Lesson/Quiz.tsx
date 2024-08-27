import { useCompleteLesson, useLesson } from '@/src/lib/query';
import { useQuiz } from '@/src/lib/query/quiz.ts';
import type { QuizOption as QuizOptionType } from '@/src/lib/types.ts';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { Button } from 'betfinio_app/button';
import { RadioGroup, RadioGroupItem } from 'betfinio_app/radio-group';
import { Loader } from 'lucide-react';
import type { FC } from 'react';

export const Quiz = () => {
	const { lesson } = Route.useParams();
	const { data: lessonData = null } = useLesson(Number(lesson));
	const { mutate: complete, isPending } = useCompleteLesson();

	const { data: quiz = [] } = useQuiz(Number(lesson));
	const handleClick = () => {
		complete({ lesson: Number(lesson), xp: lessonData?.xp || 100 });
	};

	if (quiz.length === 0) {
		return (
			<div className={'mt-6 flex justify-end'}>
				<Button onClick={handleClick} className={'w-32'}>
					{isPending ? <Loader className={'animate-spin'} /> : 'Complete'}
				</Button>
			</div>
		);
	}
	return (
		<div className={'mt-10  bg-quiz-background rounded-[10px] p-6'}>
			<span className={'text-gray-500'}>Quiz question:</span>
			<div className={'flex flex-col gap-8'}>
				{quiz.map(({ question, options, exp }, index) => (
					<div key={index}>
						<div className={'flex justify-between items-center'}>
							<span className={'text-lg font-semibold'}>
								{index + 1}. {question}
							</span>
							<span className={'font-semibold text-yellow-400'}>+{exp}XP</span>
						</div>

						<div className={'mt-4 flex flex-col gap-2'}>
							<RadioGroup>
								{options.map((option, i) => (
									<QuizOption option={option} index={i} key={option.content} />
								))}
							</RadioGroup>
						</div>
					</div>
				))}
			</div>

			<div className={'mt-6 flex justify-end'}>
				<Button onClick={handleClick} className={'w-32'}>
					{isPending ? <Loader className={'animate-spin'} /> : 'Submit'}
				</Button>
			</div>
		</div>
	);
};

const QuizOption: FC<{ option: QuizOptionType; index: number }> = ({ option, index }) => {
	return (
		<label className={'flex flex-row items-center gap-2 rounded-xl p-3 px-4 bg-primary cursor-pointer hover:bg-primaryLight duration-100'}>
			<RadioGroupItem value={index} />
			{option.content}
		</label>
	);
};
