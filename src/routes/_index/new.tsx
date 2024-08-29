import { createFileRoute, redirect } from '@tanstack/react-router';
import { Loader } from 'lucide-react';

export const Route = createFileRoute('/_index/new')({
	component: NewPage,
	beforeLoad: () => {
		throw redirect({ to: '/lesson/1/1' });
	},
});

function NewPage() {
	return (
		<div className={'w-full h-full flex items-center justify-center'}>
			<Loader className={'w-10 h-10 animate-spin'} />
		</div>
	);
}
