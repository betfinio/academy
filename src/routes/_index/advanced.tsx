import { AdvancedTabs } from '@/src/components/Advanced/AdvancedTabs';
import ProgressBar from '@/src/components/ProgressBar';
import { TooltipProvider } from '@betfinio/components/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_index/advanced')({
	component: AdvancedPage,
});

function AdvancedPage() {
	const { t } = useTranslation('academy');
	return (
		<TooltipProvider delayDuration={0}>
			<div className={'flex flex-col items-center'}>
				<div className={'font-semibold  text-2xl lg:text-4xl uppercase '}>{t('advancedAcademy')}</div>
				<ProgressBar />
				<AdvancedTabs />
			</div>
		</TooltipProvider>
	);
}
