import { Quiz } from '@/src/components/Lesson/Quiz/Quiz.tsx';
import Validation from '@/src/components/Lesson/Validation.tsx';
import { useLesson } from '@/src/lib/query';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { useRouter } from '@tanstack/react-router';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader, TriangleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player/lazy';

export const LessonLeft = () => {
	const { lesson, section } = Route.useParams();

	const { data: lessonData } = useLesson(Number(lesson));
	const { i18n, t } = useTranslation();
	const { history } = useRouter();
	if (!lessonData) {
		return <Loader className={'animate-spin'} />;
	}
	const onBack = () => {
		history.go(-1);
	};

	return (
		<motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0 }}>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
				<div onClick={onBack} className={cx('flex cursor-pointer gap-1 items-center text-[#6A6F84] hover:text-yellow-400 group', section === '1' && 'hidden')}>
					<ArrowLeft height={18} className={'group-hover:-translate-x-[3px] duration-300'} />
					<span className={'duration-300'}>{t('back')}</span>
				</div>
			</motion.div>
			<div className={'mt-8'}>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className={'text-[24px] leading-[24px] font-semibold'}
				>
					{JSON.parse(lessonData.title)[i18n.language]}
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className={cx('mt-4 w-full bg-quiz-background rounded-[10px] aspect-video overflow-hidden', !lessonData.video && 'hidden')}
				>
					<ReactPlayer url={lessonData.video} light={true} width="100%" height="100%" controls={true} playing={true} playIcon={<PlayButton />} />
				</motion.div>
			</div>
			{lessonData.content && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className={'mt-6 text-lg text-[#E8E8E8]'}
					dangerouslySetInnerHTML={{ __html: decodeURIComponent(atob(JSON.parse(lessonData.content)[i18n.language])) }}
				/>
			)}
			<Quiz />
			<Validation />
		</motion.div>
	);
};

const PlayButton = () => {
	const { t } = useTranslation();
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
			<motion.div
				whileTap={{ scale: 0.95 }}
				whileHover={{ scale: 1.03 }}
				className={'bg-quiz-purple cursor-pointer py-3 px-10 flex items-center gap-2 rounded-lg group duration-300 hover:text-black hover:bg-yellow-400'}
			>
				<span>{t('play')}</span>
				<TriangleIcon width={16} className={' duration-300 text-yellow-400 group-hover:text-black fill-current rotate-90'} />
			</motion.div>
		</motion.div>
	);
};
