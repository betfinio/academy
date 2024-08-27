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
		<AccordionContent
			key={lesson.title}
			className="bg-card mt-2 rounded-sm min-h-14 flex items-center  justify-between  text-lg font-semibold  ml-auto px-6 py-4"
		>
			<Link to={'/lesson/$section/$lesson'} params={{ lesson: lesson.id.toString(), section: lesson.section.toString() }}>
				{JSON.parse(lesson.title)[i18n.language]}
			</Link>
			<span className="flex gap-4 items-center">
				<span className={cx('text-tertiary-foreground', status.done && 'text-yellow-400')}>+{lesson.xp}XP</span>
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
	);
};
export default Lesson;
