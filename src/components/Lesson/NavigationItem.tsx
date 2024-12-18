import { useLessonStatus } from '@/src/lib/query';
import { type AdvancedLesson, type Status, initialStatus } from '@/src/lib/types.ts';
import { Route } from '@/src/routes/_index/lesson/$section/$lesson.tsx';
import { ZeroAddress } from '@betfinio/abi';
import { cn } from '@betfinio/components';
import { Link } from '@tanstack/react-router';
import { Book, Check } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const NavigationItem: FC<{ lesson: AdvancedLesson }> = ({ lesson }) => {
	const { i18n } = useTranslation();
	const { section, lesson: activeLesson } = Route.useParams();
	const lang = i18n.language;
	const { address = ZeroAddress } = useAccount();
	const { data: lessonStatus = initialStatus } = useLessonStatus(lesson.id, address);
	const title = JSON.parse(lesson.title || '{}');
	return (
		<Link
			to={'/lesson/$section/$lesson'}
			params={{ lesson: lesson.id.toString(), section: section }}
			className={cn('p-4 flex flex-row items-center gap-4', Number(activeLesson) === lesson.id && 'border-yellow-400 border rounded-lg')}
		>
			<Icon status={lessonStatus} />
			<div className={'flex-grow'}>{title[lang] ?? title.en}</div>
			<div className={cn(lessonStatus.done ? 'text-secondary-foreground' : 'text-gray-600')}>+{lessonStatus.done ? lessonStatus.xp : lesson.xp}XP</div>
		</Link>
	);
};

export default NavigationItem;

const Icon: FC<{ status: Status }> = ({ status }) => {
	return (
		<div
			className={cn('rounded-lg p-2', {
				'border border-gray-600 text-gray-600': !status.done,
				'bg-secondaryLight text-secondary-foreground': status.done,
			})}
		>
			{status.done ? <Check className={'w-4 h-4'} /> : <Book className={'w-4 h-4'} />}
		</div>
	);
};
