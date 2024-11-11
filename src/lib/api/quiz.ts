import type { QuizQuestion } from '@/src/lib/types.ts';
import { shuffle } from '@/src/utils/utils.ts';
import type { SupabaseClient } from 'betfinio_app/supabase';

export const fetchQuiz = async (lesson: number, client?: SupabaseClient): Promise<Record<string, QuizQuestion[]>> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const quiz = await client.from('lessons').select('quiz').eq('id', lesson).single();

	const quizData = quiz.data?.quiz;
	if (quizData) {
		if (quizData.en) {
			for (const quizEn of quizData.en) {
				(quizEn as QuizQuestion).options.forEach((option, i: number) => {
					option.id = i;
				});
			}
			quizData.en = quizData.en.map((quizEn: QuizQuestion) => {
				return { ...quizEn, options: shuffle(quizEn.options ?? []) };
			});
		}
	}

	return quiz.data?.quiz || [];
};
