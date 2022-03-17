function decode(bits) {
	// var z8=parity(bits[])
	// var z4=parity(bits[3]+bits[4]+bits[5]+bits[6]);
	// var z2=parity(bits[1]+bits[2]+bits[5]+bits[6]);
	// var z1=parity(bits[0]+bits[2]+bits[4]+bits[6]);
	// var z0 = ...

	// controlBits = 
	var firstPos = 0;
	var xor = 0;
	for (let i = 1; i <= bits.length; ++i) {
		// Recompute the control bits and check them
		// mask = (1 << i);
		// sum = 0;
		// for (let j = 1; j <= bits.length; ++j) {
			// if (j & mask) {
				// sum += 1;
			// }
		// }
		if (bits[i - 1]) {
			xor = i;
			firstPos = i;
			console.log("I is " + i + " xor is " + xor);
			break;
		}
	}

	for (let i = firstPos + 1; i <= bits.length; ++i) {
		// Recompute the control bits and check them
		// mask = (1 << i);
		// sum = 0;
		// for (let j = 1; j <= bits.length; ++j) {
			// if (j & mask) {
				// sum += 1;
			// }
		// }
		if (bits[i - 1]) {
			xor = i ^ xor;
			console.log("I is " + i + " xor is " + xor);
			console.log("i ^ xor " + (i ^ xor));
		}
	}
    
	var errorPosition = xor;

    // var errorPosition=z1*1+z2*2+z4*4;
	var errorDetected=false;
	if (errorPosition!=0) errorDetected=true;
	if (errorDetected) {
		bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
	}
    return { errorCorrected: errorDetected, errorPosition: errorPosition-1, bits: bits };
}

parity = function(number){
	return number % 2;
}

exports.decode = decode;
