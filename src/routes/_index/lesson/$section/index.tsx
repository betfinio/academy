import { useAdvancedLessons } from '@/src/lib/query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_index/lesson/$section/')({
	component: SectionPage,
});

function SectionPage() {
	const { section } = Route.useParams();
	const navigate = useNavigate();
	const { data: sectionLessons } = useAdvancedLessons(Number(section));
	useEffect(() => {
		if (!sectionLessons) return;
		if (sectionLessons.length > 0) {
			navigate({
				to: '/lesson/$section/$lesson',
				params: { lesson: sectionLessons[0].id, section },
			});
		} else {
			navigate({ to: '/advanced' });
		}
	}, [sectionLessons]);
	return null;
}
