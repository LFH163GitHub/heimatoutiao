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
