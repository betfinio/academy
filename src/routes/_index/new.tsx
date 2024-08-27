import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/new')({
	component: () => <div>Hello /_index/new!</div>,
});
