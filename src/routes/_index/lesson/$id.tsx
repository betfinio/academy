import { LessonLeft } from '@/src/components/Lesson/LessonLeft.tsx';
import { LessonRight } from '@/src/components/Lesson/LessonRight.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/lesson/$id')({
	component: LessonPage,
});

function LessonPage() {
	return (
		<div className={'flex flex-col items-center mb-10'}>
			<div className={'font-semibold text-4xl uppercase'}>Betfin academy</div>

			<div className={'border-t border-t-white border-opacity-5 w-full mt-10 pt-5 grid grid-cols-5 gap-10'}>
				<div className={'col-span-5 sm:col-span-3'}>
					<LessonLeft />
				</div>
				<div className={'col-span-5 sm:col-span-2'}>
					<LessonRight />
				</div>
			</div>
		</div>
	);
}
