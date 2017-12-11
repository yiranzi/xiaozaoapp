import Tips from '../xz-components/tips'
import ToolsUtil from '../util/tools'
import axios from 'axios'
import wrapper from '/util/axiosCache/wrapper'

let AxiosUtil = {}
let AxiosWithCache = {}

AxiosUtil.cacheInit = (regArr) => {
  if (!AxiosWithCache.init) {
    console.log('cache init!!!!!!!!!!')
    AxiosWithCache = wrapper(axios, {
      maxCacheSize: 15
    })
    AxiosWithCache.init = true
  }
  console.log(regArr)
  if (regArr && regArr.length > 0) {
    regArr.map((reg, index) => {
      AxiosWithCache.__addFilter(new RegExp(reg))
    })
  }
}

AxiosUtil.deleteCache = function (url) {
  if (AxiosWithCache) {
    AxiosWithCache.__deleteCache(url)
  }
}

function request (param) {
  let http = AxiosWithCache.init ? AxiosWithCache : axios
  return new Promise((resolve, reject) => {
    http(param).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data.response)
      } else {
        const {data} = res
        // 接口返回错误
        const json = {
          status: data.status,
          message: data.message,
          url: param.url
        }
        Tips.info({
          children: data.message
        })
        reject(json)
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        if (!ToolsUtil.isDev()) {
          location.reload(true)
        }
      } else {
        reject(error.message)
      }
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
