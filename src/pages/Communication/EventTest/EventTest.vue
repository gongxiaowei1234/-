<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 1.原生DOM绑定系统事件 -->
    <button @click="handler">原生DOM绑定系统事件</button>
    <Event1 @click.native="handler1"></Event1>
    <!-- 2.Event1组件：
    Event1非原生DOM节点，而绑定的click事件并非原生DOM事件，而是自定义事件
    1:原生DOM---button可以绑定系统事件----click单击事件等等
    2:组件标签--- event1可以绑定系统事件(不起作用,因为属于自定义事件)----native(可以把自定义事件变为原生DOM事件)

    3.给原生DOM绑定自定义事件没有任何意义的,因为没有办法触发$emit函数
一般是给组件绑定自定义事件在结合$on,$emit使用 -->
    <button @XXX="handler2">原生DOM绑定自定义事件</button>
    <!-- 4.组件标签 -->
    <Event2 @click="handler3" @XXX="handler3"></Event2>
  </div>
</template>

<script >
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";
export default {
  name: "EventTest",
  components: {
    Event1,
    Event2,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    // 原生DOM button的事件回调
    handler(event) {
      console.log("原生DOM单击事件", event);
    },
    // Event1组件的事件回调
    handler1() {
      console.log("event1事件的回调");
    },
    // 原生DOM绑定自定义事件
    handler2() {
      console.log("原生DOM绑定自定义事件");
    },
    // Event2组件的事件回调
    handler3(params) {
      console.log("event3事件的回调",params);
    },
  },
  mounted() {},
};
</script>

<style>
</style>