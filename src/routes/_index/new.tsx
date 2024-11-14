import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';

export const Route = createFileRoute('/_index/new')({
	component: NewPage,
	validateSearch: (search: Record<string, unknown>) => {
		if (!search.code) return {};
		const inviter = search.code.toString().slice(0, 42);
		const parent = search.code.toString().slice(42);
		const type = search.type || 'normal';
		localStorage.setItem('code', JSON.stringify({ inviter, parent, type }));
		console.log({ inviter, parent, type });
		return { inviter, parent, type };
	},
});

function NewPage() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate({ to: '/lesson/$section/$lesson', params: { section: '1', lesson: '1' } });
	}, []);
	return (
		<div className={'w-full h-full flex items-center justify-center'}>
			<Loader className={'w-10 h-10 animate-spin'} />
		</div>
	);
}
