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
```vue
|-- youfan-backstage
    |-- .babelrc
    |-- .browserslistrc
    |-- .editorconfig
    |-- .eslintrc.js  --> 代码检查
    |-- .gitignore  --> 打包去除文件
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- README.md
    |-- vue.config.js  --> vue打包工具配置
    |-- dist   --> 打包文件夹
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- css
    |   |   |-- app.6c494615.css
    |   |   |-- chunk-1003ba7d.0f31820a.css
    |   |-- fonts
    |   |   |-- ionicons.143146fa.woff2
    |   |   |-- ionicons.99ac3308.woff
    |   |   |-- ionicons.d535a25a.ttf
    |   |-- img
    |   |   |-- ionicons.a2c4a261.svg
    |   |   |-- logo.82b9c7a5.png
    |   |   |-- qr.f87bb9e0.png
    |   |-- js
    |       |-- app.a2ec9104.js
    |       |-- chunk-1003ba7d.3d482cf9.js
    |       |-- chunk-vendors.2815920f.js
    |-- public  --> 静态文件，index
    |   |-- favicon.ico
    |   |-- index.html
    |-- src  --> 开发文件
        |-- App.vue
        |-- main.js
        |-- api  --> 接口
        |   |-- CardManageApi.js
        |   |-- Http.js
        |   |-- login.js
        |   |-- MemberApi.js
        |   |-- ShopApi.js
        |   |-- baseManage
        |   |   |-- CardMessageApi.js
        |   |-- discountsManage
        |   |   |-- DiscountsApi.js
        |   |-- payManage
        |   |   |-- PayList.js
        |   |-- systemManage
        |       |-- menu.js
        |       |-- role.js
        |       |-- user.js
        |-- assets   --> 静态文件
        |   |-- logo.png
        |   |-- qr.png
        |-- components  --> 公共组件
        |   |-- BreadcrumbC
        |   |   |-- BreadcrumbC.vue
        |   |-- FullScreenC
        |   |   |-- FullScreenC.vue
        |   |-- MenuC
        |   |   |-- MenuC.vue
        |   |-- PageC
        |   |   |-- PageC.vue
        |   |-- SearchC
        |   |   |-- SearchC.vue
        |   |   |-- searchSelectList.js
        |   |-- UserC
        |       |-- UserC.vue
        |-- router  --> 路由
        |   |-- index.js
        |-- store  --> vuex
        |   |-- index.js
        |   |-- menu.js
        |   |-- global
        |       |-- actions.js
        |       |-- getters.js
        |       |-- index.js
        |       |-- mutations-type.js
        |       |-- mutations.js
        |-- utils  --> 工具
        |   |-- index.js
        |   |-- menu.js
        |-- views  --> 项目 页面 分组
            |-- BaseManage
            |   |-- index.vue
            |   |-- CardMessage
            |       |-- AddCardMessage.vue
            |       |-- EditCardMessage.vue
            |       |-- index.vue
            |-- CardManage
            |   |-- index.vue
            |   |-- CardList
            |   |   |-- AddCard.vue
            |   |   |-- ExportCard.vue
            |   |   |-- index.vue
            |   |-- CardSearch
            |       |-- index.vue
            |-- DiscountsManage
            |   |-- index.vue
            |   |-- DiscountsList
            |       |-- AddDiscounts.vue
            |       |-- EditDiscounts.vue
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
            |       |-- EditShop.vue
            |       |-- index.vue
            |       |-- LocationMap.vue
            |       |-- UploadImg.vue
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
