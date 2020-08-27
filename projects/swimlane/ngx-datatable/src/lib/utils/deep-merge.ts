/*!
 * Deep merge two or more objects into the first.
 * Author: Benjamin Vettori (benjamin.vettori@gmail.com)
 * Based on Chris Ferdinandi's deepAssign https://vanillajstoolkit.com/helpers/deepassign/
 * License: MIT
 * @param   {Object} objects  The objects to merge together
 * @returns {Object}          Merged values of defaults and options
 */
export let deepMerge = (...args: any[]): any => {
	// Make sure there are objects to merge
	const len = args.length;
	if (len < 1) return;
	if (len < 2) return args[0];
	args[0] = args[0] || {};

	// Merge all objects into first
	for (let i = 1; i < len; i++) {
		if(Object.prototype.toString.call(args[i]) !== '[object Object]') {
			continue; // skip non-object values during merge (e.g. if one of the params in undefined).
		}
		for (const key in args[i]) {
			// If it's an object, recursively merge
			// Otherwise, push to key
			if (Object.prototype.toString.call(args[0][key]) === '[object Object]' && Object.prototype.toString.call(args[i][key]) === '[object Object]') {
				args[0][key] = deepMerge(args[0][key], args[i][key]);
			} else {
				args[0][key] = args[i][key];
			}
		}
	}

	return args[0];
};
