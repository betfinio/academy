import { ZeroAddress } from '@betfinio/abi';
import { Link, Outlet, ScrollRestoration, createFileRoute, useLocation } from '@tanstack/react-router';
import { useIsMember } from 'betfinio_app/lib/query/pass';
import { cx } from 'class-variance-authority';
import { BookIcon, CalendarHeart, GraduationCap, PencilRulerIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import type { ILanguageKeys } from '../i18next';

export const Route = createFileRoute('/_index')({
	component: () => <Layout />,
});

type IAcademyLinks = Array<keyof ILanguageKeys['layout']>;

function Layout() {
	const { t } = useTranslation('academy');
	const router = useLocation();
	const { address } = useAccount();
	const { data: hasPass } = useIsMember(address || ZeroAddress);
	const isActive = (path: string) => {
		switch (path) {
			case 'new':
				return router.href.includes('lesson/1');
			case 'advanced':
				return /lesson\/([2-9]|\d{2,})(\/|$)/.test(router.href) || router.pathname.includes(path);
			default:
				return router.pathname.includes(path);
		}
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
	const code = JSON.parse(localStorage.getItem('code') || '{}');
	const parent = code.parent;
	return (
		<div className={'p-2 md:p-3 lg:p-4 text-white h-full flex flex-col gap-8 md:gap-6'}>
			<ScrollRestoration />
			<div className={'grid grid-cols-4 md:grid-cols-4 w-full gap-2 md:gap-3 lg:gap-4  rounded-xl '}>
				{(['docs', 'new', 'advanced', 'events'] as IAcademyLinks).map((link) => (
					<Link
						to={`/${link}`}
						search={{}}
						params={{}}
						key={link}
						className={cx(
							'flex flex-col md:flex-row text-xs md:text-base border py-2 lg:p-2 justify-center font-semibold items-center gap-2   rounded-lg duration-200 hover:bg-secondary/50 ',
							isActive(link) ? 'bg-primary-gradient' : 'text-gray-400 ',
						)}
					>
						<span className={cx(isActive(link) ? 'text-yellow-400' : 'text-gray-400 ')}>{getIcon(link)}</span>
						{t(`layout.${link}`)}
					</Link>
				))}
			</div>
			<div className={'relative w-full'}>
				<div className={cx(!hasPass && !parent && 'blur pointer-events-none')}>
					<Outlet />
				</div>
				{!hasPass && !parent && (
					<div className={'absolute top-[200px] flex z-[10] justify-center w-full'}>
						<div className={cx(!hasPass && !parent && 'bg-primaryLight text-center border rounded-lg p-4 flex flex-col items-start')}>
							<div className={'text-lg'}>{t('contentIsLockedForYou')}</div>
							<br />
							<div className={'text-yellow-400'}>{t('newUsers')}:</div>
							<div>{t('newUsersDescription')}</div>
							<br />
							<div className={'text-yellow-400'}>{t('betfinMembers')}:</div>
							<div>{t('betfinMembersDescription')}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
