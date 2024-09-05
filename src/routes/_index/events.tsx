import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/events')({
	component: () => <div>Hello /_index/events!</div>,
	beforeLoad: () => {
		throw redirect({ to: '/docs' });
	},
});
