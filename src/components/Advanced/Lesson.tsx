import { useLessonStatus } from '@/src/lib/query';
import { type AdvancedLesson, initialStatus } from '@/src/lib/types.ts';
import { ZeroAddress } from '@betfinio/abi';
import { Link } from '@tanstack/react-router';
import { AccordionContent } from 'betfinio_app/accordion';
import { cx } from 'class-variance-authority';
import { Check } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const Lesson: FC<{ lesson: AdvancedLesson }> = ({ lesson }) => {
	const { address = ZeroAddress } = useAccount();
	const { i18n } = useTranslation();

	const { data: status = initialStatus } = useLessonStatus(lesson.id, address);
	return (
		<Link to={'/lesson/$section/$lesson'} params={{ lesson: lesson.id.toString(), section: lesson.section.toString() }}>
			<AccordionContent
				key={lesson.title}
				className="bg-card mt-2 rounded-sm min-h-14 flex items-center  justify-between  lg:text-lg font-semibold  ml-auto px-6 py-4"
			>
				{JSON.parse(lesson.title)[i18n.language]}
				<span className="flex gap-4 items-center">
					<div className={cx('text-tertiary-foreground flex flex-row gap-1', status.done && 'text-yellow-400')}>
						{status.xp > 0 && `${status.xp.toString()} /`} <div className={'text-gray-500'}>{lesson.xp}XP</div>
					</div>
					<span
						className={cx({
							'text-success': status.done,
							'text-transparent': !status.done,
						})}
					>
						<Check />
					</span>
				</span>
			</AccordionContent>
		</Link>
	);
};
export default Lesson;
