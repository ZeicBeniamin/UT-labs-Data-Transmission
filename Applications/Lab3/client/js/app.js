var app = new Vue({
    el: '#hamming-encoder',
    data: {
        dataBits: [],
        status: '',
        numberOfDataBits: 4,
        controlBits: 3
    },
    created: function () {
        this.initDataBits(4);
    },
    methods: {
        initDataBits: function(){
            this.dataBits=[];
            
            for(var i=0;i<this.numberOfDataBits;i++){
                var bit = { data: null };
                this.dataBits.push(bit);
            }

            this.controlBits = parseInt(Math.log2(this.numberOfDataBits)) + 1
            console.log("Have parity bits " + this.controlBits)
        },
        send: function () {
            if (this.validate(this.dataBits) === true){
                var encodedMessage = this.encode(this.dataBits);
                this.status = encodedMessage + ' encoded sent to server';

                return axios.put("http://localhost:3000/message", {bits: encodedMessage}).then(
                    response => (this.status = response.data)
                );
            } else {
                this.status = 'Input is not valid. Please use 0 or 1 as data bit values';
            }
        },
        encode: function(bits){
            // This function must be changed to allow any number of data bits
            // Right now it only works for 4 data bits
            control_sums = Array.from('0'.repeat(this.controlBits))

            m = parseInt(this.numberOfDataBits);
            k = parseInt(this.controlBits);
            // console.log("M and k " + m + k);
            // Create an array of length data + control bits
            result = Array.from('0'.repeat(m + k))
            // Counter for the data bits relocated to the result array
            p = 0;
            // Initialize it with the interleaved data and control bits
            for (let i = 1; i <= result.length; ++i) {
                // If a number is not a power of two, then it is not a
                // control bit
                if (!this.isPowerOfTwo(i)) {
                    // console.log(i + " is not power of two")
                    // console.log("Value is " + )
                    // console.info(bits)
                    result[i - 1] = parseInt(bits[p].data);
                    ++p;
                }
            }
            // console.info(result)

            for (let i = 0; i < this.controlBits; ++i) {
                // console.log("Control elem is " + control_sums[i])
                // console.log("Bit mask is  " + (1 << i))
                // Mask to see if bits will be allocated to control bit or not
                mask = (1 << i);
                sum = 0;
                for (let j = 1; j <= result.length; ++j) {
                    if (j & mask) {
                        // console.log("Prod was 1 for j: ", j)
                        sum += 1;
                    }
                }
                // Replace the bit on the power-of-two position in the result
                // array with the value of the modulo addition for the current bit
                result[Math.pow(2, i) - 1] = this.parity(sum - 1);
                // console.log("Sum is " + sum)
            }
            console.info(result)

            var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 4
            var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 2
            var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 1
            // var C0 = this. ...
			// console.log("Control bits: "+c1+","+c2+","+c4);
            // console.log("Bits " + bits);
            console.info([c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)]);
            return [c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)]; // vectorul V (cuvantul de transmis)
            // return result
        },
        isPowerOfTwo: function(number) {
            // Check if number is a power of two
            return !(number & (number - 1));
        },
        parity: function(number){
            return number % 2;
        },
        validate: function(bits){
            for(var i=0; i<bits.length;i++){
                if (this.validateBit(bits[i].data) === false)
                return false;
            }
            return true;
        },
        validateBit: function(character){
            if (character === null) return false;
            return (parseInt(character) === 0 ||
            parseInt(character) === 1);  
        }
    }
})