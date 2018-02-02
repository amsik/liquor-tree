
export default {
	add(source, target) {
		if (source.push) {
			source.push(target)
		}
	},

	remove(source, target) {
		if (source.includes && source.includes(target)) {
			source.splice(
				source.indexOf(target),
				1
			)
		}
	},

	empty(source) {
		if (source.splice) {
			source.splice(0, source.length)
		}
	}
};
