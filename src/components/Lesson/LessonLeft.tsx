import { Quiz } from '@/src/components/Lesson/Quiz.tsx';
import { useLesson } from '@/src/lib/query';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { Link, useLocation, useRouter } from '@tanstack/react-router';
import { Button } from 'betfinio_app/button';
import { ArrowLeft, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LessonLeft = () => {
	const { lesson } = Route.useParams();

	const { data: lessonData } = useLesson(Number(lesson));
	const { i18n } = useTranslation();
	const { history } = useRouter();
	if (!lessonData) {
		return <Loader className={'animate-spin'} />;
	}
	const onBack = () => {
		history.go(-1);
	};
	return (
		<div>
			<Button variant={'ghost'} onClick={onBack} className={'flex gap-1 items-center text-[#6A6F84]'}>
				<ArrowLeft height={18} />
				Back
			</Button>

			<div className={'mt-8'}>
				<div className={'text-[24px] leading-[24px] font-semibold'}>{JSON.parse(lessonData.title)[i18n.language]}</div>
				<div className={'mt-4 w-full bg-blue-400 rounded-[10px] aspect-video'} />
			</div>

			<div className={'mt-8'}>
				<div className={'text-[24px] leading-[24px] font-semibold'}>Welcome to WEB3</div>
				<div className={'mt-6 text-lg text-[#E8E8E8]'}>
					Lörem ipsum pantik kiligt i suprasperöst om än sosk. Blogga sofol. Monorössade spen. Veganisera nyngen koldioxidsänka i pretöll nysement. Enaren
					yreledes, eurogen inte fukaren, hemisoll. Lörem ipsum pantik kiligt i suprasperöst om än sosk. Blogga sofol. Monorössade spen. Veganisera nyngen
					koldioxidsänka i pretöll nysement. Enaren yreledes, eurogen inte fukaren, hemisoll.
				</div>
			</div>

			<Quiz />
		</div>
	);
};
