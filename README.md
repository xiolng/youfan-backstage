# youfan-backstage

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# 目录
```
|-- youfan-backstage
    |-- .babelrc babel配置
    |-- .browserslistrc
    |-- .editorconfig 编辑配置
    |-- .eslintrc.js eslint配置
    |-- .gitignore 提交黑名单
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- README.md
    |-- vue.config.js 框架配置
    |-- .idea
    |   |-- misc.xml
    |   |-- modules.xml
    |   |-- vcs.xml
    |   |-- workspace.xml
    |   |-- youfan-backstage.iml
    |   |-- codeStyles
    |   |   |-- codeStyleConfig.xml
    |   |   |-- Project.xml
    |   |-- inspectionProfiles
    |       |-- Project_Default.xml
    |-- dist  打包文件夹
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- css
    |   |   |-- app.6c494615.css
    |   |   |-- chunk-0512c2c4.408783ba.css
    |   |   |-- chunk-099a981e.f19e23f9.css
    |   |   |-- chunk-09f1e672.e103c15f.css
    |   |   |-- chunk-16666b82.bd9b9e2b.css
    |   |   |-- chunk-281741ec.491505fe.css
    |   |   |-- chunk-5897f44e.525331ab.css
    |   |   |-- chunk-5ae686e8.e126cd50.css
    |   |   |-- chunk-60316756.317e956a.css
    |   |   |-- chunk-619c0a88.901c9a33.css
    |   |   |-- chunk-813bec6c.475501cc.css
    |   |   |-- chunk-ba55cff2.a5bbd2e1.css
    |   |   |-- chunk-ddcf3970.82bc5b61.css
    |   |   |-- chunk-e7b278a4.471fb959.css
    |   |   |-- chunk-vendors.09392f20.css
    |   |-- fonts
    |   |   |-- ionicons.143146fa.woff2
    |   |   |-- ionicons.99ac3308.woff
    |   |   |-- ionicons.d535a25a.ttf
    |   |-- img
    |   |   |-- ionicons.a2c4a261.svg
    |   |   |-- logo.82b9c7a5.png
    |   |-- js
    |       |-- app.0ebaed20.js
    |       |-- chunk-0512c2c4.09f6f5cd.js
    |       |-- chunk-099a981e.8a0d583b.js
    |       |-- chunk-09f1e672.00799aa3.js
    |       |-- chunk-16666b82.8179815c.js
    |       |-- chunk-281741ec.1e0ad217.js
    |       |-- chunk-2d0ac07d.6fee4a93.js
    |       |-- chunk-2d0c4bf9.9b46872b.js
    |       |-- chunk-2d0e4cdb.6bb1a1ef.js
    |       |-- chunk-2d208c0e.345f5e86.js
    |       |-- chunk-5897f44e.09c45f47.js
    |       |-- chunk-5ae686e8.3fcc9773.js
    |       |-- chunk-60316756.524194c9.js
    |       |-- chunk-619c0a88.54af6d26.js
    |       |-- chunk-813bec6c.d85c27b3.js
    |       |-- chunk-ba55cff2.89d9c15c.js
    |       |-- chunk-ddcf3970.534ef115.js
    |       |-- chunk-e7b278a4.36aa0b39.js
    |       |-- chunk-vendors.2c3f897f.js
    |-- public 静态文件夹
    |   |-- favicon.ico
    |   |-- index.html
    |-- src 
        |-- App.vue 全局路由分布页面
        |-- main.js 全局配置
        |-- api 接口
        |   |-- index.js
        |   |-- login.js
        |   |-- systemManage
        |       |-- menu.js
        |       |-- role.js
        |       |-- user.js
        |-- assets 资源
        |   |-- logo.png
        |-- components 公共组件
        |   |-- Breadcrumbs
        |   |   |-- index.vue
        |   |-- FullScreen
        |   |   |-- index.vue
        |   |-- Menus
        |   |   |-- index.vue
        |   |-- PageM
        |   |   |-- PageM.vue
        |   |-- SearchC
        |   |   |-- index.vue
        |   |   |-- searchSelectList.js
        |   |-- Users
        |       |-- index.vue
        |-- router 路由json
        |   |-- index.js
        |-- store vuex
        |   |-- index.js
        |   |-- menu.js
        |   |-- global
        |       |-- actions.js
        |       |-- getters.js
        |       |-- index.js
        |       |-- mutations-type.js
        |       |-- mutations.js
        |-- utils 公共js
        |   |-- index.js
        |   |-- menu.js
        |-- views page页面
            |-- CardManage
            |   |-- index.vue
            |   |-- CardList
            |       |-- EditCard.vue
            |       |-- index.vue
            |-- DiscountsManage
            |   |-- index.vue
            |   |-- DiscountsList
            |       |-- AddDiscounts.vue
            |       |-- index.vue
            |-- LayoutModule
            |   |-- index.vue
            |-- Login
            |   |-- index.vue
            |-- MemberManage
            |   |-- index.vue
            |   |-- MemberList
            |       |-- EditMember.vue
            |       |-- index.vue
            |-- PayManage
            |   |-- index.vue
            |   |-- PayList
            |       |-- index.vue
            |-- ShopManage
            |   |-- index.vue
            |   |-- ReceivingQr
            |   |   |-- index.vue
            |   |-- ShopList
            |       |-- AddShop.vue
            |       |-- index.vue
            |       |-- LocationMap.vue
            |-- SystemManage
                |-- index.vue
                |-- MenuManage
                |   |-- AddMenu.vue
                |   |-- EditMenu.vue
                |   |-- index.vue
                |-- RoleManage
                |   |-- AddRole.vue
                |   |-- EditRole.vue
                |   |-- index.vue
                |-- UserManage
                    |-- AddUser.vue
                    |-- EditUser.vue
                    |-- index.vue

```
