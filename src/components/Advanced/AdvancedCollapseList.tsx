import { useAdvancedLessonsDocs } from '@/src/lib/query';
import type { AdvancedLessonBlock } from '@/src/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'betfinio_app/accordion';
import { cn } from 'betfinio_app/lib/utils';
import { Check, Loader } from 'lucide-react';
import { CircularProgressbar } from 'react-circular-progressbar';

const getBlockIcon = (block: AdvancedLessonBlock) => {
	const { total, done } = block;
	const isCompleted = total === done;
	if (isCompleted) {
		return (
			<div className="text-success rounded-full border-success w-8 h-8 flex justify-center items-center border-2">
				<Check className="w-4 h-4" />
			</div>
		);
	}

	return (
		<CircularProgressbar
			className="w-8 h-8 [&_.CircularProgressbar-path]:stroke-yellow-400 [&_.CircularProgressbar-trail]:stroke-secondary"
			value={(done / total) * 100}
		/>
	);
};
export const accordion: AdvancedLessonBlock[] = [
	{
		title: 'Beginner network course',
		sectionXp: 300,
		total: 10,
		done: 10,
		lessons: [
			{
				title: 'How to 1',
				xp: 100,
				done: false,
				src: 'https://app.betfin.dev',
			},
			{
				title: 'How to 1',
				xp: 200,
				done: false,
				src: 'https://app.betfin.dev',
			},
			{
				title: 'How to 1',
				xp: 300,
				done: false,
				src: 'https://app.betfin.dev',
			},
		],
	},
	{
		title: 'Beginner network course1',
		sectionXp: 300,
		total: 10,
		done: 7,
		lessons: [
			{
				title: 'How to 1',
				xp: 100,
				done: true,
				src: 'https://app.betfin.dev',
			},
			{
				title: 'How to 1',
				xp: 200,
				done: false,
				src: 'https://app.betfin.dev',
			},
			{
				title: 'How to 1',
				xp: 300,
				done: false,
				src: 'https://app.betfin.dev',
			},
		],
	},
	{
		title: 'Beginner network course2',
		sectionXp: 300,
		total: 10,
		done: 0,
		lessons: [
			{
				title: 'How to 1',
				xp: 100,
				done: true,
				src: 'https://app.betfin.dev',
			},
			{
				title: 'How to 1',
				xp: 200,
				done: false,
				src: 'https://app.betfin.dev',
			},
			{
				title: 'How to 1',
				xp: 300,
				done: false,
				src: 'https://app.betfin.dev',
			},
		],
	},
];

export const AdvancedCollapseList = () => {
	const { data, isLoading } = useAdvancedLessonsDocs();

	if (isLoading) {
		return (
			<div>
				<Loader className="animate-spin" />
			</div>
		);
	}
	return (
		<Accordion type="single" collapsible className="w-full gap-4 flex flex-col">
			{data?.map((section) => (
				<AccordionItem className="p-0" key={section.title} value={section.title}>
					<AccordionTrigger className="bg-card-secondary   rounded-md  flex  py-5 px-6 h-20 gap-4">
						<div className='flex items-center flex-grow flex-wrap'>

						<div className="flex gap-4 items-center text-xl font-semibold whitespace-nowrap">
							{getBlockIcon(section)}

							{section.title}
						</div>
						<span className="text-yellow-400 font-bold ml-auto ">+{section.sectionXp}XP</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex p-0">
						<div className="w-14  justify-center after:border-l  after:border-l-gray-800 after:h-full after:block  py-2 hidden md:flex" />

						<div className="flex flex-col shrink grow ">
							{section.lessons.map((lesson) => (
								<AccordionContent key={lesson.title} className="bg-card mt-2 rounded-sm min-h-14 flex items-center  justify-between  text-lg font-semibold  ml-auto px-6 py-4">
									
									<a href={lesson.src}>{lesson.title}</a>
									<span className="flex gap-4 items-center">
										<b className="text-tertiary-foreground">+{lesson.xp}XP</b>
										<span
											className={cn({
												'text-success': lesson.done,
												'text-transparent': !lesson.done,
											})}
										>
											<Check />
										</span>
									</span>
								</AccordionContent>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};
