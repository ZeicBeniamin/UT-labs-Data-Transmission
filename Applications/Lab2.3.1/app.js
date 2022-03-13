var app = new Vue({
    el: '#app',
    data: {
        message: '',
        msg123: ''
    },
    methods: {
        process: function(){
            console.log(this.message);
            if (this.message == "123") {
                this.msg123 = "Mesajul e 123";
                    console.log("Mesajul e 123");
            }
        }
    }
})