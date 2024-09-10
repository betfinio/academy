import CollapseSection from '@/src/components/Advanced/CollapseSection.tsx';
import { useAdvancedSections, useProgress } from '@/src/lib/query';
import { getRequired } from '@/src/lib/utilts.ts';
import { ZeroAddress } from '@betfinio/abi';
import { Accordion } from 'betfinio_app/accordion';
import { Loader } from 'lucide-react';
import type { FC } from 'react';
import { useAccount } from 'wagmi';

export const Sections: FC<{ tab: string }> = ({ tab }) => {
	const { data = [], isLoading } = useAdvancedSections(tab);
	const { address = ZeroAddress } = useAccount();
	const { data: progress = 0 } = useProgress(address);
	if (isLoading) {
		return <Loader className="animate-spin" />;
	}
	return (
		<div className={'w-full relative'}>
			<Accordion type="single" collapsible className="w-full gap-4 flex flex-col">
				{data.map((section, key) => (
					<CollapseSection section={section} key={key} />
				))}
			</Accordion>
			{progress < getRequired(tab) && (
				<div className={'absolute w-full h-full min-h-[200px] top-0 left-0 backdrop-blur flex flex-row items-center justify-center'}>
					<div className={'text-white bg-red-roulette/50 rounded-lg p-4 text-center'}>
						Section is locked!
						<div>Get {getRequired(tab)}XP to unlock this section</div>
					</div>
				</div>
			)}
		</div>
	);
};
