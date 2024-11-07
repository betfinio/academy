import Events from '@/src/components/Events/Events';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_index/events')({
	component: () => <EventsPage />,
});

const EventsPage = () => {
	const { t } = useTranslation('academy', { keyPrefix: 'events' });
	return (
		<div className={'flex flex-col items-center'}>
			<div className={'font-semibold  text-2xl lg:text-4xl uppercase '}>{t('title')}</div>
			<Events />
		</div>
	);
};
