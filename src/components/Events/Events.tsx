import { useEvents } from '@/src/lib/query';
import type { Event } from '@/src/lib/types';
import { ZeroAddress } from '@betfinio/abi';
import { Link } from '@tanstack/react-router';
import { Badge } from 'betfinio_app/badge';
import { Button } from 'betfinio_app/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from 'betfinio_app/dialog';
import { getStakingUrl } from 'betfinio_app/lib';
import { useTreeMember } from 'betfinio_app/lib/query/affiliate';
import { Separator } from 'betfinio_app/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'betfinio_app/tooltip';
import { ExternalLink, EyeIcon, Sun, XCircle } from 'lucide-react';
import { DateTime } from 'luxon';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const Events = () => {
	const { data: events = [] } = useEvents();
	const { t } = useTranslation('academy', { keyPrefix: 'events.table' });

	return (
		<div className={'flex flex-col gap-2 my-4 w-full'}>
			<div className={'w-full rounded-lg grid grid-cols-10 bg-primaryLighter text-muted-foreground p-3 text-sm md:text-base gap-2'}>
				<div className={'text-center col-span-2'}>{t('date')}</div>
				<div className={'text-center col-span-3 md:col-span-1'}>{t('time')}</div>
				<div className={'col-span-4 md:col-span-2 text-center'}>{t('event')}</div>
				<div className={'text-center col-span-2 hidden md:block'}>{t('language')}</div>
				<div className={'col-span-1 text-center hidden md:block'}>{t('link')}</div>
				<div className={'hidden md:block md:col-span-2 text-center'}>{t('join')}</div>
			</div>
			{events.map((e, index) => (
				<SingleEvent key={index} event={e} />
			))}
			{events.length === 0 && <div className={'text-center'}>{t('noEvents')}</div>}
		</div>
	);
};

const SingleEvent: FC<{ event: Event }> = ({ event }) => {
	const { i18n, t } = useTranslation('academy');
	const { address = ZeroAddress } = useAccount();
	const { data: member } = useTreeMember(address);
	const staked = member?.volume ?? 0n;
	const required = BigInt(event.minToStake) * 10n ** 18n;
	const title = event.title[i18n.language] ?? event.title.en;
	const now = Math.floor(Date.now() / 1000);
	const isLive = now > event.timestamp && now < event.timestamp + 60 * 60 * 4;
	return (
		<Dialog>
			<div className={'w-full rounded-lg grid grid-cols-10 bg-primaryLighter p-2 items-center gap-2 text-sm md:text-base '}>
				<div className={'text-center col-span-2'}>{DateTime.fromSeconds(event.timestamp).toFormat('dd.MM.yy')}</div>
				<div className={'text-center col-span-3 md:col-span-1  flex  gap-1 justify-center items-center flex-row '}>
					{isLive ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Badge variant={'secondary'} className={'bg-yellow-400/20 text-yellow-400 md:text-base gap-1 px-2 py-1 animate-pulse uppercase'}>
										{DateTime.fromSeconds(event.timestamp).toFormat('T')} LIVE
									</Badge>
								</TooltipTrigger>
								<TooltipContent className={'bg-yellow-400 text-black'}>{t('events.live')}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						DateTime.fromSeconds(event.timestamp).toFormat('T')
					)}
				</div>
				<div className={'col-span-4 md:col-span-2 text-center'}>{title}</div>
				<div className={'text-center col-span-2 hidden md:block'}>{event.language}</div>
				<div className={'text-center col-span-1 hidden md:flex items-center justify-center'}>
					<a href={event.link} rel={'noreferrer'} target={'_blank'} className={'text-center'}>
						<ExternalLink className={'w-4 h-4'} />
					</a>
				</div>
				<div className={'hidden md:block md:col-span-2 text-center w-full'}>
					{member && staked > required ? (
						<a href={event.url} target={'_blank'} rel={'noreferrer'}>
							<Button className={'w-full'}>{t('join')}</Button>
						</a>
					) : (
						<DialogTrigger className={'w-full'}>
							<Button className={'w-full bg-green-500 hover:bg-green-500/40'}>{t('stake')}</Button>
						</DialogTrigger>
					)}
				</div>
				<div className={'md:hidden flex items-center justify-center'}>
					<DialogTrigger>
						<EyeIcon />
					</DialogTrigger>
				</div>
			</div>
			<DialogContent className={'academy p-4 text-white rounded-lg w-auto'}>
				<DialogClose className={'absolute top-4 right-4'}>
					<XCircle className={'w-4 h-4'} />
				</DialogClose>
				<div className={'w-[90vw] md:max-w-[500px] flex gap-4 flex-col'}>
					<div className={'flex flex-row justify-between'}>
						<div className={'flex flex-col gap-4'}>
							<DialogTitle className={'text-muted-foreground font-normal'}>{t('events.table.event')}</DialogTitle>
							<div>{title}</div>
						</div>
						<div className={'flex flex-col justify-end'}>
							{isLive && (
								<Badge variant={'secondary'} className={'bg-yellow-400/20 text-yellow-400 gap-1 px-2 py-1 animate-pulse uppercase'}>
									{t('events.live')} <Sun className={'w-3 h-3'} />
								</Badge>
							)}
						</div>
					</div>
					<Separator />
					<div className={'flex flex-row '}>
						<div className={'flex flex-col w-1/3 gap-4'}>
							<div className={'text-muted-foreground font-normal'}>{t('events.table.date')}</div>
							<div>{DateTime.fromSeconds(event.timestamp).toFormat('dd.MM.yy')}</div>
						</div>
						<div className={'flex flex-col w-1/3 gap-4'}>
							<div className={'text-muted-foreground font-normal'}>{t('events.table.time')}</div>
							<div>{DateTime.fromSeconds(event.timestamp).toFormat('T')}</div>
						</div>
						<div className={'flex flex-col gap-4'}>
							<div className={'text-muted-foreground font-normal'}>{t('events.table.language')}</div>
							<div>{event.language}</div>
						</div>
					</div>
				</div>
				<Separator />
				<div className={'flex flex-col gap-4'}>
					<div className={'text-muted-foreground'}>{t('events.table.join')}</div>
					<div className={'flex items-start justify-between flex-col gap-1'}>
						<div className={'text-xs text-gray-500'}>
							{t('events.minStake')} {event.minToStake.toLocaleString()} BET
						</div>
						{member && staked > required ? (
							<a href={event.url} target={'_blank'} className={'w-full'} rel={'noreferrer'}>
								<Button className={'w-full'}>{t('join')}</Button>
							</a>
						) : (
							<Link to={getStakingUrl()} className={'w-full'}>
								<Button className={'w-full bg-green-500 hover:bg-green-500/40'}>{t('stake')}</Button>
							</Link>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Events;
