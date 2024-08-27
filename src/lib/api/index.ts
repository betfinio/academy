import type { DocumentProps } from '@/src/lib/types.ts';
import type { SupabaseClient } from 'betfinio_app/supabase';

export const fetchDocs = async (lang: string, client?: SupabaseClient): Promise<DocumentProps[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const data = await client.from('documents').select('*').eq('language', lang);
	console.log(data);
	return data.data as DocumentProps[];
};
