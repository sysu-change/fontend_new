import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Signin from '@/components/Signin'
import Register from '@/components/Register'
import User from '@/components/User'
import Recharge from '@/components/Recharge'
import Withdraw from '@/components/Withdraw'
import AccessAccount from '@/components/AccessAccount'
import Signout from '@/components/Signout'
import Putjob from '@/components/Putjob'
import Getjob from '@/components/Getjob'
import Create from '@/components/Create'
import qsData from '@/components/qsData'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin
    },
    {
      path:'/User/:id',
      name:'User',
      component: User,
      children:[{path:"AccessAccount",component:AccessAccount},{path:"GetJob",component:Getjob},{path:"Putjob",component:Putjob},
    {path:'Putjob/Create',component:Create}]
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
    ,
    {
      path:'/',
      redirect:'/Hello'
    },
    {
      path: '/Recharge',
      name: 'Recharge',
      component: Recharge
    },
    {
      path: '/Withdraw',
      name: 'Withdraw',
      component: Withdraw
    },
    
    {
      path: '/User/Signout',
      name: 'Signout',
      component: Signout
    },
    {
      path:"/User/Part",
      redirect:"/User/Part/Getjob"
    },
    {
      path:"/User",
      redirect:"/User/Part/Getjob"
    },
    {
      path:"/qsData",
      name: 'qsData',
      component: qsData
    }

    
  ]
})
