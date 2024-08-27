import { useSupabase, SupabaseClient } from 'betfinio_app/supabase';
import { useQuery } from '@tanstack/react-query';
import type { DocumentProps } from '@/src/lib/types.ts';
import { fetchDocs } from '@/src/lib/api';

export  const useDocs = (lang: string) => {
	const { client } = useSupabase();
	return useQuery<DocumentProps[]>({
		queryKey: ['academy', 'docs', lang],
		queryFn: () => fetchDocs(lang, client),
	});
};
