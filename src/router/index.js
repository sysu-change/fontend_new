import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signin from '@/components/Signin'
import Register from '@/components/Register'
import User from '@/components/User'
import Recharge from '@/components/Recharge'
import Withdraw from '@/components/Withdraw'
import AccessAccount from '@/components/AccessAccount'
import Signout from '@/components/Signout'
import Putjob from '@/components/Putjob'
import Getjob from '@/components/Getjob'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin
    },
    {
      path:'/User',
      name:'User',
      component: User
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
    ,
    {
      path:'/',
      redirect:'/HelloWorld'
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
      path: '/AccessAccount',
      name: 'AccessAccount',
      component: AccessAccount
    },
    {
      path: '/Signout',
      name: 'Signout',
      component: Signout
    },
    {
      path: '/Putjob',
      name: 'Putjob',
      component: Putjob
    },
    {
      path: '/Getjob',
      name: 'Getjob',
      component: Getjob
    }

    
  ]
})
