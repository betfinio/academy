import { useProgress } from '@/src/lib/query';
import { shootConfetti } from '@/src/lib/utilts.ts';
import { ZeroAddress } from '@betfinio/abi';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Button } from 'betfinio_app/button';
import { DialogClose } from 'betfinio_app/dialog';
import { Progress } from 'betfinio_app/progress';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { type FC, useEffect } from 'react';
import { useAccount } from 'wagmi';

export const QuizCompleteModal: FC<{ onClose: () => void; newXp: number }> = ({ onClose, newXp }) => {
	const { address = ZeroAddress } = useAccount();
	const { data: xp = 0 } = useProgress(address);

	const queryClient = useQueryClient();

	useEffect(() => {
		shootConfetti();
		setTimeout(() => queryClient.invalidateQueries({ queryKey: ['academy'] }), 1000);
	}, []);

	return (
		<motion.div className={'rounded-lg bg-primaryLight p-5 lg:p-10 w-[350px] lg:w-[450px] flex flex-col items-center gap-8 text-white'}>
			<X
				width={20}
				height={20}
				onClick={onClose}
				className={
					'absolute top-4 right-4 rounded-full text-white border border-white p-0.5 cursor-pointer hover:border-red-roulette hover:text-red-roulette duration-300'
				}
			/>

			<div className={'text-xl font-semibold'}>Quiz complete!</div>
			<div className={'text-[32px] font-semibold text-yellow-400'}>+{newXp} XP</div>

			<div className={'text-center w-full'}>
				<span className={'text-[#6A6F84]'}>Your progress</span>
				<Progress value={((xp % 1000) * 100) / 1000} className={'bg-primary h-[8px] w-full mt-4'} size={100} height={100} />
				<div className={'flex flex-row items-center mt-1'}>
					<div className={'text-[#6A6F84]'}>LVL {Math.floor(xp / 1000) + 1}</div>
					<div className={'flex-grow'} />
					<div className={'text-[#6A6F84]'}>LVL {Math.floor(xp / 1000) + 2}</div>
				</div>
			</div>

			<Link to={'/advanced'}>
				<Button className={'uppercase w-full'} size={'lg'}>
					Tackle to the next unit
				</Button>
			</Link>
		</motion.div>
	);
};
