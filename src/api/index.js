import requests from './request';
import mockRequests from './mockAjax';
// get请求，用请求头传
// post请求，参数用对象data传

//三级联动接口
//获取商品分类的数据,//axios发请求返回结果Promise对象,即为返回服务器的数据
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');

//虚拟接口
//获取banner (Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner');
//获取Floor
export const reqGetFloorList = () => mockRequests.get('/floor');
//获取search
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: "post",
    data: params
})
//获取detail,${}模板字符串
export const reqGetDetailInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: "get"
})
//获取更新的的产品个数,/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqGetShopCartNumInfo = (params) => requests({
    url: `/cart/addToCart/${params.skuId}/${params.skuNum}`,
    method: "post"
})
// 获取购物车列表  /api/cart/cartList
export const reqGetShopCartList = () => requests({
    url: '/cart/cartList',
    method: "get"
})
//删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteShopCartGoodsById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete"
})
// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedByid = (skuID,isChecked) => requests({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: "get"
})
// 获取验证码 /user/passport/code
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get"
})
// 注册 /api/user/passport/register 携带参数。
export const reqUserRegister = (data) => requests({
    url: `/user/passport/register`,
    method: "post",
    data
})
//登录 /api/user/passport/login
export const reqUserLogin = (data) => requests({
    url: `/user/passport/login`,
    method: "post",
    data
})
// 获取用户信息【需要携带用户的token向服务器要用户信息】
//URL: /api/user/passport/auth/getUserInfo   methods:get
export const reqUserInfo = () => requests({
    url: `/user/passport/auth/getUserInfo`,
    method: "get"
})
// 退出登录
export const reqUserLogout = () => requests({
    url: `/user/passport/logout`,
    method: "get"
})
// 接口地址:/api/user/userAddress/auth/findUserAddressList
// 获取用户地址信息接口
export const reqAddressInfo = () => requests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: "get"
})
// 请求地址:/api/order/auth/trade
// 获取商品清单 
export const reqTradeInfo = () => requests({
    url: `/order/auth/trade`,
    method: "get"
})
// 请求地址:/api/order/auth/submitOrder?tradeNo={tradeNo}
//提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data
})
// /api/payment/weixin/createNative/{orderId}
// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get"
})
// 获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get"
})
