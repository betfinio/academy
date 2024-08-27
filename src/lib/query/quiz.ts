import { fetchQuiz } from '@/src/lib/api/quiz.ts';
import { useQuery } from '@tanstack/react-query';
import { useSupabase } from 'betfinio_app/supabase';

export const useQuiz = (lesson: number) => {
	const { client } = useSupabase();

	return useQuery({
		queryKey: ['academy', 'quiz', 'lesson', lesson],
		queryFn: () => fetchQuiz(lesson, client),
	});
};
