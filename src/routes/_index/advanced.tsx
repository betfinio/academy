import { AdvancedTabs } from '@/src/components/Advanced/AdvancedTabs';
import ProgressBar from '@/src/components/ProgressBar.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/advanced')({
	component: AdvancedPage,
});

function AdvancedPage() {
	return (
		<div className={'flex flex-col items-center'}>
			<div className={'font-semibold  text-2xl lg:text-4xl uppercase my-4 '}>Advanced academy</div>
			<ProgressBar />
			<AdvancedTabs />
		</div>
	);
}
