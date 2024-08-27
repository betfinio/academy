import ProgressBar from '@/src/components/ProgressBar.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/advanced')({
	component: AdvancedPage,
});

function AdvancedPage() {
	return (
		<div className={'flex flex-col items-center'}>
			<div className={'font-semibold  text-2xl uppercase'}>Advanced academy</div>
			<ProgressBar />
		</div>
	);
}
