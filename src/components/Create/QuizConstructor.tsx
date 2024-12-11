import type { QuizOption, QuizQuestion } from '@/src/lib/types.ts';
import { cn } from '@betfinio/components';
import { Button, Checkbox, Input } from '@betfinio/components/ui';
import { TrashIcon } from 'lucide-react';
import type { FC } from 'react';

const QuizConstructor: FC<{ quiz: QuizQuestion[]; setQuiz: (quiz: QuizQuestion[]) => void }> = ({ quiz, setQuiz }) => {
	const handleNewQuestion = () => {
		setQuiz([
			...quiz,
			{
				exp: 100,
				question: 'What is your question?',
				options: [
					{ content: 'Answer 1', is_right: true, id: 0 },
					{ content: 'Answer 2', is_right: false, id: 1 },
					{ content: 'Answer 3', is_right: false, id: 2 },
					{ content: 'Answer 4', is_right: false, id: 3 },
				],
			},
		]);
	};
	const handleQuestionChange = (text: string, index: number) => {
		const newQuiz = [...quiz];
		newQuiz[index].question = text;
		setQuiz(newQuiz);
	};

	const handleXpChange = (xp: number, index: number) => {
		const newQuiz = [...quiz];
		newQuiz[index].exp = xp;
		setQuiz(newQuiz);
	};

	const handleOptionsChange = (options: QuizOption[], index: number) => {
		const newQuiz = [...quiz];
		newQuiz[index].options = options;
		setQuiz(newQuiz);
	};

	const handleDelete = (index: number) => {
		const newQuiz = [...quiz];
		newQuiz.splice(index, 1);
		setQuiz(newQuiz);
	};

	return (
		<div className={'flex flex-col border p-2 gap-2'}>
			{quiz.map((q, i) => (
				<SingleQuestion
					key={i}
					quiz={q}
					onQuestionChange={(text) => handleQuestionChange(text, i)}
					onXpChange={(xp) => handleXpChange(xp, i)}
					onOptionsChange={(options) => handleOptionsChange(options, i)}
					onDelete={() => handleDelete(i)}
				/>
			))}
			<Button variant={'tertiary'} onClick={handleNewQuestion}>
				Add question
			</Button>
		</div>
	);
};

interface SingleQuestionProps {
	quiz: QuizQuestion;
	onQuestionChange: (text: string) => void;
	onXpChange: (xp: number) => void;
	onOptionsChange: (options: QuizOption[]) => void;
	onDelete: () => void;
}

const SingleQuestion: FC<SingleQuestionProps> = ({ quiz, onQuestionChange, onXpChange, onOptionsChange, onDelete }) => {
	const handleOptionChange = (option: QuizOption, index: number) => {
		const newOptions = [...quiz.options];
		newOptions[index] = option;
		onOptionsChange(newOptions);
	};
	return (
		<div className={'border border-gray-600 rounded-lg p-2'}>
			<div className={'grid grid-cols-12 items-center gap-2'}>
				<div className={'col-span-9'}>
					<Input value={quiz.question} onChange={(e) => onQuestionChange(e.target.value)} />
				</div>
				<div className={'col-span-2'}>
					<Input type={'number'} value={quiz.exp.toString()} onChange={(e) => onXpChange(Number(e.target.value))} />
				</div>
				<div className={'col-span-1 cursor-pointer'} onClick={onDelete}>
					<TrashIcon className={'w-5 h-5 text-red-500'} />
				</div>
			</div>
			<span>Options</span>
			<div className={'grid grid-cols-2 grid-rows-2 gap-2'}>
				{quiz.options.map((option, i) => (
					<Answer key={i} option={option} onChange={(o) => handleOptionChange(o, i)} />
				))}
			</div>
		</div>
	);
};

const Answer: FC<{ option: QuizOption; onChange: (option: QuizOption) => void }> = ({ option, onChange }) => {
	return (
		<div className={cn('flex flex-row items-center gap-2 border p-2 rounded-lg', option.is_right ? 'border-green-500/50' : 'border-red-500/50')}>
			<Input value={option.content} onChange={(e) => onChange({ ...option, content: e.target.value })} />

			<Checkbox checked={option.is_right} onCheckedChange={(checked: boolean) => onChange({ ...option, is_right: checked })} />
		</div>
	);
};

export default QuizConstructor;
