import DocumentBlock from '@/src/components/DocumentBlock.tsx';
import { createFileRoute } from '@tanstack/react-router';
import { useDocs } from '@/src/lib/query';

export const Route = createFileRoute('/_index/docs')({
	component: DocsPage,
});

function DocsPage() {
	const { data: docs = [] } = useDocs('en');
	return (
		<div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4'}>
			{docs.map((doc, index) => (
				<DocumentBlock key={index} {...doc} />
			))}
		</div>
	);
}
