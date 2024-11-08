export function mockServerResponse<T>(value: T, timeout: number): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(value);
		}, timeout);
	});
}

export const roundToOneDecimalPoint = (num: number): number => {
	return Math.round(num * 10) / 10;
};

export function shuffle<T>(array: T[]): T[] {
	let currentIndex = array.length;
	const copy = [...array];

	while (currentIndex !== 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
	}

	return copy;
}
