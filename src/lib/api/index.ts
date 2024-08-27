import { type AdvancedLesson, type AdvancedLessonSection, type Document, type Status, initialStatus } from '@/src/lib/types.ts';
import type { SupabaseClient } from 'betfinio_app/supabase';
import type { Address } from 'viem';

export const fetchDocs = async (lang: string, client?: SupabaseClient): Promise<Document[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const data = await client.from('documents').select('*').eq('language', lang).returns<Document[]>();
	return data.data || [];
};
export const fetchAdvancedSections = async (client?: SupabaseClient): Promise<AdvancedLessonSection[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const sections = await client.from('sections').select('title::text, xp, id').returns<AdvancedLessonSection[]>();
	console.log(sections);
	return sections.data as AdvancedLessonSection[];
};
export const fetchAdvancedLessons = async (id: number, client?: SupabaseClient): Promise<AdvancedLesson[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const sections = await client.from('lessons').select('title::text, xp, id, section').eq('section', id).returns<AdvancedLessonSection[]>();
	return sections.data as AdvancedLesson[];
};

export const fetchLesson = async (id: number, client?: SupabaseClient): Promise<AdvancedLesson> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const lesson = await client.from('lessons').select('title::text, xp, id, section').eq('id', id).maybeSingle<AdvancedLesson>();
	console.log();
	if (!lesson.data) throw new Error('not found');
	return lesson.data;
};

export const fetchSectionStatus = async (sectionId: number, address: Address, client?: SupabaseClient): Promise<Status> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const status = await client
		.from('sections_progress')
		.select('xp, done, completed')
		.eq('member', address.toLowerCase())
		.eq('id', sectionId)
		.maybeSingle<Status>();
	return status.data || initialStatus;
};
export const fetchLessonStatus = async (lessonId: number, address: Address, client?: SupabaseClient): Promise<Status> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const status = await client.from('lessons_progress').select('xp').eq('member', address.toLowerCase()).eq('id', lessonId).maybeSingle<Status>();
	if (!status.data) {
		return initialStatus;
	}
	return { done: true, xp: status.data.xp };
};

export const completeLesson = async (lesson: number, xp: number, address: Address, client?: SupabaseClient): Promise<boolean> => {
	if (!client) {
		throw new Error('No client provided');
	}
	console.log('completing', lesson, xp, address);
	const result = await client.rpc('complete_lesson', { lesson_id: lesson, xp: xp, member: address.toLowerCase() });
	console.log(result);
	return true;
};

export const fetchProgress = async (address: Address, client?: SupabaseClient): Promise<number> => {
	if (!client) {
		throw new Error('No client provided');
	}

	const result = await client.from('sections_progress').select('xp', { count: 'exact' }).eq('member', address.toLowerCase());
	if (!result.data) return 0;
	return result.data.map((x) => x.xp).reduce((a, b) => Number(a) + Number(b), 0);
};
