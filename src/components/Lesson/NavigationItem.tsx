import { useLessonStatus } from '@/src/lib/query';
import { type AdvancedLesson, type Status, initialStatus } from '@/src/lib/types.ts';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { ZeroAddress } from '@betfinio/abi';
import { Link } from '@tanstack/react-router';
import { cx } from 'class-variance-authority';
import { Book, Check } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const NavigationItem: FC<{ lesson: AdvancedLesson }> = ({ lesson }) => {
	const { i18n } = useTranslation();
	const { section } = Route.useParams();
	const lang = i18n.language;
	const { address = ZeroAddress } = useAccount();
	const { data: lessonStatus = initialStatus } = useLessonStatus(lesson.id, address);
	return (
		<Link to={'/lesson/$section/$lesson'} params={{ lesson: lesson.id.toString(), section: section }} className={'p-4 flex flex-row items-center gap-4'}>
			<Icon status={lessonStatus} />
			<div className={'flex-grow'}>{JSON.parse(lesson.title)[lang]}</div>
			<div className={cx(lessonStatus.done ? 'text-yellow-400' : 'text-gray-600')}>+{lesson.xp}XP</div>
		</Link>
	);
};

export default NavigationItem;

const Icon: FC<{ status: Status }> = ({ status }) => {
	return (
		<div
			className={cx('rounded-lg p-2', {
				'border border-gray-600 text-gray-600': !status.done,
				'bg-secondaryLight text-yellow-400': status.done,
			})}
		>
			{status.done ? <Check className={'w-4 h-4'} /> : <Book className={'w-4 h-4'} />}
		</div>
	);
};
