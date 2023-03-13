<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <!-- $event可以获取当前元素的checked -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateCheckedById(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('plus', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteCartListById(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length > 0"
          @change="updateIsAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 {{ totalNum }}
          件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
//{}
import {
  reqGetShopCartList,
  reqGetShopCartNumInfo,
  reqDeleteShopCartGoodsById,
  reqUpdateCheckedByid,
} from "@/api";
import { Message } from "element-ui";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {
      cartInfoList: [],
    };
  },
  computed: {
    // 计算购买产品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    // 已选商品个数
    totalNum() {
      let num = 0;
      this.cartInfoList.forEach((item) => {
        num += item.skuNum;
      });
      return num;
    },
    // 判断底部复选框是否需要勾选【全部产品都勾选则勾选】
    isAllCheck() {
      //every【只要全部元素的isChecked属性都为1，则为真，true】
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
    // cartInfoList(){
    //   return this.cartInfoList||[]
    // }
  },
  created() {
    this.getShopCartList();
  },
  // watch: {
  //   isChecked(newVal, oldVal) {
  // 	console.log(newVal) // 打印name变化的值
  // }

  // },
  methods: {
    // 获取购物车列表数据
    async getShopCartList() {
      const res = await reqGetShopCartList();
      let result = res.data[0] ||[];
      // console.log(res.data[0]);
       this.cartInfoList = result.cartInfoList || []
       console.log( result.cartInfoList);
      console.log("购物车数据", this.cartInfoList);
    },
    // 处理购物车加减，输入操作(节流，规定时间内只能执行一次)
    handler: throttle(async function (type, disNum, cart) {
      // type:为了区分这三个元素
      //disNum ：+ 变化的量(1)   - 变化的量(-1)  input最终的个数(并不是变化量)
      // cart：区分哪一个产品【ID】
      // console.log(type, disNum, cart);
      switch (type) {
        case "plus":
          disNum = 1;
          break;
        case "mins":
          // 判断产品个数大于1，才可以传递给服务器,0保持不变
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 用户输入进来的最终量，非法的（带有汉字），带给服务器的数字
          // 正常情况(小数取整)，带给服务器的变化量=用户输入进来的 - 产品的起始个数
          // console.log(disNum);
          disNum =
            isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cart.skuNum;
          break;
      }
      // 向服务器发送请求

      // 加入购物车返回的结果
      let params = {
        skuId: cart.skuId,
        skuNum: disNum,
      };
      const res = await reqGetShopCartNumInfo(params);
      console.log(res);
      this.getShopCartList();
    }, 1000),

    // 删除购物车的某一个产品，(没有返回信息)
    async deleteCartListById(skuId) {
      let res = await reqDeleteShopCartGoodsById(skuId);
      console.log(res);
      if (res.code == 200) {
        this.$message({
          type: "warning",
          message: "删除购物车商品成功",
        });
        this.getShopCartList();
      } else {
        return Promise.reject(new Error("fail"));
      }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById(cart, event) {
      //  true/false
      // console.log(event.target.checked);
      // 带给服务器的参数isChecked，不是布尔值
      let isChecked = event.target.checked ? "1" : "0";
      let res = await reqUpdateCheckedByid(cart.skuId, isChecked);
      // console.log(res);
      // 如果修改数据成功，再次获取服务器的购物车数据
      if (res.code == 200) {
        this.$message({
          type: "warning",
          message: "修改购物车商品成功",
        });
        this.getShopCartList();
      } else {
        this.$message({
          type: "warning",
          message: "修改购物车商品失败！",
        });
        // return Promise.reject(new Error('fail'))
      }
    },

    // 删除全部勾选购物车商品
    deleteAllCheckedCart() {
      // if (
      //   this.cartInfoList.every((item) => {
      //     item.isChecked == 1;
      //   })
      // ) {
      //   reqDeleteShopCartGoodsById(item.skuId);
      // } else {
      //  return console.log("faile");
      // }
      // try{}catch(error){}

      let promiseAll = [];
      this.cartInfoList.forEach((item) => {
        let promise =
          item.isChecked == 1 ? reqDeleteShopCartGoodsById(item.skuId) : "";
        //  console.log(res);
        // 存放每个对象的promise
        promiseAll.push(promise);
      });
      // this.getShopCartList();
      // Promise.all,只要每一个对象都成功，返回结果为成功
      // 如果有一个失败，返回即为失败结果
      console.log(Promise.all(promiseAll));
      Promise.all(promiseAll)
        .then((result) => this.getShopCartList())
        .catch((e) => console.log(e));
      // this.getShopCartList();
    },

    // 修改购物车全部产品的选中状态
    updateIsAllChecked(event) {
      let promiseAll = [];
      // console.log(event)
      let isChecked = event.target.checked ? "1" : "0";
      // console.log(isChecked);
      this.cartInfoList.forEach((item) => {
        let promise = reqUpdateCheckedByid(item.skuId, isChecked);
        promiseAll.push(promise);
      });
      // console.log(Promise.all(promiseAll));
      Promise.all(promiseAll)
        .then((result) => this.getShopCartList())
        .catch((e) => console.log(e));
    },
  },
};
</script>
  
  <style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>