import { useAdvancedLessons, useCompleteLesson, useLesson, useLessonStatus, useLessonValidation, useStaked } from '@/src/lib/query';
import { initialStatus } from '@/src/lib/types.ts';
import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { ZeroAddress, valueToNumber } from '@betfinio/abi';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'betfinio_app/button';
import { useIsMember, useMint } from 'betfinio_app/lib/query/pass';
import { useBalance as useBetBalance } from 'betfinio_app/lib/query/token';
import { cx } from 'class-variance-authority';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';

const Validation = () => {
	const { t } = useTranslation();
	const { lesson, section } = Route.useParams();
	const { address } = useAccount();
	const { data: hasPass, refetch } = useIsMember(address || ZeroAddress);
	const { data: validation } = useLessonValidation(Number(lesson));
	const { data: staked = 0n } = useStaked(address || ZeroAddress);
	const { data: lessonData = null } = useLesson(Number(lesson));
	const { mutate: complete } = useCompleteLesson();
	const { data: lessonStatus = initialStatus } = useLessonStatus(Number(lesson), address || ZeroAddress);
	const { data: lessons = [] } = useAdvancedLessons(Number(section));
	const [valid, setValid] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const navigate = useNavigate();
	const { mutate: mint, isPending, data, status } = useMint();

	const { data: balance } = useBalance({ address: address || ZeroAddress });
	const { data: betBalance = 0n } = useBetBalance(address || ZeroAddress);

	const [manual, setManual] = useState<boolean>(false);

	useEffect(() => {
		refetch();
	}, [data, status]);
	useEffect(() => {
		if (validation) {
			console.log(validation);
			if (validation.key === 'wallet_connect') {
				if (!!address && address !== ZeroAddress) {
					setValid(true);
					setError('');
					setSuccess(t('validation.wallectConnected'));
					handleFinish();
				} else {
					setValid(false);
					setError(t('validation.connectWallettTFinishTheLesson'));
					handleFinish();
					setSuccess('');
				}
			}
			if (validation.key === 'has_matic') {
				if (!!address && address !== ZeroAddress && (balance?.value || 0) > 0) {
					setValid(true);
					setError('');
					setSuccess(t('validation.youHaveCountMatic', { count: +valueToNumber(balance?.value).toFixed(2) }));
					handleFinish();
				} else {
					setValid(false);
					setError(t('validation.buyMaticToFinishTheLesson'));
					setSuccess('');
				}
			}
			if (validation.key === 'has_bet') {
				if (!!address && address !== ZeroAddress && betBalance > 0n) {
					setValid(true);
					setError('');
					setSuccess(t('validation.youHaveCountBet', { count: +valueToNumber(betBalance).toFixed(2) }));
					handleFinish();
				} else {
					setValid(false);
					setError(t('validation.ownBetToFinishLesson'));
					setSuccess('');
				}
			}
			if (validation.key === 'has_pass') {
				if (!!address && address !== ZeroAddress && hasPass) {
					setValid(true);
					setError('');
					setSuccess(t('validation.youHavePass'));
					handleFinish();
				} else {
					setValid(false);
					setError(t('validation.mintAPassToFinish'));
					setSuccess('');
				}
			}
			if (validation.key === 'staked') {
				if (!!address && address !== ZeroAddress && staked > 0n) {
					setValid(true);
					setError('');
					setSuccess(t('validation.youHaveStaked'));
					handleFinish();
				} else {
					setValid(false);
					setError(t('validation.stakeBetToFinishLesson'));
					setSuccess('');
				}
			}
			if (validation.key === 'manual') {
				console.log(manual);
				if (!!address && address !== ZeroAddress && manual) {
					setValid(true);
					setError('');
					setSuccess(t('validation.youHavePassedTheLesson'));
					handleFinish();
					setTimeout(() => handleNext(), 2000);
				} else {
					setValid(false);
					setSuccess('');
				}
			}
		}
	}, [validation, address, balance, hasPass, staked, manual]);

	const handleComplete = () => {
		setManual(true);
	};

	const handleFinish = () => {
		if (address && address !== ZeroAddress) {
			complete({ lesson: Number(lesson), xp: lessonData?.xp || 0 });
		}
	};
	const current = lessons.findIndex((l) => l.id === Number(lesson));
	const next = lessons[current + 1];
	const handleNext = async () => {
		if (!next) {
			await navigate({ to: '/advanced' });
		}
		await navigate({
			to: '/lesson/$section/$lesson',
			params: { lesson: lessons[current + 1].id.toString(), section: lessons[current + 1].section.toString() },
		});
	};

	const handleMint = () => {
		const code = JSON.parse(localStorage.getItem('code') || '{}');
		if (code.parent && code.inviter) {
			console.log('minting');
			console.log(code.inviter, code.parent);
			mint({ address: address as Address, inviter: code.inviter, parent: code.parent });
		}
	};

	if (validation === null) {
		return null;
	}

	if (lessonStatus.done) {
		return (
			<div className={'mt-4 flex flex-row justify-end gap-2 items-center'}>
				<div className={'border border-green-500 bg-green-500/10 rounded-lg p-2 w-full text-center'}>{t('validation.lessonCompleted')}</div>
				<Button onClick={handleNext} className={'w-48'}>
					{next ? t('validation.nextLesson') : t('validation.goToAdvanced')}
				</Button>
			</div>
		);
	}

	const code = JSON.parse(localStorage.getItem('code') || '{}');
	if (validation && validation.key === 'has_pass' && !hasPass && code.parent && code.inviter) {
		return (
			<div className={'flex flex-row items-center gap-2 my-2'}>
				<div className={cx('border border-green-500 bg-green-500/10 rounded-lg p-2 w-full text-center')}>{t('validation.youHaveBeenInvited')}</div>
				<Button onClick={handleMint} className={'w-48'} disabled={hasPass}>
					{isPending ? <Loader className={'animate-spin'} /> : 'Mint pass'}
				</Button>
			</div>
		);
	}
	if (validation && validation.key === 'manual') {
		return (
			<div className={'flex flex-row items-center gap-2 my-2'}>
				<div className={cx('border border-green-500 bg-green-500/10 rounded-lg p-2 w-full text-center')}>{t('validation.clickToCompelete')}</div>
				<Button onClick={handleComplete} className={'w-48'}>
					{t('validation.complete')}
				</Button>
			</div>
		);
	}

	return (
		<div className={'mt-4 flex flex-row justify-end gap-2 items-center'}>
			<div className={cx('border border-red-roulette bg-red-roulette/10 rounded-lg p-2 w-full text-center', valid && 'hidden')}>{error}</div>
			<div className={cx('border border-green-500 bg-green-500/10 rounded-lg p-2 w-full text-center', !valid && 'hidden')}>{success}</div>
			<Button onClick={handleFinish} className={'w-48'} disabled={!valid}>
				{t('validation.nextLesson')}
			</Button>
		</div>
	);
};

export default Validation;
