<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  // 接收父组件Detail传过来的数据
  props: ["skuImageList"],
  data() {
    return {
      // skuImageList: [],
      currentIndex: 0,
    };
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  created() {
    // console.log(this.skuImageList);
    this.$bus.$on("getIndex", (index) => {
      console.log(index);
      this.currentIndex = index;
    });
  },
  methods: {
    handler(event) {
      // console.log("123");
      // console.log(event);
      // 获取遮罩层mask这个元素
      let mask = this.$refs.mask;
      // 获取大图big这个元素
      let big = this.$refs.big;
      // offsetWidth/2遮罩层宽度的一半，offsetX从遮罩层的中心开始算的
      // offsetX鼠标中心距离左边的距离，offsetWidth容器的宽
      let left = event.offsetX - mask.offsetWidth / 2;
      // 距离顶部的距离
      let top = event.offsetY - mask.offsetHeight / 2;
      // 约束范围
      if (left <= 0) left = 0;
      //约束最大的距离left不能大于一个遮罩层的宽度,因为刚好两个遮罩层等于容器的宽度
      if (left > mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top > mask.offsetHeight) top = mask.offsetHeight;
      // 修改元素的left|top属性值
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>