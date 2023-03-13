import Vue from 'vue'
import App from './App.vue'

//三级联动组件----全局组件
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
//第一个参数：全局组件的名字，第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Pagination.name,Pagination)
import '@/mock/mockServe'
//引入路由
import router from '@/router';
//引入仓库
import store from '@/store';
import "swiper/css/swiper.css";
import { reqGetSearchInfo } from "@/api";
// console.log(reqGetSearchInfo({}));
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import {Button,Select} from 'element-ui';

// 统一接口api文件中全部请求函数
import * as API from '@/api'
// console.log(API);
import hyrz from '@/assets/1.gif'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:hyrz
});
// 引入自定义插件
import myPlugins from "@/plugins/myPlugins";
// 注册插件
Vue.use(myPlugins,{
  name:'upper'
})
// 注册组件
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  //安装全局事件总线
  beforeCreate() {
		Vue.prototype.$bus = this //this=vm
    // 所有请求接口统一接收到以后，挂载在Vue.prototype原型对象上，
    // 这样所有组件不需要一个一个引入了，直接找$API对象直接调用
    Vue.prototype.$API=API
	},
  //注册路由，组件身上会拥有$ route和$routers属性
  router,
  //注册仓库，组件实例的身上会多一个$store属性
  store
}).$mount('#app')
