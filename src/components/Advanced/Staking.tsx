import { useAdvancedSections } from '@/src/lib/query';
import { Loader } from 'lucide-react';
import { Accordion } from 'betfinio_app/accordion';
import CollapseSection from '@/src/components/Advanced/CollapseSection.tsx';

export const Staking = () => {
	const { data = [], isLoading } = useAdvancedSections('staking');
	console.log(data)
	console.log('staking tab')
	if (isLoading) {
		return <Loader className="animate-spin" />;
	}
	return (
		<Accordion type="single" collapsible className="w-full gap-4 flex flex-col">
			{data.map((section, key) => (
				<CollapseSection section={section} key={key} />
			))}
		</Accordion>
	);
};
