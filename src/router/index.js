import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signin from '@/components/Signin'
import Register from '@/components/Register'


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
      path: '/Register',
      name: 'Register',
      component: Register
    }
    ,
    {
      path:'/',
      redirect:'/HelloWorld'
    }
    
  ]
})
