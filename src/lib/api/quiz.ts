import type { QuizQuestion } from '@/src/lib/types.ts';
import type { SupabaseClient } from 'betfinio_app/supabase';

export const fetchQuiz = async (lesson: number, client?: SupabaseClient): Promise<QuizQuestion[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const quiz = await client.from('lessons').select('quiz').eq('id', lesson).single();
	console.log(quiz.data);

	return quiz.data?.quiz || [];
};
