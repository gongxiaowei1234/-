// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports={
  //关闭eslint
  // lintOnSave:false,
  //  //配置代理跨域
  //  devServer: {
  //   proxy: {
  //     "/api": {
  //       target:"http://gmall-h5-api.atguigu.cn",
  //     },
  //   },
  // },

 
  // 配置代理跨域
  "devServer": { //记住，别写错了devServer//设置本地默认端口  选填
    host: 'localhost',
    port: 8080,
    // 代理跨域
    proxy: { //设置代理，必须填
      '/api': { //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'http://gmall-h5-api.atguigu.cn', //代理的目标地址
        changeOrigin: true, //是否设置同源，输入是的
        // pathRewrite: { //路径重写
        //   '^/api': '' //选择忽略拦截器里面的内容
        // }
      }
    }
  },
   // 打包时，不打包map文件
  productionSourceMap: false,
  transpileDependencies: true,
  // 关闭eslint校验工具
  lintOnSave: false,
}