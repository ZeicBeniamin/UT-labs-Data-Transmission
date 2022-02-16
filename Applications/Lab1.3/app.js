document.getElementById("n").addEventListener('input', inputSum);

function inputSum() {
	var inputString = document.getElementById("n").value;
	var sum_n = sum(inputString);
	// console.log(sum_n)
	document.getElementById("result").innerHTML = sum_n;
}

function sum(n) {
	// We'll use the modulo check. If the string modulo 1 
	// returns a number, the string contained a number.
	// Othwerise, the string was not a number
	modulo = n % 1;
	// We also use the property that Nan != Nan is true 
	// (Nan is not equal to itself)
	if (modulo === modulo){
		var sum = 0;
		for (var i = 1; i <= n; ++i) {
			sum += i;
		}
	}
	else {
		// console.log(modulo + " Was not a number")
		sum = "not a number"
	}
	return sum;
}