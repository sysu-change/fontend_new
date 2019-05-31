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
│   │    ├─auth：登录注册相关界面
│   │    │   ├─Hello.vue：首页
│   │    │   ├─Signin.vue：登录页面
│   │    │   └─Register.vue：注册页面
│   │    ├─questionaire：
│   │        ├─User.vue：学生端任务页面
│   │        ├─Putjob.vue：奶牛端发布页面
│   │        ├─……开发中
│   ├─router：前端路由
│   │    └─index.js：前端路由信息配置文件
│   ├─App.vue：最外层结构
│   └─main.js：入口文件；第三方组件和公共文件引入
└─index.html
└─package.json
```


