import { fetchDocs } from '@/src/lib/api';
import type { DocumentProps } from '@/src/lib/types.ts';
import { useQuery } from '@tanstack/react-query';
import { SupabaseClient, useSupabase } from 'betfinio_app/supabase';

export const useDocs = (lang: string) => {
	const { client } = useSupabase();
	return useQuery<DocumentProps[]>({
		queryKey: ['academy', 'docs', lang],
		queryFn: () => fetchDocs(lang, client),
	});
};
