import { AdvancedTabs } from '@/src/components/Advanced/AdvancedTabs';
import ProgressBar from '@/src/components/ProgressBar.tsx';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_index/advanced')({
	component: AdvancedPage,
});

function AdvancedPage() {
	const { t } = useTranslation();
	return (
		<div className={'flex flex-col items-center'}>
			<div className={'font-semibold  text-2xl lg:text-4xl uppercase my-4 '}>{t('advancedAcademy')}</div>
			<ProgressBar />
			<AdvancedTabs />
		</div>
	);
}
