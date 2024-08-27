import { LessonQuiz } from '@/src/components/Lesson/LessonQuiz.tsx';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export const LessonLeft = () => {
	return (
		<div>
			<Link to={'/academy'} className={'flex gap-1 items-center text-[#6A6F84]'}>
				<ArrowLeft height={18} />
				Back
			</Link>

			<div className={'mt-8'}>
				<div className={'text-[24px] leading-[24px] font-semibold'}>1. Setup wallet</div>
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

			<LessonQuiz />
		</div>
	);
};
