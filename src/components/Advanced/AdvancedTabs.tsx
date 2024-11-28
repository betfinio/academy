import type { ILanguageKeys } from '@/src/i18next.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@betfinio/components/ui';
import { useTranslation } from 'react-i18next';
import { Sections } from './Staking';

const tabs: Array<keyof ILanguageKeys['advanced']['tabs']> = ['staking', 'affiliate', 'games', 'partner'];
export const AdvancedTabs = () => {
	const { t } = useTranslation('academy');

	return (
		<div className={'w-full mt-4'}>
			<Tabs defaultValue={tabs[0]}>
				<TabsList className=" w-full grid grid-cols-4 mb-5 ">
					{tabs.map((tab) => (
						<TabsTrigger variant="contained" className="w-full bg-primary-light text-base flex gap-2 items-center " value={tab} key={tab}>
							{t(`advanced.tabs.${tab}`)}
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value="staking">
					<Sections tab="staking" />
				</TabsContent>
				<TabsContent value="affiliate">
					<Sections tab={'affiliate'} />
				</TabsContent>
				<TabsContent value="games">{t('comingSoon')}...</TabsContent>
				<TabsContent value="partner">{t('comingSoon')}...</TabsContent>
			</Tabs>
		</div>
	);
};
