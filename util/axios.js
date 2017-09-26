const axios = require('axios')

function AxiosUtil (param) {
  let {method, data, url} = param

  // if (process.env.NODE_ENV === 'development') {
  //   url = `http://192.168.200.183:81${url}`;
  // }

  let axiosParam = Object.assign({}, {
    method: method,
    url: url
  })
  if (data) {
    axiosParam.data = data
  }
  if (method === 'post') {
    axiosParam.headers = {'Content-Type': 'application/json'}
  }
  return new Promise((resolve, reject) => {
    axios(axiosParam).then((res) => {
      if (res.status === 200 && res.data.status === 200) {
        resolve(res.data.response)
      } else {
        // 临时处理
        if (res.status === 401 || res.data.status === 401) {
          location.href = 'http://wx.xiaozao.org/auth/logout'
        }
        const {data} = res
        // 接口返回错误
        const json = {
          status: data.status,
          message: data.message,
          url: param.url
        }
        reject(json)
      }
    }).catch((error) => {
      reject(error.response.status)
    })
  })
}

module.exports = AxiosUtil
