<template>
  <div class="personal">
    <router-link :to="{ path: `/edutPersonal/${currentUser.id}` }">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              v-if="this.currentUser.gender === 2"
              style="color: #eb7598;"
              class="iconfont iconxingbienv"
            ></span>
            <span
              v-if="this.currentUser.gender === 1"
              class="iconfont iconxingbienan"
            ></span
            >{{ this.currentUser.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span></div
    ></router-link>
    <hmcell
      title="我的关注"
      desc="关注的用户"
      @click="$router.push({ name: 'MyFollows' })"
    ></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复"></hmcell>
    <hmcell
      title="我的收藏"
      desc="文章/视频"
      @click="$router.push({ name: 'MyStars' })"
    ></hmcell>
    <hmcell title="设置"></hmcell>
    <hmbtn class="btns" @click="exit">退出</hmbtn>
  </div>
</template>

<script>
import hmcell from "@/components/hmcell";
import hmbtn from "@/components/hmbtn";
import { getUserById } from "@/apis/user";
export default {
  components: {
    hmcell,
    hmbtn
  },
  data() {
    return {
      // 定义一个对象去存放获取到的用户信息
      currentUser: {}
    };
  },
  async mounted() {
    let res = await getUserById(this.$route.params.id);
    if (res.data.message === "获取成功") {
      this.currentUser = res.data.data;
      console.log(res);
      this.currentUser.head_img =
        "http://127.0.0.1:3000" + this.currentUser.head_img;
    } else if (res.data.message === "用户信息验证失败") {
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    exit() {
      localStorage.removeItem("toutiao_token");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.btns {
  margin: 20px auto;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
