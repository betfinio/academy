import { useAdvancedLessons, useCompleteLesson, useLesson, useLessonStatus, useLessonValidation } from '@/src/lib/query';
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
import type { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';

const Validation = () => {
	const { lesson, section } = Route.useParams();
	const { address } = useAccount();
	const { data: hasPass } = useIsMember(address || ZeroAddress);
	const { data: validation } = useLessonValidation(Number(lesson));
	const { data: lessonData = null } = useLesson(Number(lesson));
	const { mutate: complete } = useCompleteLesson();
	const { data: lessonStatus = initialStatus } = useLessonStatus(Number(lesson), address || ZeroAddress);
	const { data: lessons = [] } = useAdvancedLessons(Number(section));
	const [valid, setValid] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const navigate = useNavigate();
	const { mutate: mint, isPending } = useMint();

	const { data: balance } = useBalance({ address: address || ZeroAddress });
	const { data: betBalance = 0n } = useBetBalance(address || ZeroAddress);
	useEffect(() => {
		if (validation) {
			console.log(validation);
			if (validation.key === 'wallet_connect') {
				if (!!address && address !== ZeroAddress) {
					setValid(true);
					setError('');
					setSuccess('Wallet connected');
					handleFinish();
				} else {
					setValid(false);
					setError('Connect your wallet to finish the lesson');
					handleFinish();
					setSuccess('');
				}
			}
			if (validation.key === 'has_matic') {
				if (!!address && address !== ZeroAddress && (balance?.value || 0) > 0) {
					setValid(true);
					setError('');
					setSuccess(`You have ${valueToNumber(balance?.value).toFixed(2)} MATIC`);
					handleFinish();
				} else {
					setValid(false);
					setError('Buy MATIC to finish the lesson');
					setSuccess('');
				}
			}
			if (validation.key === 'has_bet') {
				if (!!address && address !== ZeroAddress && betBalance > 0n) {
					setValid(true);
					setError('');
					setSuccess(`You have ${valueToNumber(betBalance).toFixed(2)} BET`);
					handleFinish();
				} else {
					setValid(false);
					setError('Own BETs to finish the lesson');
					setSuccess('');
				}
			}
			if (validation.key === 'has_pass') {
				if (!!address && address !== ZeroAddress && hasPass) {
					setValid(true);
					setError('');
					setSuccess('You have a Pass');
					handleFinish();
				} else {
					setValid(false);
					setError('Mint a Pass to finish the lesson');
					setSuccess('');
				}
			}
		}
	}, [validation, address, balance]);

	const handleFinish = () => {
		if (address && address !== ZeroAddress) {
			complete({ lesson: Number(lesson), xp: lessonData?.xp || 0 });
		}
	};

	const handleNext = async () => {
		console.log('next');
		const next = lessons.findIndex((l) => l.id === Number(lesson));
		console.log(lessons[next + 1]);
		await navigate({ to: '/lesson/$section/$lesson', params: { lesson: lessons[next + 1].id.toString(), section: lessons[next + 1].section.toString() } });
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
				<div className={'border border-green-500 bg-green-500/10 rounded-lg p-2 w-full text-center'}>Lesson completed</div>
				<Button onClick={handleNext} className={'w-48'} disabled={!valid}>
					Next lesson
				</Button>
			</div>
		);
	}

	const code = JSON.parse(localStorage.getItem('code') || '{}');
	if (validation && validation.key === 'has_pass' && !hasPass && code.parent && code.inviter) {
		return (
			<div className={'flex flex-row items-center gap-2 my-2'}>
				<div className={cx('border border-green-500 bg-green-500/10 rounded-lg p-2 w-full text-center')}>You have been invited to Betfin.io</div>
				<Button onClick={handleMint} className={'w-48'} disabled={hasPass}>
					{isPending ? <Loader className={'animate-spin'} /> : 'Mint pass'}
				</Button>
			</div>
		);
	}

	return (
		<div className={'mt-4 flex flex-row justify-end gap-2 items-center'}>
			<div className={cx('border border-red-roulette bg-red-roulette/10 rounded-lg p-2 w-full text-center', valid && 'hidden')}>{error}</div>
			<div className={cx('border border-green-500 bg-green-500/10 rounded-lg p-2 w-full text-center', !valid && 'hidden')}>{success}</div>
			<Button onClick={handleFinish} className={'w-48'} disabled={!valid}>
				Next lesson
			</Button>
		</div>
	);
};

export default Validation;
