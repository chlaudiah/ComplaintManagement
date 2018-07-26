<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel blue white-text ">
                        <h5> IFLAB Complaint Login </h5>
                        <form>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email">
                                <label class="white-text" for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password">
                                <label class="white-text" for="password">Password</label>
                            </div>
                            <button v-on:click="login" class="btn btn-large grey lighten-4 black-text">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>      
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from './firebaseInit';
export default{
    name:'login',
    data: function(){
        return {
            email:'',
            password:'',
            email_admin:'laboratorium.informatika2@gmail.com'
        }
    },
    methods: {
        login: function(e){
            firebase.auth().signInWithEmailAndPassword(this.email,this.password)
            .then(
                user=> {
                    if(this.email === this.email_admin){
                        this.$router.push('/dashboard')
                    }
                    else{
                        db.complaintFirestore.collection('users')
                        .where('email','==',this.email)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                this.$router.push({name: 'dashboard-mhs', params:{nim: doc.data().id}})
                            })
                        })
                    }
                },
                err => {
                alert(err.message);
            });
            e.preventDefault();
        }
    }
}
</script>

<style>
</style>
