import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/')({
	beforeLoad: () => {
		return redirect({ to: '/new', throw: true });
	},
});
