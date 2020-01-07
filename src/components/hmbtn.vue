<template>
  <!--  插槽的使用
 单击事件的发出 -->
  <div class="btn" @click="handlerclick">
    <span class="iconfont" :class="icon"></span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["icon"]
};
</script>

<style lang="less" scoped>
.btn {
  width: 318 * 100vw/360;
  height: 50px;
  background-color: rgb(252, 16, 8);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
</style>
