import { Tabs, TabsContent, TabsList, TabsTrigger } from 'betfinio_app/tabs';
import { Stacking } from './Stacking';

const tabs = ['Staking', 'Affiliate', 'Gaming', 'Partners'];
export const AdvancedTabs = () => {
	return (
		<div className={'w-full'}>
			<Tabs defaultValue={tabs[0]}>
				<TabsList className=" w-full grid grid-cols-4 ">
					{tabs.map((tab) => (
						<TabsTrigger variant="contained" className="w-full bg-primaryLight text-base" value={tab} key={tab}>
							{tab}
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value="Staking" className="mt-5">
					<Stacking />
				</TabsContent>
				<TabsContent value="Affiliate">Comming soon...</TabsContent>
				<TabsContent value="Gaming">Comming soon...</TabsContent>
				<TabsContent value="Partners">Comming soon...</TabsContent>
			</Tabs>
		</div>
	);
};
