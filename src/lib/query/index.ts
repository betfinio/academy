import {
	completeLesson,
	fetchAdvancedLessons,
	fetchAdvancedSections,
	fetchDocs,
	fetchLesson,
	fetchLessonStatus,
	fetchProgress,
	fetchSectionStatus,
} from '@/src/lib/api';
import type { AdvancedLesson, Status } from '@/src/lib/types.ts';
import { ZeroAddress } from '@betfinio/abi';
import type { DefaultError } from '@tanstack/query-core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSupabase } from 'betfinio_app/supabase';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

export const useDocs = (lang: string) => {
	const { client } = useSupabase();
	return useQuery({
		queryKey: ['academy', 'docs', lang],
		queryFn: () => fetchDocs(lang, client),
	});
};
export const useAdvancedSections = () => {
	const { client } = useSupabase();
	return useQuery({
		queryKey: ['academy', 'advanced', 'sections'],
		queryFn: () => fetchAdvancedSections(client),
	});
};
export const useAdvancedLessons = (id: number) => {
	const { client } = useSupabase();
	return useQuery<AdvancedLesson[]>({
		queryKey: ['academy', 'advanced', 'lessons', id],
		queryFn: () => fetchAdvancedLessons(id, client),
	});
};
export const useLesson = (lesson: number) => {
	const { client } = useSupabase();
	return useQuery<AdvancedLesson>({
		queryKey: ['academy', 'advanced', 'lessons', 'lesson', lesson],
		queryFn: () => fetchLesson(lesson, client),
	});
};
export const useSectionStatus = (sectionId: number, address: Address) => {
	const { client } = useSupabase();
	return useQuery<Status>({
		queryKey: ['academy', 'advanced', 'section', 'status', sectionId, address],
		queryFn: () => fetchSectionStatus(sectionId, address, client),
	});
};
export const useLessonStatus = (lessonId: number, address: Address) => {
	const { client } = useSupabase();
	return useQuery<Status>({
		queryKey: ['academy', 'advanced', 'lesson', 'status', lessonId, address],
		queryFn: () => fetchLessonStatus(lessonId, address, client),
	});
};
export const useProgress = (address: Address) => {
	const { client } = useSupabase();
	return useQuery<number>({
		queryKey: ['academy', 'progress', address],
		queryFn: () => fetchProgress(address, client),
	});
};

export const useCompleteLesson = () => {
	const { address = ZeroAddress } = useAccount();
	const { client } = useSupabase();
	return useMutation<boolean, DefaultError, { lesson: number; xp: number }>({
		mutationKey: ['academy', 'advanced', 'lesson', 'complete'],
		mutationFn: ({ lesson, xp }) => completeLesson(lesson, xp, address, client),
	});
};
