import axios from "axios";
import { MessageBox } from "element-ui";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000,
});

//添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("admin_token");
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    let { status } = error.response;
    if (status == 401) {
      MessageBox.confirm("您还未登录或登录已过期，请先登录哦~", "登陆提示", {
        confirmButtonText: "立即登录",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        location.href = "/login";
      });
    }
    if (status == 402) {
      location.href = "/404";
    }
    // return Promise.reject(error);
  }
);

export default instance;
