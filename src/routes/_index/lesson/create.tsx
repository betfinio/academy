import {
	AdmonitionDirectiveDescriptor,
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CodeToggle,
	CreateLink,
	InsertAdmonition,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	ListsToggle,
	MDXEditor,
	type MDXEditorMethods,
	Separator,
	UndoRedo,
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
	toolbarPlugin,
} from '@mdxeditor/editor';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import '@mdxeditor/editor/style.css';
import QuizConstructor from '@/src/components/Create/QuizConstructor';
import { useLesson, useSection } from '@/src/lib/query';
import type { QuizQuestion } from '@/src/lib/types.ts';
import { cn } from '@betfinio/components';
import { toast } from '@betfinio/components/hooks';
import { Button, Input } from '@betfinio/components/ui';
import { useSupabase } from 'betfinio_app/supabase';

export const Route = createFileRoute('/_index/lesson/create')({
	component: CreateLessonPage,
});

function CreateLessonPage() {
	const refEn = useRef<MDXEditorMethods>(null);
	const refCs = useRef<MDXEditorMethods>(null);
	const [lang, setLang] = useState<'en' | 'cs'>('en');
	const [contentEN, setContentEN] = useState<string>('');
	const [contentCS, setContentCS] = useState<string>('');
	const [lesson, setLesson] = useState<string>('0');
	const [section, setSection] = useState<number>(0);
	const [value, setValue] = useState<string>('');
	const { data: lessonData } = useLesson(Number(lesson));
	const { data: sectionData } = useSection(Number(lessonData?.section ?? 0));
	const [quizEn, setQuizEn] = useState<QuizQuestion[]>([]);
	const [quizCs, setQuizCs] = useState<QuizQuestion[]>([]);

	const [videoEn, setVideoEn] = useState<string>('');
	const [videoCs, setVideoCs] = useState<string>('');

	const [titleEn, setTitleEn] = useState<string>('');
	const [titleCs, setTitleCs] = useState<string>('');

	const [sectionTitleEn, setSectionTitleEn] = useState<string>('');
	const [sectionTitleCs, setSectionTitleCs] = useState<string>('');

	const handleChange = (markdown: string) => {
		if (lang === 'en') setContentEN(markdown);
		if (lang === 'cs') setContentCS(markdown);
	};

	const handleSectionTitleChange = (title: string) => {
		if (lang === 'en') setSectionTitleEn(title);
		if (lang === 'cs') setSectionTitleCs(title);
	};

	const handleTitleChange = (title: string) => {
		if (lang === 'en') setTitleEn(title);
		if (lang === 'cs') setTitleCs(title);
	};
	const handleVideoChange = (url: string) => {
		if (lang === 'en') setVideoEn(url);
		if (lang === 'cs') setVideoCs(url);
	};

	const supabase = useSupabase();
	const handleLoad = () => {
		setLesson(value);
	};
	useEffect(() => {
		if (lessonData) {
			setTitleEn(JSON.parse(lessonData.title)?.en || '');
			setTitleCs(JSON.parse(lessonData.title)?.cs || '');
			refEn.current?.setMarkdown(JSON.parse(lessonData.content)?.en || '');
			refCs.current?.setMarkdown(JSON.parse(lessonData.content)?.cs || '');
			setContentEN(JSON.parse(lessonData.content)?.en || '');
			setContentCS(JSON.parse(lessonData.content)?.cs || '');
			setQuizCs(lessonData.quiz?.cs || []);
			setQuizEn(lessonData.quiz?.en || []);
			if (lessonData.video) {
				try {
					const { en, cs } = JSON.parse(lessonData.video);
					if (en) setVideoEn(en);
					if (cs) setVideoCs(cs);
				} catch {
					setVideoEn(lessonData.video);
					setVideoCs('');
				}
			} else {
				setVideoEn('');
				setVideoCs('');
			}
		}
	}, [lessonData]);

	useEffect(() => {
		if (sectionData) {
			setSection(sectionData.id);
			setSectionTitleEn(JSON.parse(sectionData.title)?.en || '');
			setSectionTitleCs(JSON.parse(sectionData.title)?.cs || '');
		}
	}, [sectionData]);

	const handleSave = async () => {
		if (!supabase.client) return;
		try {
			const lessonsResult = await supabase.client
				.from('lessons')
				.update({
					title: { en: titleEn, cs: titleCs },
					content: { en: contentEN, cs: contentCS },
					quiz: { en: quizEn, cs: quizCs },
					video: { en: videoEn, cs: videoCs },
				})
				.eq('id', Number(lesson))
				.select();

			const sectionsResult = await supabase.client
				.from('sections')
				.update({ title: { en: sectionTitleEn, cs: sectionTitleCs } })
				.eq('id', Number(section))
				.select();
			if (!sectionsResult.error && !lessonsResult.error) {
				toast({ title: 'Lesson saved', variant: 'default' });
			}
		} catch {
			toast({ title: 'Lesson did not save', variant: 'destructive' });
		}
	};

	return (
		<div className={'p-4 flex flex-col gap-4'}>
			<div className={'uppercase text-xl'}>Create new lesson</div>
			<div className={'w-full flex flex-row items-end gap-2'}>
				<div className={'flex-grow'}>
					Load lesson:
					<Input value={value} onChange={(e) => setValue(e.target.value)} />
				</div>
				<Button onClick={handleLoad} className={'w-[100px]'}>
					Load
				</Button>
			</div>
			<div className={'flex gap-2'}>
				<Button variant={lang === 'en' ? 'default' : 'outline'} className={'w-1/2'} onClick={() => setLang('en')}>
					English
				</Button>
				<Button variant={lang === 'cs' ? 'default' : 'outline'} className={'w-1/2'} onClick={() => setLang('cs')}>
					Czech
				</Button>
			</div>
			<div className={cn('flex flex-col gap-2', lang === 'cs' && 'hidden')}>
				<div>Section title</div>
				<div>
					<Input value={sectionTitleEn} onChange={(e) => handleSectionTitleChange(e.target.value)} />
				</div>
				<div>Title</div>
				<div>
					<Input value={titleEn} onChange={(e) => handleTitleChange(e.target.value)} />
				</div>
				<div className={'border p-2'}>
					<MDXEditor
						ref={refEn}
						className={'dark-theme editor'}
						markdown={contentEN}
						onChange={handleChange}
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
							toolbarPlugin({
								toolbarContents: () => (
									<>
										<UndoRedo />
										<Separator />
										<BlockTypeSelect />
										<Separator />
										<BoldItalicUnderlineToggles />
										<Separator />
										<ListsToggle />
										<Separator />
										<Separator />
										<CreateLink />
										<Separator />
										<CodeToggle />
										<Separator />
										<InsertImage />
										<Separator />
										<InsertTable />
										<Separator />
										<InsertThematicBreak />
										<Separator />
										<InsertAdmonition />
									</>
								),
							}),
						]}
					/>
				</div>
				<div>Video</div>
				<div>
					<Input value={videoEn} onChange={(e) => handleVideoChange(e.target.value)} />
				</div>
				<div className={'flex justify-between'}>
					<span>Quiz</span>
				</div>
				<QuizConstructor quiz={quizEn} setQuiz={setQuizEn} />
			</div>
			<div className={cn('flex flex-col gap-2', lang === 'en' && 'hidden')}>
				<div>Section title</div>
				<div>
					<Input value={sectionTitleCs} onChange={(e) => handleSectionTitleChange(e.target.value)} />
				</div>
				<div>Title</div>
				<div>
					<Input value={titleCs} onChange={(e) => handleTitleChange(e.target.value)} />
				</div>
				<div className={'border p-2'}>
					<MDXEditor
						ref={refCs}
						className={'dark-theme editor'}
						markdown={contentCS}
						onChange={handleChange}
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
							toolbarPlugin({
								toolbarContents: () => (
									<>
										<UndoRedo />
										<Separator />
										<BlockTypeSelect />
										<Separator />
										<BoldItalicUnderlineToggles />
										<Separator />
										<ListsToggle />
										<Separator />
										<Separator />
										<CreateLink />
										<Separator />
										<CodeToggle />
										<Separator />
										<InsertImage />
										<Separator />
										<InsertTable />
										<Separator />
										<InsertThematicBreak />
										<Separator />
										<InsertAdmonition />
									</>
								),
							}),
						]}
					/>
				</div>
				<div>Video</div>
				<div>
					<Input value={videoCs} onChange={(e) => handleVideoChange(e.target.value)} />
				</div>
				<div className={'flex justify-between'}>
					<span>Quiz</span>
				</div>
				<QuizConstructor quiz={quizCs} setQuiz={setQuizCs} />
			</div>
			<div className={'w-full flex gap-2'}>
				<Button className={'w-[200px]'} onClick={handleSave}>
					Save
				</Button>
			</div>
		</div>
	);
}
