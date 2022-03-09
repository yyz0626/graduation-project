import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 2000
});

//添加请求拦截器
// instance.interceptors.request.use(
//     function (config) {
//         let token = localStorage.getItem('mytoken');
//         config.headers['Authorization'] = "Bearer " + token;
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// )


//添加响应拦截器
// instance.interceptors.response.use(
//     function (response) {
//         // 对响应数据做点什么
//         return response;
//     },
//     function (error) {
//         // 对响应错误做点什么
//         let {
//             status
//         } = error.response;
//         console.log(status);
//         if (status == 401) {
//             // store.dispatch('logout');
//             // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
//             //   confirmButtonText: '确定',
//             //   cancelButtonText: '取消',
//             //   type: 'warning'
//             // }).then(() => {
//             //   this.$message({
//             //     type: 'success',
//             //     message: '删除成功!'
//             //   });
//             // })
//             // this.$message('这是一条消息提示');

//             alert("登录后才可以评论哦~")
//             location.href = "/login";
//         }
//         // return Promise.reject(error);
//     }
// );

export default instance;