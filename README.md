# test

> 测试更新中 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

```txt
├─build：存放构建用到的相关文件
├─config：存放配置文件
├─src：源码
│   ├─assets：图片等静态资源
│   ├─components：前端组件
│   │    ├─Auth：用户逻辑
│   │    │   ├─AccessAcount.vue：个人信息页面
│   │    │   ├─Signin.vue：登录页面
│   │    │   ├─Register.vue：注册页面
|   |    |   └─Signout.vue：登出页面
│   │    ├─Ques：问卷操作
│   │    |   ├─Check.vue：奶牛端端查看问卷
│   │    |   ├─Create.vue：奶牛端创建问卷
|   |    |   ├─Edit.vue：奶牛端编辑问卷
|   |    |   ├─Dajuan.vue：获取问卷
|   |    |   └─Fillin.vue：学生端回答问卷
│   │    ├─Set：问卷/任务列表
|   |    |   ├─Getjob.vue：学生端获取问卷/任务
|   |    |   └─Fillin.vue：奶牛端获取问卷/任务页面（编辑）
|   |    ├─Task：任务操作页面
│   │    |   ├─CreateTask.vue：奶牛端创建任务
|   |    |   ├─GetTask.vue：获取任务
|   |    |   ├─DoneTask.vue：奶牛审核已完成任务
|   |    |   ├─TodoTask.vue：奶牛查看正在进行的任务
|   |    |   ├─myDoneTask.vue：学生已完成的任务
|   |    |   ├─myTodoTask.vue：学生正在进行的任务 
|   |    |   └─TaskDetail.vue：任务详情 
|   |    ├─User:账号逻辑
|   |    |   ├─Complain.vue：投诉
|   |    |   ├─Recharge.vue：充值 
|   |    |   └─Withdraw.vue：提现 
|   |    |─Hello.vue：首页
|   |    └─User.vue：用户界面父组件
|   | 
│   ├─router：前端路由
│   │    └─index.js：前端路由信息配置文件
│   ├─App.vue：最外层结构
│   └─main.js：入口文件；第三方组件和公共文件引入
└─index.html
└─package.json
```


