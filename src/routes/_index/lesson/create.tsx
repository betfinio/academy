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
import QuizConstructor from '@/src/components/Create/QuizConstructor.tsx';
import { useLesson } from '@/src/lib/query';
import type { QuizQuestion } from '@/src/lib/types.ts';
import { Button } from 'betfinio_app/button';
import { Input } from 'betfinio_app/input';
import { useSupabase } from 'betfinio_app/supabase';
import { toast } from 'betfinio_app/use-toast';
import { cx } from 'class-variance-authority';

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
	const [value, setValue] = useState<string>('');
	const { data: lessonData } = useLesson(Number(lesson));
	const [quizEn, setQuizEn] = useState<QuizQuestion[]>([]);
	const [quizCs, setQuizCs] = useState<QuizQuestion[]>([]);

	const handleChange = (markdown: string) => {
		if (lang === 'en') setContentEN(markdown);
		if (lang === 'cs') setContentCS(markdown);
	};

	const supabase = useSupabase();
	const handleLoad = () => {
		setLesson(value);
	};
	useEffect(() => {
		console.log(lessonData);
		if (lessonData) {
			console.log(lessonData.quiz);
			refEn.current?.setMarkdown(JSON.parse(lessonData.content).en || '');
			refCs.current?.setMarkdown(JSON.parse(lessonData.content).cs || '');
			setContentEN(JSON.parse(lessonData.content).en || '');
			setContentCS(JSON.parse(lessonData.content).cs || '');
			setQuizCs(lessonData.quiz?.cs || []);
			setQuizEn(lessonData.quiz?.en || []);
		}
	}, [lessonData]);

	const handleSave = async () => {
		if (!supabase.client) return;
		const result = await supabase.client
			.from('lessons')
			.update({ content: { en: contentEN, cs: contentCS }, quiz: { en: quizEn, cs: quizCs } })
			.eq('id', Number(lesson))
			.select();
		console.log(result);
		if (!result.error) {
			toast({ title: 'Lesson saved', status: 'success' });
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
			<div className={cx('flex flex-col gap-2', lang === 'cs' && 'hidden')}>
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
				<div className={'flex justify-between'}>
					<span>Quiz</span>
				</div>
				<QuizConstructor quiz={quizEn} setQuiz={setQuizEn} />
			</div>
			<div className={cx('flex flex-col gap-2', lang === 'en' && 'hidden')}>
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
