import confetti from 'canvas-confetti';

export const shootConfetti = () => {
	confetti({
		particleCount: 400,
		angle: 0,
		spread: 360,
		startVelocity: 40,
		scalar: 1,
		origin: { x: 0.5, y: 0.4 },
		colors: ['#FF2A51', '#B100A8', '#FFB300', '#B0D100', '#2462E7'],
	});

	confetti({
		particleCount: 50,
		spread: 360,
		startVelocity: 35,
		gravity: 0,
		decay: 0.96,
		scalar: 2,
		shapes: ['circle'],
		colors: ['#FF2A51', '#B100A8', '#FFB300', '#B0D100', '#2462E7'],
		origin: { x: 0.5, y: 0.4 },
	});
};

export const getRequired = (tab: string): number => {
	if (tab === 'staking') return 0;
	if (tab === 'affiliate') return 0;
	if (tab === 'games') return 0;
	if (tab === 'partner') return 0;
	return 0;
};
