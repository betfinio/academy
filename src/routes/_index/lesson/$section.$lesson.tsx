import { LessonLeft } from '@/src/components/Lesson/LessonLeft';
import { Navigation } from '@/src/components/Lesson/Navigation';
import ProgressBar from '@/src/components/ProgressBar';
import { useSection } from '@/src/lib/query';
import { TooltipProvider } from '@betfinio/components/ui';
import { ScrollRestoration, createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_index/lesson/$section/$lesson')({
	component: LessonPage,
});

function LessonPage() {
	const { section } = Route.useParams();
	const { data: sectionData } = useSection(Number(section));
	const {
		i18n: { language },
	} = useTranslation();
	if (!sectionData) {
		return (
			<div className={'w-full h-full flex items-center justify-center'}>
				<Loader className={'w-10 h-10 animate-spin'} />
			</div>
		);
	}
	const title: Record<string, string> = JSON.parse(sectionData.title);
	return (
		<TooltipProvider delayDuration={0}>
			<div className={'flex flex-col items-center mb-10 gap-6 sm:gap-4'}>
				<ScrollRestoration />
				<div className={'font-semibold  text-4xl uppercase'}>{title[language] || title.en}</div>
				<ProgressBar />
				<div className={'w-full grid grid-cols-5 gap-10 sm:gap-4'}>
					<div className={'col-span-5 sm:col-span-3'}>
						<LessonLeft />
					</div>
					<div className={'col-span-5 sm:col-span-2'}>
						<Navigation />
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
