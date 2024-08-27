import { accordion } from '@/src/components/Advanced/AdvancedCollapseList';
import type { AdvancedLessonBlock, DocumentProps } from '@/src/lib/types.ts';
import { mockServerResponse } from '@/src/utils/utils';
import type { SupabaseClient } from 'betfinio_app/supabase';

export const fetchDocs = async (lang: string, client?: SupabaseClient) => {
	if (!client) {
		throw new Error('No client provided');
	}
	const data = await client.from('documents').select('*').eq('language', lang).returns<DocumentProps[]>();
	return data.data;
};
export const fetchAdvancedLessonsDocs = async (client?: SupabaseClient) => {
	if (!client) {
		throw new Error('No client provided');
	}
	//const data = await client.from('documents').select('*').eq('language', lang).returns<AdvancedLessonBlock[]>();
	return mockServerResponse(accordion, 1000);
};
