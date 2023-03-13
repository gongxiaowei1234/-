// Vue插件一定要暴露一个对象
let myPlugins={}
myPlugins.install=function(Vue,options){
    // console.log(options);
    // Vue.prototype.$bus: 任何组件都可以使用
    // Vue.directive：全局指令
    // Vue.component：全局组件
    // Vue。filter:过滤器
    // 第一个参数是绑定的元素, 第二个参数是我们传入的对象
    Vue.directive(options.name,(element,b)=>{
        // console.log(b);
    })
}

export default myPlugins