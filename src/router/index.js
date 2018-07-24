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
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/dashboard',
      name: 'dashboard-complaint',
      component: dashboardComplaint
    },
    {
      path: '/new',
      name: 'input-complaint',
      component: inputComplaint
    },
    {
      path: '/detail',
      name: 'view-detail-complaint',
      component: viewDetailComplaint
    },
    {
      path:'/reply',
      name: 'complaint-reply',
      component: complaintReply
    },
    {
      path:'/dashboardmhs',
      name:'dashboard-mhs',
      component: dashboardMahasiswa
    },
    {
      path:'/viewmhs',
      name:'view-complaint',
      component: viewComplaint
    },
    {
      path:'/answer',
      name:'complaint-answer',
      component: complaintAnswer
    }
  ]
})
