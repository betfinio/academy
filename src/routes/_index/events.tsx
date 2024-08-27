import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/events')({
	component: () => <div>Hello /_index/events!</div>,
});
