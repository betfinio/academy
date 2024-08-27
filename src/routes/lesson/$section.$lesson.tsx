import { useCompleteLesson, useLesson } from '@/src/lib/query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'betfinio_app/button';

export const Route = createFileRoute('/lesson/$section/$lesson')({
	component: LessonPage,
});

function LessonPage() {
	const { lesson, section } = Route.useParams();
	const { mutate: complete } = useCompleteLesson();
	const { data: lessonData = null } = useLesson(Number(lesson));

	const handleClick = () => {
		console.log(lessonData)
		complete({ lesson: Number(lesson), xp: lessonData?.xp || 100 });
	};
	return (
		<div>
			<div>Lesson: {lesson}</div>
			<div>Section: {section}</div>

			<Button onClick={handleClick}>Complete</Button>
		</div>
	);
}
