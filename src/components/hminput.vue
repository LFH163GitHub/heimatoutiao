<template>
  <input type="text" class="hminput" :class="{success:statu,error:!statu}"/>
</template>

<script>
export default {
    props:['rules','msg'],
    data() {
        return {
            statu: true
        }
    },
};
</script>

<style lang="less" scoped>
.hminput {
  width: 318/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
  line-height: 60px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>
