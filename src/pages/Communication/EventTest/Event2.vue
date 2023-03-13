<template>
    <div class="app-container">
        <h2>event2组件</h2>
        <button @click="$emit('click','自定义事件click')">分发自定义事件click</button><br>
        <button @click="$emit('XXX','我是自定义事件click')">分发自定义事件XXX</button><br>
    </div>
</template>

<script>
    export default{
     name:'',
        data(){
            return{}
        },
        created(){},
        methods:{},
        mounted() {},
    }
</script>

<style>
</style>