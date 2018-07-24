<template>
    <div class="login wrapper border border-light">
        <form class="form-signin" @submit.prevent="login">
            <h2 class=" center form-signin-heading">Login Form</h2>
            <label for="inputUsername"   class="sr-only"> Username </label>
            <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
            <label for="inputPassword" class="sr-only"> Password </label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit"> Sign in </button>
        </form>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name:'login',
    data(){
        return{
            username:'',
            password:'',
            confirmPassword:'',
        }
    },
    methods:{
        login(){
            db.collection('users')
            .where('id','==',this.username)
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    if(!doc.exists){
                        console.log("Username Salah")
                    }
                    else{
                        this.confirmPassword = doc.data().keterangan
                        console.log(this.confirmPassword)
                        if(this.confirmPassword !== this.password){
                            alert("Password salah")
                        }
                        else{
                            if(this.password === 'admin'){
                                this.$router.push('/dashboard')
                            }
                            else{
                                this.$router.push({name:'dashboard-mhs', params: {nim: this.username}})
                            }
                        }
                    }
                })
            })
        },
    }
}
</script>

<style>
.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
    font-size: xx-large;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
