import { LessonLeft } from '@/src/components/Lesson/LessonLeft.tsx';
import { Navigation } from '@/src/components/Lesson/Navigation.tsx';
import ProgressBar from '@/src/components/ProgressBar.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/lesson/$section/$lesson')({
	component: LessonPage,
});

function LessonPage() {
	return (
		<div className={'flex flex-col items-center mb-10'}>
			<div className={'font-semibold  text-4xl uppercase'}>Academy</div>
			<ProgressBar />
			<div className={'w-full pt-5 grid grid-cols-5 gap-10'}>
				<div className={'col-span-5 sm:col-span-3'}>
					<LessonLeft />
				</div>
				<div className={'col-span-5 sm:col-span-2'}>
					<Navigation />
				</div>
			</div>
		</div>
	);
}
