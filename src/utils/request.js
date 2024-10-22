import axios from 'axios'

//1. 创建新的axios实例
const service = axios.create({
  baseURL: '/api',
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
  ElLoading.service({
    fullscreen: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  if (config.url.includes('/upload')) {
    // 如果是文件上传，不要序列化数据
    config.headers = {
      'Content-Type': 'multipart/form-data'
    };
  } else {
    // 其他请求，序列化数据为 JSON
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json'
    };
  }
  return config;
}, error => {
  throw new Error("请求有误");
})

// 3.响应拦截器
service.interceptors.response.use(response => {
  //接收到响应数据并成功后的一些共有的处理，关闭loading等
  ElLoading.service().close();

  const contentType = response.headers['content-type'];
  if (contentType === "application/octet-stream;charset=UTF-8") {
    // 返回的是文件流
    const blob = new Blob([response.data], { type: contentType })
    const url = window.URL.createObjectURL(blob)
    // 创建一个 <a> 标签，模拟点击下载
    const link = document.createElement('a')
    link.href = url
    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'default.txt';
    if (contentDisposition) {
      const matches = contentDisposition.match(/filename\*?=(UTF-8'')?(.+?)(;|$)/);
      if (matches && matches[2]) {
        fileName = decodeURIComponent(matches[2].replace(/'/g, ''));
      }
    }
    link.download = fileName;
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    return Promise.resolve();
  }

  if (!response.data) {
    throw new Error("响应数据为空");
  }

  if (response.data.code === 40000) {
    throw new Error("请求参数错误");
  } else if (response.data.code === 40001) {
    throw new Error("请求数据为空");
  } else if (response.data.code === 40100) {
    throw new Error("未登录");
  } else if (response.data.code === 40101) {
    throw new Error("无权限");
  } else if (response.data.code === 40301) {
    throw new Error("禁止操作");
  } else if (response.data.code === 50000) {
    throw new Error("系统内部异常");
  } else if (response.data.data == null || undefined) {
    throw new Error("请求到的数据为空");
  }

  return response;
}, error => {
  // 超时处理
  ElLoading.service().close();
  if (JSON.stringify(error).includes('timeout')) {
    throw new Error("服务器响应超时");
  } else {
    throw new Error("服务器错误，请稍后重试，或者联系管理员");
  }
})

export default service;
