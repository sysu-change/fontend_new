import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Signin from '../components/Auth/Signin'
import Register from '../components/Auth/Register'
import User from '@/components/User'
import AccessAccount from '../components/Auth/AccessAccount'
import Signout from '../components/Auth/Signout'
import Putjob from '../components/Set/Putjob'
import Getjob from '../components/Set/Getjob'
import Create from '../components/Ques/Create'
import Edit from '../components/Ques/Edit'
import Check from '../components/Ques/Check'
import Fillin from '../components/Ques/Fillin'
import Dajuanlist from '../components/Ques/Dajuanlist'
import GetTask from '../components/Task/GetTask'
import CreateTask from '../components/Task/CreateTask'
import TaskDetail from '../components/Task/TaskDetail'
import TodoTask from '../components/Task/TodoTask'
import DoneTask from '../components/Task/DoneTask'
import myTodoTask from '../components/Task/myTodoTask'
import myDoneTask from '../components/Task/myDoneTask'
import Complain from '../components/User/Complain'
import Recharge from '../components/User/Recharge'
import Withdraw from '../components/User/Withdraw'
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
      path: '/User/:id',
      name: 'User',
      component: User,
      children: [
        
        { path: "GetJob", component: Getjob }, 
        { path: "Putjob", component: Putjob },
      { path: 'Putjob/Dajuanlist',component:Dajuanlist},
     // { path: 'Getjob/TaskDetail', component: TaskDetail },

      { path: 'GetTask', component: GetTask },
      { path: 'myTodoTask', component: myTodoTask },
      { path: 'myDoneTask', component: myDoneTask },
      { path: 'Putjob/TodoTask',component:TodoTask},
      { path: 'Putjob/DoneTask',component:DoneTask},
      
     
      ]
    },
    { path: '/Create', component: Create },
      { path: '/Edit', component: Edit },
      { path: '/Check', component: Check },
      { path: '/Fillin', component: Fillin },

      { path: '/CreateTask', component:CreateTask},

    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    { path: "/AccessAccount",
    name: 'AccessAccount',
    component: AccessAccount }, 
    ,
    {
      path: '/',
      redirect: '/Hello'
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
      path: '/TaskDetail',
      name: 'TaskDetail',
      component: TaskDetail
     },
     { path: '/Complain', 
     name: 'Complain',
     component: Complain },
    {
      path: '/Signout',
      name: 'Signout',
      component: Signout
    },
    {
      path: "/User/Part",
      redirect: "/User/Getjob"
    },
    {
      path: "/User",
      redirect: "/User/Part/Getjob"
    }


  ]
})
