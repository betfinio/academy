import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_index/lesson/')({
	component: Redirect,
});

function Redirect() {
	const navigate = useNavigate();
	navigate({ to: '/lesson/$id', params: { id: '1' }, replace: true });
	return null;
}
