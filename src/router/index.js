import Vue from 'vue'
import Router from 'vue-router'
import dashboardComplaint from '@/components/dashboardComplaint'
import login from '@/components/login'
import complaintReply from '@/components/complaintReply'
import inputComplaint from '@/components/inputComplaint'
import viewDetailComplaint from '@/components/viewDetailComplaint'
import dashboardMahasiswa from '@/components/dashboardMahasiswa'
import viewComplaint from '@/components/viewComplaint'
import complaintAnswer from '@/components/complaintAnswer'
import register from '@/components/register'
import firebase from 'firebase'
import viewInventory from '@/components/viewInventory'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/dashboard',
      name: 'dashboard-complaint',
      component: dashboardComplaint,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'input-complaint',
      component: inputComplaint,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/detail',
      name: 'view-detail-complaint',
      component: viewDetailComplaint,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/reply',
      name: 'complaint-reply',
      component: complaintReply,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/dashboardmhs',
      name:'dashboard-mhs',
      component: dashboardMahasiswa,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/viewmhs',
      name:'view-complaint',
      component: viewComplaint,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/answer',
      name:'complaint-answer',
      component: complaintAnswer,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/viewInventory',
      name:'view-inventory',
      component: viewInventory,
      meta:{
        requiresAuth: true
      }
    }
  ]
});

//Navbar Guards
router.beforeEach((to,from,next) => {
  var user = firebase.auth().currentUser;
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!user){
      next({
        path:'/',
        query: {
          redirect: to.fullPath
        }
      });
    } else{
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)){
    if(user){
      next({
        path:'/dashboard',
        query: {
          redirect: to.fullPath
        }
      });
    } else{
      next();
    }
  } else{
    next();
  }
});

export default router;