import { Tabs, TabsContent, TabsList, TabsTrigger } from 'betfinio_app/tabs';
import { Stacking } from './Stacking';

const tabs = ['Staking', 'Affiliate', 'Gaming', 'Partners'];
export const AdvancedTabs = () => {
	return (
		<div>
			<Tabs defaultValue={tabs[0]}>
				<TabsList className="flex-wrap justify-center  md:justify-normal">
					{tabs.map((tab) => (
						<TabsTrigger variant="contained" className="w-64 bg-primaryLight text-base" value={tab} key={tab}>
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
