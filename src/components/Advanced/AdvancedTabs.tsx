import { useProgress } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'betfinio_app/tabs';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { Staking } from './Staking.tsx';

const tabs = ['staking', 'affiliate', 'games', 'partner'];
export const AdvancedTabs = () => {
	const { t } = useTranslation('', { keyPrefix: 'academy.advanced.tabs' });
	const { address = ZeroAddress } = useAccount();
	const { data: progress = 0n } = useProgress(address);
	const isOpen = (tab: string) => {
		if (tab === 'staking') return true;
		if (tab === 'affiliate') return progress > 1000n;
		if (tab === 'gaming') return progress > 2000n;
		if (tab === 'partner') return progress > 3000n;
	};
	return (
		<div className={'w-full'}>
			<Tabs defaultValue={tabs[0]}>
				<TabsList className=" w-full grid grid-cols-4 ">
					{tabs.map((tab) => (
						<TabsTrigger variant="contained" disabled={!isOpen(tab)} className="w-full bg-primaryLight text-base" value={tab} key={tab}>
							{t(tab)}
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value="staking" className="mt-5">
					<Staking />
				</TabsContent>
				<TabsContent value="affiliate">Comming soon...</TabsContent>
				<TabsContent value="games">Comming soon...</TabsContent>
				<TabsContent value="partner">Comming soon...</TabsContent>
			</Tabs>
		</div>
	);
};
