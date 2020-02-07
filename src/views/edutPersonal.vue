<template>
  <div class="edit">
    <hmheader title="编辑个人信息">
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </hmheader>
    <div class="img">
      <img alt="" :src="currentUser.head_img" />
      <!-- 文件上传组件 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell
      title="昵称"
      :desc="currentUser.nickname"
      @click="nickshow = !nickshow"
    ></hmcell>
    <van-dialog
      v-model="nickshow"
      title="修改昵称"
      @confirm="updateNickname"
      show-cancel-button
    >
      <van-field
        ref="nick"
        :value="currentUser.nickname"
        placeholder="请输入昵称"
        required
        label="昵称"
      />
    </van-dialog>
    <hmcell
      title="密码"
      :desc="currentUser.password"
      type="password"
      @click="password = !password"
    ></hmcell>
    <van-dialog
      v-model="password"
      title="修改密码"
      show-cancel-button
      :beforeClose="updatePassword"
    >
      <van-field
        ref="password"
        placeholder="请输入原密码"
        required
        label="原密码"
        type="password"
      />
      <van-field
        ref="onepassword"
        placeholder="请输入新密码"
        required
        label="新密码"
        type="password"
      />
    </van-dialog>
    <hmcell
      title="性别"
      :desc="currentUser.gender === 0 ? '女' : '男'"
      @click="isgender = !isgender"
    ></hmcell>
    <van-dialog
      v-model="isgender"
      title="修改性别"
      show-cancel-button
      @confirm="updateGender"
    >
      <van-picker
        :columns="['女', '男']"
        :default-index="currentUser.gender"
        :swipe-duration="100"
        @change="onChange"
      />
    </van-dialog>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader";
import hmcell from "@/components/hmcell";
import { uploadFile } from "@/apis/upload";
import { getUserById, updateUserById } from "@/apis/user";
export default {
  components: {
    hmheader,
    hmcell
  },
  data() {
    return {
      //创建一个对象存放获取到的用户信息
      currentUser: {},
      //创建判断弹出框是否弹出的变量，初始为false
      nickshow: false,
      password: false,
      isgender: false,
      gender: ""
    };
  },
  async mounted() {
    let res = await getUserById(this.$route.params.id);
    if (res.data.message == "获取成功") {
      this.currentUser = res.data.data;
      // 如果有图片，则拼接
      if (this.currentUser.head_img) {
        this.currentUser.head_img =
          "http://127.0.0.1:3000" + this.currentUser.head_img;
      } else {
        // 如果没有图片，则设置默认图片
        this.currentUser.head_img =
          "http://localhost:3000/uploads/image/IMG1568820150584.jpeg";
      }
    }
  },
  methods: {
    async afterRead(file) {
      let formdata = new FormData();
      formdata.append("file", file.file);
      let res = await uploadFile(formdata);
      if (res.data.message === "文件上传成功") {
        // 再次发起请求，实现 用户头像的更新
        this.currentUser.head_img = "http://127.0.0.1:3000" + res.data.data.url;
        let res2 = await updateUserById(this.currentUser.id, {
          head_img: res.data.data.url
        });
        if (res2.data.message === "修改成功") {
          this.$toast.success("修改成功");
        } else {
          this.$toast.fail("修改失败");
        }
      } else {
        this.$toast.fail("文件上传失败");
      }
    },
    async updateNickname() {
      let name = this.$refs.nick.$refs.input.value;
      //   console.log(this.$refs.nick.$refs.value);
      let res = await updateUserById(this.currentUser.id, {
        nickname: name
      });
      if (res.data.message === "修改成功") {
        this.currentUser.nickname = name;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    async updatePassword(action, done) {
      let password = this.$refs.password.$refs.input.value;
      let editPassword = this.$refs.onepassword.$refs.input.value;
      if (action === "confirm") {
        if (password !== this.currentUser.password) {
          this.$toast.fail("原密码不正确");
          done(false);
        } else if (
          password === this.currentUser.password &&
          /^\S{3,16}$/.test(editPassword)
        ) {
          let res = await updateUserById(this.currentUser.id, {
            password: editPassword
          });
          if (res.data.message === "修改成功") {
            this.currentUser.password = editPassword;
            this.$toast.success("修改成功");
            done();
          } else {
            this.$toast.fail("修改失败");
          }
        } else if (password.length === 0) {
          this.$toast.fail("原密码不能为空");
          done(false);
        } else if (editPassword.length === 0) {
          this.$toast.fail("请输入3-16位的新密码");
          done(false);
        }
      } else if (action === "cancel") {
        done();
      }
    },
    async updateGender() {
      let res = await updateUserById(this.currentUser.id, {
        gender: this.gender
      });
      if (res.data.message === "修改成功") {
        this.currentUser.gender = this.gender;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    onChange(picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.gender = index;
    }
  }
};
</script>

<style lang="less" scoped>
.img {
  height: 130/360 * 100vw;
  text-align: center;
  position: relative;
  > img {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/.van-uploader__upload {
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
