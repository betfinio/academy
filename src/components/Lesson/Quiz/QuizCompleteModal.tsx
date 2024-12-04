import { useProgress } from '@/src/lib/query';
import { shootConfetti } from '@/src/lib/utilts.ts';
import { ZeroAddress } from '@betfinio/abi';
import { Button, Progress } from '@betfinio/components/ui';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

export const QuizCompleteModal: FC<{ onClose: () => void; newXp: number; onButtonClick: () => void }> = ({ onClose, onButtonClick, newXp }) => {
	const { t } = useTranslation();
	const { address = ZeroAddress } = useAccount();
	const { data: xp = 0 } = useProgress(address);

	return (
		<motion.div className={'rounded-lg bg-primary-light p-5 lg:p-10 w-[350px] lg:w-[450px] flex flex-col items-center gap-8 text-white'}>
			<X
				width={20}
				height={20}
				onClick={onClose}
				className={
					'absolute top-4 right-4 rounded-full text-white border border-white p-0.5 cursor-pointer hover:border-red-roulette hover:text-red-roulette duration-300'
				}
			/>

			<div className={'text-xl font-semibold'}>{t('quiz.quizComplete')}</div>
			<div className={'text-[32px] font-semibold text-secondary-foreground'}>+{newXp} XP</div>

			<div className={'text-center w-full'}>
				<span className={'text-muted-foreground'}>{t('quiz.yourProgress')}</span>
				<Progress value={((xp % 1000) * 100) / 1000} className={'bg-secondary h-[8px] w-full mt-4'} />
				<div className={'flex flex-row items-center mt-1'}>
					<div className={'text-muted-foreground'}>LVL {Math.floor(xp / 1000) + 1}</div>
					<div className={'flex-grow'} />
					<div className={'text-muted-foreground'}>LVL {Math.floor(xp / 1000) + 2}</div>
				</div>
			</div>

			<Button className={'uppercase w-full'} onClick={onButtonClick} size={'lg'}>
				{t('quiz.tackleNextUnit')}
			</Button>
		</motion.div>
	);
};
