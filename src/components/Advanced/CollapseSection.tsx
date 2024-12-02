import { useAdvancedLessons, useSectionStatus, useStaked } from '@/src/lib/query';
import { type AdvancedLessonSection, type Status, initialStatus } from '@/src/lib/types.ts';
import { ZeroAddress } from '@betfinio/abi';
import { AccordionContent, AccordionItem, AccordionTrigger, Tooltip, TooltipContent, TooltipTrigger } from '@betfinio/components/ui';
import { Check, ChevronDown } from 'lucide-react';
import { type FC, useMemo } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import Lesson from './Lesson';

const CollapseSection: FC<{ section: AdvancedLessonSection; requiredStake?: number }> = ({ section, requiredStake }) => {
	const { t } = useTranslation('academy');
	const { address = ZeroAddress } = useAccount();
	const { data: lessons = [] } = useAdvancedLessons(section.id);
	const { data: status = initialStatus } = useSectionStatus(section.id, address);
	const { i18n } = useTranslation();
	const title = JSON.parse(section.title || '{}');
	const { data: staked = 0n } = useStaked(address || ZeroAddress);

	const locked = useMemo(() => {
		if (requiredStake) {
			return BigInt(requiredStake) * 10n ** 18n > staked;
		}
		return false;
	}, [staked, requiredStake]);

	if (locked) {
		return (
			<Tooltip>
				<TooltipTrigger>
					<div className="bg-secondary rounded-md flex items-center py-5 px-6 h-20 gap-4 blur-sm">
						<div className="flex items-center flex-grow flex-wrap">
							<div className="flex gap-4 items-center lg:text-xl font-semibold whitespace-nowrap">
								{getBlockIcon(status, section.xp)}
								{title[i18n.language] || title.en}
							</div>
							<span className="text-secondary-foreground font-semibold  ml-auto lg:text-lg">{section.xp}XP</span>
						</div>
						<ChevronDown />
					</div>
				</TooltipTrigger>
				<TooltipContent>{t('stakeRequired', { amount: requiredStake?.toLocaleString('en') })}</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<AccordionItem className={'p-0 w-full'} key={section.title} value={section.title}>
			<AccordionTrigger className=" bg-secondary rounded-md  flex  py-5 px-6 h-20 gap-4">
				<div className="flex items-center flex-grow flex-wrap">
					<div className="flex gap-4 items-center lg:text-xl font-semibold whitespace-nowrap">
						{getBlockIcon(status, section.xp)}
						{title[i18n.language] || title.en}
					</div>
					<span className="text-secondary-foreground font-semibold  ml-auto lg:text-lg">{section.xp}XP</span>
				</div>
			</AccordionTrigger>
			<AccordionContent className="flex p-0">
				<div className="w-14  justify-center after:border-l  after:border-l-gray-800 after:h-full after:block  py-2 hidden md:flex" />
				<div className="flex flex-col shrink grow ">
					{lessons.map((lesson, i) => (
						<Lesson key={i} lesson={lesson} />
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default CollapseSection;

const getBlockIcon = (block: Status, required: number) => {
	const { xp, done } = block;
	if (done) {
		return (
			<div className="text-green-500 rounded-full border-green-500 w-8 h-8 flex justify-center items-center border-2">
				<Check className="w-4 h-4 stroke-2" />
			</div>
		);
	}

	return (
		<CircularProgressbar
			className="w-8 h-8 [&_.CircularProgressbar-path]:stroke-yellow-400 [&_.CircularProgressbar-trail]:stroke-secondary"
			value={(xp / required) * 100}
		/>
	);
};
