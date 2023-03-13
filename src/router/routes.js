//引入路由组件
// 默认加载
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// import Communication from '@/pages/Communication/Communication';
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';


//配置路由
export default [{
        path: '/',
        redirect: '/home'
    },


    // 组件通信
    {
        path: '/communication',
        component: ()=>import('@/pages/Communication/Communication'),
        children:[
           {
            path:'event',
            component: ()=>import('@/pages/Communication/EventTest/EventTest'),
            meta: {
                show: true
            },
           },
           {
            path:'input',
            component: ()=>import('@/pages/Communication/ModelTest/ModelTest'),
            meta: {
                show: true
            },
           },
        ]
    },


    // 路由懒加载
    // 用到home才加载，高效
    {
        path: "/home",
        component: () => import('@/pages/Home'),
        //路由元信息 meta
        meta: {
            show: true,
            // 缓存关闭
            keepAlive: false
        }
    },
    {
        path: "/login",
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: "/register",
        component: Register,
        meta: {
            show: false
        }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        ///:keyword  params路由占位,  加?表示params参数可传可不传
        path: "/search/:keyword?",
        component: Search,
        meta: {
            show: true
        },
        name: "search",
        //路由组件可以传递props数据,只能传params数据
        //布尔值写法：params
        //props:true
        //对象写法
        // props:{a:1,b:2}
        //函数写法：可以params,可以query参数
        //props:($route)=>({keyWord:$route.params.keyWord,k:$route.query.k})
    },
    //重定向，在项目跑起来的时候，访问/,立马让它重定向到首页
    {
        path: "/addCartSuccess",
        name: 'addCartSuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: {
            show: true
        },

    },
    {
        path: "/trade",
        component: Trade,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter(to, from, next) {
            /* 只能从购物车界面, 才能跳转到交易界面 */
            if (from.path === '/shopcart') {
                next()
            } else {
                // 其他的路由组件而来，停留在当前
                next(false)

            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter(to, from, next) {
            /* 只能从交易界面, 才能跳转到支付界面 */
            if (from.path === '/trade') {
                next()
            } else {
                // 其他的路由组件而来，停留在当前
                next(false)

            }
        }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: {
            show: true
        }
    },
    // 个人中心
    {
        path: "/center",
        component: Center,
        meta: {
            show: true
        },
        // 二级路由组件
        children: [{
                path: "/myorder",
                component: MyOrder,
            },
            {
                path: "/grouporder",
                component: GroupOrder,
            }
        ]
    },

    // {
    //     path: '*',
    //     redirect: '/home'
    // },
]