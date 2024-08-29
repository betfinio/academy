import { Route } from '@/src/routes/_index/lesson/$section.$lesson.tsx';
import { useCompleteLesson, useLesson, useLessonStatus, useLessonValidation } from '@/src/lib/query';
import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ZeroAddress } from '@betfinio/abi';
import { Button } from 'betfinio_app/button';
import { initialStatus } from '@/src/lib/types.ts';
import { useBalance as useBetBalance } from 'betfinio_app/lib/query/token';

const Validation = () => {
	const { lesson } = Route.useParams();
	const { address } = useAccount();
	const { data: validation } = useLessonValidation(Number(lesson));
	const { data: lessonData = null } = useLesson(Number(lesson));
	const { mutate: complete } = useCompleteLesson();
	const { data: lessonStatus = initialStatus } = useLessonStatus(Number(lesson), address || ZeroAddress);

	const [valid, setValid] = useState(false);
	const [error, setError] = useState('');
	const { data: balance } = useBalance({ address: address || ZeroAddress });
	const { data: betBalance = 0n } = useBetBalance(address || ZeroAddress);
	useEffect(() => {
		if (validation) {
			console.log(validation);
			if (validation.key === 'wallet_connect') {
				if (!!address && address !== ZeroAddress) {
					setValid(true);
					setError('');
				} else {
					setValid(false);
					setError('Connect your wallet to finish the lesson');
				}
			}
			if (validation.key === 'has_matic') {
				if (!!address && address !== ZeroAddress && (balance?.value || 0) > 0) {
					setValid(true);
					setError('');
				} else {
					setValid(false);
					setError('Buy MATIC to finish the lesson');
				}
			}
			if (validation.key === 'has_bet') {
				if (!!address && address !== ZeroAddress && betBalance > 0n) {
					setValid(true);
					setError('');
				} else {
					setValid(false);
					setError('Own BETs to finish the lesson');
				}
			}
		}
	}, [validation, address, balance]);

	const handleFinish = () => {
		complete({ lesson: Number(lesson), xp: lessonData?.xp || 0 });
	};

	if (lessonStatus.done) {
		return null;
	}

	return (
		<div className={'mt-4 flex flex-row justify-end'}>
			{valid ? <Button onClick={handleFinish}>Continue</Button> : <Button variant={'outline'}>{error}</Button>}
		</div>
	);
};

export default Validation;
