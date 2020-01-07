<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <hminput
          placeholder="请输入手机"
        ></hminput>
        <hminput placeholder="请输入密码"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <hmbtn>登陆</hmbtn>
    </div>
  </div>
</template>

<script>
import hmbtn from "../components/hmbtn";
import hminput from "../components/hminput";
export default {
  components: {
    hmbtn,
    hminput
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
