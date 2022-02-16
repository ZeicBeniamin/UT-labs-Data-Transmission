document.getElementById("n").addEventListener('input', inputProc);

function inputProc() {
	var inputString = document.getElementById("n").value;
	// We use the property that a NaN modulo 1 returns NaN, while a number returns 0
	// Furthermore, Nan === Nan returns false
	fib = fibonacci(inputString);
	console.log(fib);
}

function fibonacci(input) {
	if (typeof input == 'undefinded')
		return "not allowed"
	// Check if input is a number
	modulo = input % 1;
	if (modulo === modulo) {
		number = (parseInt(input));
		if (number < 1 || number > 10) {
			return "not allowed";
		}
		if (number == 1) {
			return [1];
		}
		out_vector = [1, 1];
		for (let i = 2; i < number; ++i) {
			out_vector.push(out_vector[i-1] + out_vector[i-2]);
		}
		return out_vector
	} else {
		return "not allowed";	}
}