<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test" @click="back"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <hminput
          placeholder="请输入手机"
          :rules="/^(\d{5,6})$|^(1\d{10})$/"
          msg="输入的手机号不正确"
          v-model="user.username"
        ></hminput>
        <hminput
          placeholder="请输入密码"
          :rules="/^\S{3,16}$/"
          v-model="user.password"
          msg="输入的密码不正确"
          type="password"
        ></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <hmbtn @click="Login">登陆</hmbtn>
    </div>
  </div>
</template>

<script>
import hmbtn from "../components/hmbtn";
import hminput from "../components/hminput";
import { login } from "../apis/user";
export default {
  components: {
    hmbtn,
    hminput
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    back(){
      this.$router.push({path:'/'})
    },
    async Login() {
      if (
        /^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) &&
        /^\S{3,16}$/.test(this.user.password)
      ) {
        let res = await login(this.user);
        console.log(res);
        if (res.data.message === "用户不存在") {
          // 给出用户提示
          this.$toast.fail('用户或密码错误');
        } else {
          // 实现页面的跳转
          localStorage.setItem("toutiao_token", res.data.data.token);
          localStorage.setItem("toutiao_user_info",JSON.stringify(res.data.data.user));
          this.$router.push({path:`/personal/${res.data.data.user.id}`});
        }
      } else {
        this.$toast.fail("用户数据输入不合法");
      }
    }
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
