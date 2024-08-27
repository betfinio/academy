import { useProgress } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { Progress } from 'betfinio_app/progress';
import { StarIcon } from 'lucide-react';
import { useAccount } from 'wagmi';

const ProgressBar = () => {
	const { address = ZeroAddress } = useAccount();
	const { data: xp = 0 } = useProgress(address);
	return (
		<div className={'w-full min-h-[100px] flex flex-wrap flex-row items-center gap-2 md:gap-3 lg:gap-4'}>
			<div className={'flex flex-col items-start gap-1'}>
				<span className={'text-gray-500'}>Your progress</span>
				<div className={'flex flex-row items-center gap-2'}>
					<StarIcon className={'w-6 h-6 text-yellow-400 border-2 border-yellow-400 rounded-full'} />
					LVL 1
				</div>
			</div>
			<div className="flex flex-grow items-center gap-x-6 flex-wrap">
				<div className={'flex-grow min-w-64'}>
					<Progress value={(xp * 100) / 1000} className={'bg-primaryLighter '} />
				</div>
				<div className={'font-semibold text-lg'}>
					{xp}XP <span className={'text-gray-600'}> / 1000</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
