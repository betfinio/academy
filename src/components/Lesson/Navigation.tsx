import NavigationItem from '@/src/components/Lesson/NavigationItem.tsx';
import { useAdvancedLessons } from '@/src/lib/query';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { Separator } from 'betfinio_app/separator';

export const Navigation = () => {
	const { section } = Route.useParams();
	const { data: lessons = [] } = useAdvancedLessons(Number(section));
	return (
		<div className={' rounded-xl bg-quiz-background flex flex-col'}>
			{lessons.map((lesson, id) => (
				<div key={id}>
					{id !== 0 && <Separator />}
					<NavigationItem lesson={lesson} />
				</div>
			))}
		</div>
	);
};
