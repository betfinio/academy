import DocumentBlock from '@/src/components/DocumentBlock.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/docs')({
	component: DocsPage,
});

function DocsPage() {
	return (
		<div className={'border border-red-500 p-2 md:p-3 lg:p-4'}>
			<DocumentBlock />
		</div>
	);
}
