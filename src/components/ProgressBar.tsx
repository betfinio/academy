import { useProgress } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { Progress } from '@betfinio/components/ui';
import { StarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const ProgressBar = () => {
	const { t } = useTranslation();
	const { address = ZeroAddress } = useAccount();
	const { data: xp = 0 } = useProgress(address);
	return (
		<div className={'w-full min-h-[100px] flex flex-wrap flex-row items-center gap-2 md:gap-3 lg:gap-4'}>
			<div className={'flex flex-col items-start gap-1'}>
				<span className={'text-gray-500'}>{t('quiz.yourProgress')}</span>
				<div className={'flex flex-row items-center gap-2'}>
					<StarIcon className={'w-6 h-6 text-secondary-foreground border-2 border-yellow-400 rounded-full'} />
					LVL {Math.floor(xp / 1000) + 1}
				</div>
			</div>
			<div className="flex flex-grow items-center gap-x-6 flex-wrap">
				<div className={'flex-grow min-w-64'}>
					<Progress value={((xp % 1000) * 100) / 1000} className={'bg-secondary'} />
				</div>
				<div className={'font-semibold text-lg'}>
					{xp}XP <span className={'text-gray-600'}> / {(Math.floor(xp / 1000) + 1) * 1000}</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
