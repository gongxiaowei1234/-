<template>
    <div class="app-container">
       <h2>深入v-model</h2>
       <input type="text" v-model="msg"></input>
       <span>{{ msg }}</span>
       <!-- vue2 原生标签身上的 :value 是 v-bind单向数据绑定-->
       <input type="text" :value="msg" @input="msg=$event.target.value"></input>
       <span>{{ msg }}</span>
       <!-- 实现父子组件数据同步 组件身上的 :value 是 props -->
       <CustomInput :value="msg" @input="msg=$event"/>
       <!-- 简化 -->
       <CustomInput v-model="msg"/>
       <span>{{ msg }}</span>
    </div>
</template>

<script>
import CustomInput from './CustomInput.vue'
    export default{
     name:'ModelTest',
     components:{
        CustomInput
     },
        data(){
            return{
                msg:'我爱中国'
            }
        },
       
    }
</script>

<style>
</style>