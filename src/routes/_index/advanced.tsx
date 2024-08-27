import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/advanced')({
	component: () => <div>Hello /_index/advanced!</div>,
});
