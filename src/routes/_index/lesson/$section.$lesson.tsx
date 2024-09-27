import { LessonLeft } from '@/src/components/Lesson/LessonLeft.tsx';
import { Navigation } from '@/src/components/Lesson/Navigation.tsx';
import ProgressBar from '@/src/components/ProgressBar.tsx';
import { useSection } from '@/src/lib/query';
import { ScrollRestoration, createFileRoute } from '@tanstack/react-router';
import { TooltipProvider } from 'betfinio_app/tooltip';
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
	return (
		<TooltipProvider delayDuration={0}>
			<div className={'flex flex-col items-center mb-10 gap-6 sm:gap-4'}>
				<ScrollRestoration />
				<div className={'font-semibold  text-4xl uppercase'}>{JSON.parse(sectionData.title)[language]}</div>
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
