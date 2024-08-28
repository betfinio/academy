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
