import { Quiz } from '@/src/components/Lesson/Quiz/Quiz.tsx';
import Validation from '@/src/components/Lesson/Validation.tsx';
import { useLesson, useLessonStatus } from '@/src/lib/query';
import { initialStatus } from '@/src/lib/types.ts';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { ZeroAddress } from '@betfinio/abi';
import {
	AdmonitionDirectiveDescriptor,
	MDXEditor,
	diffSourcePlugin,
	directivesPlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
} from '@mdxeditor/editor';
import { useRouter } from '@tanstack/react-router';
import { Tooltip, TooltipContent, TooltipTrigger } from 'betfinio_app/tooltip';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckIcon, Loader, TriangleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player/lazy';
import { useAccount } from 'wagmi';

export const LessonLeft = () => {
	const { lesson, section } = Route.useParams();
	const { address } = useAccount();

	const { data: lessonData } = useLesson(Number(lesson));
	const { data: lessonStatus = initialStatus } = useLessonStatus(Number(lesson), address || ZeroAddress);
	const { i18n, t } = useTranslation();
	const { history } = useRouter();
	if (!lessonData) {
		return <Loader className={'animate-spin'} />;
	}
	const onBack = () => {
		history.go(-1);
	};

	const content = JSON.parse(lessonData.content || '{}');
	const title = JSON.parse(lessonData.title || '{}');

	return (
		<motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0 }}>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
				<div onClick={onBack} className={cx('flex cursor-pointer gap-1 items-center text-[#6A6F84] hover:text-yellow-400 group', section === '1' && 'hidden')}>
					<ArrowLeft height={18} className={'group-hover:-translate-x-[3px] duration-300'} />
					<span className={'duration-300'}>{t('back')}</span>
				</div>
			</motion.div>
			<div className={cx(section !== '1' && 'mt-4')}>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className={'text-[24px] leading-[24px] font-semibold'}
				>
					<div className={'flex gap-2 items-center'}>
						<span>{title[i18n.language] ?? title.en}</span>
						<Tooltip>
							<TooltipTrigger>
								<CheckIcon className={'text-green-400 w-5 h-5'} />
							</TooltipTrigger>
							<TooltipContent>{t('tooltip.completed')}</TooltipContent>
						</Tooltip>
					</div>
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
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className={'mt-6 text'}>
					<MDXEditor
						className={'dark-theme editor'}
						markdown={content[i18n.language.split('-')[0]]}
						readOnly
						plugins={[
							headingsPlugin(),
							linkPlugin(),
							quotePlugin(),
							thematicBreakPlugin(),
							linkDialogPlugin(),
							diffSourcePlugin(),
							directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
							imagePlugin(),
							thematicBreakPlugin(),
							tablePlugin(),
							listsPlugin(),
						]}
					/>
				</motion.div>
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
