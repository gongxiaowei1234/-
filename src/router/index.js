//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
// 引入routes.js
import routes from './routes'
// 对外暴露VueRouter类实例
//  export default new VueRouter({
let router = new VueRouter({
    // 正常应该是routes=routes,因为k,v一致，所以省略v
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // y: 0代表始终滚动到顶部
        return {
            y: 0
        }
    },
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach((to, from, next) => {
    //to:可以获取到你要跳转到哪个路由信息
    //from:可以获取到你从哪个路由信息而来的信息
    //next:放行函数 next()放行 next(path)放行到指定路由  next(false)
    // console.log((to, from, next));
    // 为了测试先都放行
    next()
    // 获取本地存储的token
    let token = localStorage.getItem("token")
    let name=localStorage.getItem("name")
    // 有token，用户已登录
    if (token) {
        // 用户已登录，还想去login界面[不能去， 停留在 首页]
        if (to.path == '/login'||to.path == '/register') {
            console.log(to.path);
            next('/')
        } else {
            if(name){
                next()
            }else{
     //登录了，去其他界面，
            try {
                next()
                // token失效,获取不到用户信息 
            } catch (error) {
                // 清除token。重新登录
                localStorage.removeItem("token")
                localStorage.removeItem("name")
                next('/login')
            }
        }
            }
       
    } else {
       //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
      //未登录去上面这些路由-----登录
      let toPath = to.path;
      if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
        //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
        next('/login?redirect='+toPath);
      }else{
         //去的不是上面这些路由（home|search|shopCart）---放行
         next();
      }
    
    }
})
export default router
//先把VueRouter 原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace
// 第一个参数：告诉原来push方法，往哪跳转(传递哪些参数)
VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log(this);
    if (resolve && reject) {
        /*  总结：
        1 call的语法：函数名.call(obj,参数1,参数2,参数3……);
        2 apply的语法：函数名.apply(obj,[参数1,参数2,参数3……]);
        功能：都可以调用函数一次，都可以修改函数中this的指向；
         */
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}