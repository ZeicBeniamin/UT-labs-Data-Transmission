console.log("Start");
var app = new Vue({
    el: '#app',
    data: {
        users: [],
        usersService: null,
        username: '',
        usercity: '',
        userid: 0,
        msg: ''
    },
    created: function () {
        usersService = users();
        usersService.get().then(response => (this.users=response.data));
    },
	
    methods: { //aici adaugati functiile prin care faceti callurile catre server
        add: function(){
             // adauga codul pentru functia "add user"
             usersService = users();
             usersService.put(this.username, this.usercity);
             location.reload();
        },
        remove: function(){
			// adauga codul pentru functia "delete user"
            usersService = users();
            usersService.remove(this.userid).then(response => (this.msg = response.data));
            location.reload();
            // console.log("User was deleted");
        },
        update: function(){
			// adauga codul pentru functia "update user"
            usersService = users();
            // console.log(usersService.)
        }
    }
})
