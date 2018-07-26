<template>
<div id="navbar">
  <nav>
    <div class="nav-wrapper dark blue">
      <div class="container">
          <a class="nav-item">ComplaintManagement</a>
          <ul class="right">
            <li v-if="!isLoggedIn"><router-link to="/">Login</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
            <li v-if="isLoggedIn"><button v-on:click="logout" class="btn grey">Logout</button></li>
          </ul>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name:'Navbar',
  data(){
    return{
      isLoggedIn: false,
      currentUser: false
    }
  },
  created(){
    if(firebase.auth().currentUser){
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  methods:{
    logout: function(){
        firebase.auth().signOut().then(() =>{
          this.$router.push('/');
        })
    }
  }
}
</script>


<style>
.nav-item{
  font-size:xx-large;
  font-family:'Avenir', Helvetica, Arial, sans-serif;}
</style>
