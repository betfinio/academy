import { useProgress } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'betfinio_app/tabs';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { Sections } from './Staking.tsx';
import type { FC } from 'react';
import { LockIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'betfinio_app/tooltip';

const tabs = ['staking', 'affiliate', 'games', 'partner'];
export const AdvancedTabs = () => {
	const { t } = useTranslation('', { keyPrefix: 'academy.advanced.tabs' });
	const { address = ZeroAddress } = useAccount();
	const { data: progress = 0 } = useProgress(address);

	const getRequired = (tab: string): number => {
		if (tab === 'staking') return 0;
		if (tab === 'affiliate') return 1000;
		if (tab === 'games') return 2000;
		if (tab === 'partner') return 3000;
		return 0;
	};
	return (
		<div className={'w-full mt-4'}>
			<Tabs defaultValue={tabs[0]}>
				<TabsList className=" w-full grid grid-cols-4 mb-5 ">
					{tabs.map((tab) => (
						<TabsTrigger
							variant="contained"
							disabled={getRequired(tab) > progress}
							className="w-full bg-primaryLight text-base flex gap-2 items-center "
							value={tab}
							key={tab}
						>
							<ClosedIcon required={getRequired(tab)} progress={progress} />
							{t(tab)}
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value="staking">
					<Sections tab="staking" />
				</TabsContent>
				<TabsContent value="affiliate">
					<Sections tab={'affiliate'} />
				</TabsContent>
				<TabsContent value="games">Comming soon...</TabsContent>
				<TabsContent value="partner">Comming soon...</TabsContent>
			</Tabs>
		</div>
	);
};

const ClosedIcon: FC<{ required: number; progress: number }> = ({ required, progress }) => {
	if (progress > required) return null;
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<LockIcon className={'w-4 h-4 z-[1]'} />
				</TooltipTrigger>
				<TooltipContent>You need LVL {Math.floor(required / 1000) + 1} to unlock this section</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
