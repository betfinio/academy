import { CONSERVATIVE, DYNAMIC } from '@/src/lib/global.ts';
import { type AdvancedLesson, type AdvancedLessonSection, type Document, type LessonValidation, type Status, initialStatus } from '@/src/lib/types.ts';
import { ConservativeStakingContract, DynamicStakingContract, ZeroAddress } from '@betfinio/abi';
import { type Config, readContract } from '@wagmi/core';
import type { SupabaseClient } from 'betfinio_app/supabase';
import type { Address } from 'viem';

export const fetchDocs = async (lang: string, client?: SupabaseClient): Promise<Document[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const data = await client.from('documents').select('*').eq('language', lang).returns<Document[]>();
	return data.data || [];
};
export const fetchAdvancedSections = async (tab: string, client?: SupabaseClient): Promise<AdvancedLessonSection[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const sections = await client.from('sections').select('title::text, xp, id').eq('tab', tab).order('order').returns<AdvancedLessonSection[]>();
	console.log(sections);
	return sections.data as AdvancedLessonSection[];
};
export const fetchAdvancedLessons = async (id: number, client?: SupabaseClient): Promise<AdvancedLesson[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const sections = await client
		.from('lessons')
		.select('title::text, xp, id, section')
		.eq('section', id)
		.order('order', { ascending: true })
		.returns<AdvancedLessonSection[]>();
	return sections.data as AdvancedLesson[];
};

export const fetchLesson = async (id: number, client?: SupabaseClient): Promise<AdvancedLesson> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const lesson = await client.from('lessons').select('title::text, xp, id, section, content::text, video, quiz').eq('id', id).maybeSingle<AdvancedLesson>();
	console.log();
	if (!lesson.data) throw new Error('not found');
	return lesson.data;
};

export const fetchSection = async (id: number, client?: SupabaseClient): Promise<AdvancedLessonSection> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const section = await client.from('sections').select('title::text, xp, id').eq('id', id).maybeSingle<AdvancedLesson>();
	console.log();
	if (!section.data) throw new Error('not found');
	return section.data;
};

export const fetchSectionStatus = async (sectionId: number, address: Address, client?: SupabaseClient): Promise<Status> => {
	console.log('fetching section status', sectionId);
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

export const fetchStaked = async (address: Address, config: Config) => {
	if (address === ZeroAddress) return 0n;
	const conservative = (await readContract(config, {
		address: CONSERVATIVE,
		abi: ConservativeStakingContract.abi,
		functionName: 'getStaked',
		args: [address],
	})) as bigint;
	const dynamic = (await readContract(config, {
		address: DYNAMIC,
		abi: DynamicStakingContract.abi,
		functionName: 'getStaked',
		args: [address],
	})) as bigint;

	return conservative + dynamic;
};

export const completeLesson = async (
	lesson: number,
	xp: number,
	address: Address,
	client?: SupabaseClient,
): Promise<{ data: string; error?: string; status?: string }> => {
	if (!client) {
		throw new Error('No client provided');
	}

	console.log('completing', lesson, xp, address);
	const { data, error, status } = await client.rpc('complete_lesson', { lesson_id: lesson, xp: xp, member: address.toLowerCase() });
	console.log(data, error, status);
	return { data, error: error?.message, status: status.toString() };
};

export const fetchProgress = async (address: Address, client?: SupabaseClient): Promise<number> => {
	if (!client) {
		throw new Error('No client provided');
	}

	const result = await client.from('sections_progress').select('xp', { count: 'exact' }).eq('member', address.toLowerCase());
	if (!result.data) return 0;
	return result.data.map((x) => x.xp).reduce((a, b) => Number(a) + Number(b), 0);
};

export const fetchLessonValidation = async (id: number, client?: SupabaseClient): Promise<LessonValidation | null> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const lesson = await client.from('lessons').select('validation').eq('id', id).single();
	return lesson.data?.validation || null;
};
