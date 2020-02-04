//引入的axios已经配置好基准路径
import axios from "@/utils/myaxios.js";
//api的分配
export const login = data => {
  return axios(
    // 1.登陆
    {
      method: "post",
      url: "/login",
      data
    }
  );
};
// 2.根据id获取用户详情
export const getUserById = id => {
  return axios({
    url: `/user/${id}`,
    // 自定义的请求头，用于提供授权谁
    // headers:{后台规定的key:token}
    headers: { Authorization: localStorage.getItem("toutiao_token") }
  });
};
// 3.更新个人信息
export const updateUserById = (id, data) => {
  return axios({
    method: "post",
    url: `/user_update/${id}`,
    data
  });
};
