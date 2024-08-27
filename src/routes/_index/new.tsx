import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/new')({
	component: NewPage,
});

function NewPage() {
	return <div className={'border border-red-roulette'}>news</div>;
}
