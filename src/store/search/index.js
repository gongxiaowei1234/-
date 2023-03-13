import {reqGetSearchInfo} from "@/api";
// state的状态即共享数据可以在组件中引用
const state = {
    //仓库初始状态
    searchList: {}
};
//提交更新数据，只能执行同步代码
const mutations = {
    // 默认第一个参数接受state，后面只能在传入一个参数
    //函数用大写字母命名是为了与actions中的函数进行区分
    GETSEARCHLIST(state,searchList) {
        state.searchList = searchList
    },
};
//处理actions,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据,函数第一个变量必须为{commit}，
    async getSearchList({commit}, params = {}) {
        let res = await reqGetSearchInfo(params)
        // console.log(res);
        if (res.code == 200) {
            commit("GETSEARCHLIST", res.data)
        }

    }
};
//理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    //当前形参state,不是大仓库的state
    goodsList(state) {
        // 有问题
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}