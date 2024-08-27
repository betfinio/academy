import { fetchAdvancedLessonsDocs, fetchDocs } from '@/src/lib/api';
import type { DocumentProps } from '@/src/lib/types.ts';
import { useQuery } from '@tanstack/react-query';
import { SupabaseClient, useSupabase } from 'betfinio_app/supabase';

export const useDocs = (lang: string) => {
	const { client } = useSupabase();
	return useQuery({
		queryKey: ['academy', 'docs', lang],
		queryFn: () => fetchDocs(lang, client),
	});
};
export const useAdvancedLessonsDocs = () => {
	const { client } = useSupabase();
	return useQuery({
		queryKey: ['academy', 'advanced','lessons' ],
		queryFn: () => fetchAdvancedLessonsDocs(client),
	});
};
