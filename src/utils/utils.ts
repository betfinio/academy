export function mockServerResponse<T>(value: T, timeout: number): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(value);
		}, timeout);
	});
}