import {
	completeLesson,
	fetchAdvancedLessons,
	fetchAdvancedSections,
	fetchDocs,
	fetchLesson,
	fetchLessonStatus,
	fetchLessonValidation,
	fetchProgress,
	fetchSection,
	fetchSectionStatus,
} from '@/src/lib/api';
import type { AdvancedLesson, AdvancedLessonSection, LessonValidation, Status } from '@/src/lib/types.ts';
import { shootConfetti } from '@/src/lib/utilts.ts';
import { ZeroAddress } from '@betfinio/abi';
import type { DefaultError } from '@tanstack/query-core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
		queryKey: ['academy', 'section', 'all'],
		queryFn: () => fetchAdvancedSections(client),
	});
};
export const useAdvancedLessons = (id: number) => {
	const { client } = useSupabase();
	return useQuery<AdvancedLesson[]>({
		queryKey: ['academy', 'section', id, 'lesson', 'all'],
		queryFn: () => fetchAdvancedLessons(id, client),
	});
};
export const useLesson = (lesson: number) => {
	const { client } = useSupabase();
	return useQuery<AdvancedLesson>({
		queryKey: ['academy', 'section', 'any', 'lesson', lesson],
		queryFn: () => fetchLesson(lesson, client),
	});
};
export const useSectionStatus = (sectionId: number, address: Address) => {
	const { client } = useSupabase();
	return useQuery<Status>({
		queryKey: ['academy', 'section', sectionId, 'status', address],
		queryFn: () => fetchSectionStatus(sectionId, address, client),
	});
};
export const useLessonStatus = (lessonId: number, address: Address) => {
	const { client } = useSupabase();
	return useQuery<Status>({
		queryKey: ['academy', 'section', 'any', 'lesson', lessonId, 'status', address],
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
export const useSection = (id: number) => {
	const { client } = useSupabase();
	return useQuery<AdvancedLessonSection>({
		queryKey: ['academy', 'section', id],
		queryFn: () => fetchSection(id, client),
	});
};

export const useLessonValidation = (id: number) => {
	const { client } = useSupabase();
	return useQuery<LessonValidation|null>({
		queryKey: ['academy', 'section', 'any', 'lesson', id, 'validation'],
		queryFn: () => fetchLessonValidation(id, client),
	});
};

export const useCompleteLesson = () => {
	const { address = ZeroAddress } = useAccount();
	const { client } = useSupabase();
	const queryClient = useQueryClient();
	return useMutation<{ data: string; error?: string; status?: string }, DefaultError, { lesson: number; xp: number }>({
		mutationKey: ['academy', 'lesson', 'complete'],
		mutationFn: ({ lesson, xp }) => completeLesson(lesson, xp, address, client),
		onSuccess: ({ data, status, error }) => {
			console.log(data, status, error);
			if (error === undefined && status === '204') {
				shootConfetti();
				queryClient.invalidateQueries({ queryKey: ['academy', 'section'] });
				queryClient.invalidateQueries({ queryKey: ['academy', 'progress'] });
			}
		},
	});
};
