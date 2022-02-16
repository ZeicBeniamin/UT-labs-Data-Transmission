(function test() {
	console.log(fibonacci("char_seq") == "not allowed" ? "Passed" : "Failed");
	console.log(fibonacci("false") == "not allowed" ? "Passed" : "Failed");
	console.log(arrayEquality(fibonacci(2), [1, 1]) ? "Passed" : "Failed");
	console.log(arrayEquality(fibonacci(5), [1, 1, 2, 3, 5]) ? "Passed" : "Failed");

}
)()

function arrayEquality(a, b) {
	return Array.isArray(a) && Array.isArray(b) &&
	a.length === b.length &&
	a.every((val, index) => val === b[index]);
}