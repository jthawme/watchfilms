/**
 *
 * @param {T[]} arr
 * @param {(item: T, idx: number, arr: T[]) => any} cb
 * @template T
 */
export const promiseRunner = (arr, cb) => {
	/** @type {any[]} */
	const data = [];

	return new Promise((resolve) => {
		const run = async (idx = 0) => {
			if (idx >= arr.length) {
				resolve(data);
				return;
			}

			const r = await Promise.resolve().then(() => cb(arr[idx], idx, arr));
			data.push(r);

			run(idx + 1);
		};

		run();
	});
};

/**
 * A promise version of setTimeout
 *
 * @param {number} time
 * @param {boolean} error
 * @returns {Promise<void>}
 */
export const timer = (time = 2000, error = false) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (error) {
				reject();
			} else {
				resolve();
			}
		}, time);
	});
};
