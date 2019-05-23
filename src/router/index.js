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
      path:'/User/:id',
      name:'User',
      component: User,
      children:[{path:"AccessAccount",component:AccessAccount},{path:"GetJob",component:Getjob},{path:"Putjob",component:Putjob}]
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
    }

    
  ]
})
