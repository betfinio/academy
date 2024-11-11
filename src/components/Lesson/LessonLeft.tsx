import { Quiz } from '@/src/components/Lesson/Quiz/Quiz';
import Validation from '@/src/components/Lesson/Validation';
import { useLesson } from '@/src/lib/query';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson';
import {
	AdmonitionDirectiveDescriptor,
	MDXEditor,
	type MDXEditorMethods,
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
import { Button } from 'betfinio_app/button';
import { Tooltip, TooltipContent, TooltipTrigger } from 'betfinio_app/tooltip';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckIcon, Loader, TriangleIcon } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player/lazy';

export const LessonLeft = () => {
	const { lesson, section } = Route.useParams();
	const mdRef = useRef<MDXEditorMethods>(null);

	const { data: lessonData } = useLesson(Number(lesson));
	const { i18n, t } = useTranslation();
	const { history } = useRouter();

	const content = JSON.parse(lessonData?.content || '{}');
	const title = JSON.parse(lessonData?.title || '{}');

	const markdown = content[i18n.language] || '';
	const onlyEn = useMemo(() => {
		if (!markdown && content.en) {
			return true;
		}
		return false;
	}, [content, markdown]);

	const video = useMemo(() => {
		if (lessonData?.video) {
			try {
				const parsedVideo = JSON.parse(lessonData.video);
				return parsedVideo[i18n.language ?? 'en'];
			} catch {
				return lessonData.video;
			}
		} else {
			return '';
		}
	}, [lessonData, i18n.language]);

	useEffect(() => {
		if (lessonData) {
			mdRef.current?.setMarkdown(markdown);
		}
	}, [lessonData, i18n.language]);

	if (!lessonData) {
		return <Loader className={'animate-spin'} />;
	}
	const onBack = () => {
		history.go(-1);
	};

	return (
		<div className={'relative'}>
			{onlyEn && (
				<div className={'absolute text-center top-1/2 -translate-y-1/2 flex flex-col gap-5 z-[10] items-center w-full'}>
					{t('onlyEn')}
					<Button
						onClick={() => {
							i18n.changeLanguage('en');
						}}
					>
						{t('changeToEn')}
					</Button>
				</div>
			)}

			<motion.div
				className={cx(onlyEn && 'blur pointer-events-none')}
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 0 }}
			>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
					<div
						onClick={onBack}
						className={cx('flex cursor-pointer gap-1 items-center text-[#6A6F84] hover:text-yellow-400 group', section === '1' && 'hidden')}
					>
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
							<span>{title[i18n.language] || title.en}</span>
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
						className={cx('mt-4 w-full bg-quiz-background rounded-[10px] aspect-video overflow-hidden', !video && 'hidden')}
					>
						<ReactPlayer url={video} light={true} width="100%" height="100%" controls={true} playing={true} playIcon={<PlayButton />} />
					</motion.div>
				</div>
				{lessonData.content && (
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className={'mt-6 text'}>
						<MDXEditor
							ref={mdRef}
							className={'dark-theme editor'}
							markdown={markdown}
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
		</div>
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
