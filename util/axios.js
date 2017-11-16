const axios = require('axios')

let AxiosUtil = {}

function request (param) {
  return new Promise((resolve, reject) => {
    axios(param).then((res) => {
      if (res.status === 200 && res.data.status === 200) {
        resolve(res.data.response)
      } else {
        if (res.data.status === 9999) {
          alert('未绑定手机号，没有权限')
          location.href = '/user/register'
        } else {
          const {data} = res
          // 接口返回错误
          const json = {
            status: data.status,
            message: data.message,
            url: param.url
          }
          reject(json)
        }
      }
    }).catch((error) => {
      // if (error.response.status === 401) {
      //   alert('登录已过期，请重新登录')
      //   location.reload(true)
      // } else {
      //   reject(error.message)
      // }
    })
  })
}

AxiosUtil.get = function (url) {
  const param = {
    method: 'get',
    url: url
  }
  return request(param)
}

AxiosUtil.post = function (url, data) {
  const param = {
    headers: {'Content-Type': 'application/json'},
    method: 'post',
    url: url,
    data: data
  }
  return request(param)
}

module.exports = AxiosUtil
