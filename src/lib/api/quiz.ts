import type { QuizQuestion } from '@/src/lib/types.ts';
import type { SupabaseClient } from 'betfinio_app/supabase';

const mockQuestions: QuizQuestion[] = [
	{
		question: 'How to ..?',
		exp: 25,
		options: [
			{ content: 'Answer 1', is_right: false },
			{ content: 'Answer 2', is_right: false },
			{ content: 'Answer 3', is_right: false },
			{ content: 'Answer 4', is_right: true },
		],
	},

	{
		question: 'How to ..?',
		exp: 25,
		options: [
			{ content: 'Answer 1', is_right: true },
			{ content: 'Answer 2', is_right: false },
			{ content: 'Answer 3', is_right: false },
			{ content: 'Answer 4', is_right: false },
		],
	},
];

export const fetchQuiz = async (lesson: number, client?: SupabaseClient): Promise<QuizQuestion[]> => {
	return new Promise<QuizQuestion[]>((resolve) => {
		setTimeout(() => {
			resolve(mockQuestions);
		}, 2000);
	});
};
