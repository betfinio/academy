import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'betfinio_app/accordion';
import { cn } from 'betfinio_app/lib/utils';
import { Check } from 'lucide-react';
import { CircularProgressbar } from 'react-circular-progressbar';
const accordion = [
	{
		title: 'Beginner network course',
		sectionXp: 300,
		total: 10,
		done: 4,
		lessons: [
			{
				title: 'How to 1',
				xp: 100,
				done: false,
			},
			{
				title: 'How to 1',
				xp: 200,
				done: false,
			},
			{
				title: 'How to 1',
				xp: 300,
				done: false,
			},
		],
	},
	{
		title: 'Beginner network course1',
		sectionXp: 300,
		total: 10,
		done: 4,
		lessons: [
			{
				title: 'How to 1',
				xp: 100,
				done: true,
			},
			{
				title: 'How to 1',
				xp: 200,
				done: false,
			},
			{
				title: 'How to 1',
				xp: 300,
				done: false,
			},
		],
	},
];

export const AdvancedCollapseList = () => {
	return (
		<Accordion type="single" collapsible className="w-full gap-4 flex flex-col">
			{accordion.map((section) => (
				<AccordionItem className="p-0" key={section.title} value={section.title}>
					<AccordionTrigger className="bg-card-secondary   rounded-md  flex  py-5 px-6 h-20">
						<div className="flex gap-4 items-center">
							<CircularProgressbar
								className="w-8 h-8 [&_.CircularProgressbar-path]:stroke-yellow-400 [&_.CircularProgressbar-trail]:stroke-secondary"
								value={(section.done / section.total) * 100}
							/>
							{section.title}
						</div>
						<span className="text-yellow-400 font-bold ml-auto mr-4">+{section.sectionXp}XP</span>
					</AccordionTrigger>
					<AccordionContent className="flex p-0">
						<div className="w-14 flex justify-center after:border-l  after:border-l-gray-800 after:h-full after:block  py-2"/>

						<div className="flex flex-col shrink grow ">
							{section.lessons.map((lesson) => (
								<AccordionContent key={lesson.title} className="bg-card mt-2 rounded-sm min-h-14 flex items-center  justify-between   ml-auto px-6 py-4">
									<span>{lesson.title}</span>
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
