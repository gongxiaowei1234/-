<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <!-- 标签名大写！大写！大写！ -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- v-if操作的是DOM节点，v-show操作的是样式 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <!-- 路由元信息 meta.show为true显示，false隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  data() {
    return {
      // msg: 'abc',
    };
  },
  //注册
  components: {
    Header,
    Footer,
  },
  //根组件的mounted()只执行一次
  mounted() {
    //派发一个action ||获取商品分类的三级列表的数据
    // dispatch：异步操作，数据提交至 actions ，可用于向后台提交数据
    this.$store.dispatch("categoryList");
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
</style>