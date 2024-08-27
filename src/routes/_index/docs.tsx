import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/docs')({
	component: () => <div>Hello /_index/docs!</div>,
});
