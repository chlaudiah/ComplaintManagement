<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="register card-panel grey lighten-4 center">
                        <h3> Register </h3>
                        <form>
                            <div class="input-field">
                                <i class="material-icons prefix">person</i>
                                <input type="text" id="id" v-model="id" required>
                                <label  for="nim">ID</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">person</i>
                                <input type="text" id="nama" v-model="nama" required>
                                <label  for="nama">Nama</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email" required>
                                <label  for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password" required>
                                <label  for="password">Password</label>
                            </div>
                            <button v-on:click="register" class="btn btn-large grey lighten-4 black-text">Register</button>
                        </form>
                    </div>
                </div>
            </div>      
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from './firebaseInit'
export default{
    name:'register',
    data: function(){
        return {
            email:'',
            password:'',
            id:'',
            nama:'',
        }
    },
    methods: {
        register: function(e){
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.email,this.password)
            .then(
                user=> {
                    alert('Account created for ${user.email}');
                    this.$router.push('/')
                },
                err => {
                alert(err.message);
            });
            e.preventDefault();

            db.complaintFirestore.collection('users')
            .add({
                id:this.id,
                nama:this.nama,
                email:this.email,
                password:this.password
            })
        }
    }
}
</script>