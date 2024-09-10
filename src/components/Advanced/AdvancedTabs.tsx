import { useProgress } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'betfinio_app/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'betfinio_app/tooltip';
import { LockIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { Sections } from './Staking.tsx';

const tabs = ['staking', 'affiliate', 'games', 'partner'];
export const AdvancedTabs = () => {
	const { t } = useTranslation('', { keyPrefix: 'academy.advanced.tabs' });
	const { address = ZeroAddress } = useAccount();

	return (
		<div className={'w-full mt-4'}>
			<Tabs defaultValue={tabs[0]}>
				<TabsList className=" w-full grid grid-cols-4 mb-5 ">
					{tabs.map((tab) => (
						<TabsTrigger variant="contained" className="w-full bg-primaryLight text-base flex gap-2 items-center " value={tab} key={tab}>
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
