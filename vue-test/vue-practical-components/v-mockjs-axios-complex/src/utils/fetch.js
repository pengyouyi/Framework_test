import axios from 'axios';
import vue from 'vue';
 
const baseUrl = 'http://localhost:8080';
// 创建axios实例
const HTTP = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
 
// 请求拦截器
HTTP.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  return Promise.reject(error);
});

// 响应拦截器
HTTP.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
});

export default HTTP;