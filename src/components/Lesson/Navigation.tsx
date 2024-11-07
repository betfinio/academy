import NavigationItem from '@/src/components/Lesson/NavigationItem';
import { useAdvancedLessons } from '@/src/lib/query';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson';
import { Separator } from 'betfinio_app/separator';
import { motion } from 'framer-motion';

export const Navigation = () => {
	const { section } = Route.useParams();
	const { data: lessons = [] } = useAdvancedLessons(Number(section));
	return (
		<div className={' rounded-xl bg-quiz-background flex flex-col'}>
			{lessons.map((lesson, id) => (
				<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: id * 0.1 }} key={id}>
					{id !== 0 && <Separator />}
					<NavigationItem lesson={lesson} />
				</motion.div>
			))}
		</div>
	);
};
