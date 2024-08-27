import { Link, Outlet, createFileRoute, useLocation } from '@tanstack/react-router';
import { cx } from 'class-variance-authority';
import { BookIcon, CalendarHeart, GraduationCap, PencilRulerIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_index')({
	component: () => <Layout />,
});

function Layout() {
	const { t } = useTranslation('', { keyPrefix: 'academy.layout' });
	const router = useLocation();
	const isActive = (path: string) => {
		return router.pathname.includes(path);
	};
	const getIcon = (path: string) => {
		switch (path) {
			case 'new':
				return <GraduationCap className={'w-6 h-6 '} />;
			case 'advanced':
				return <PencilRulerIcon className={'w-5 h-5 '} />;
			case 'events':
				return <CalendarHeart className={'w-5 h-5 '} />;
			case 'docs':
				return <BookIcon className={'w-5 h-5 '} />;
		}
	};
	return (
		<div className={'p-2 md:p-3 lg:p-4 text-white h-full'}>
			<div className={'grid grid-cols-4 w-full gap-2 md:gap-3 lg:gap-4 '}>
				{['docs', 'new', 'advanced', 'events'].map((link) => (
					<Link
						to={`/${link}`}
						key={link}
						className={cx(
							'flex p-4 justify-center font-semibold items-center gap-2   rounded-xl',
							isActive(link) ? 'text-yellow-400 bg-secondaryLight' : 'text-gray-400',
						)}
					>
						{getIcon(link)}
						{t(link)}
					</Link>
				))}
			</div>
			<Outlet />
		</div>
	);
}
