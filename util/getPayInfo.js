import AxiosUtil from '../util/axios'

let payStatus = null
let canBuy = null

let payInfo = {}


payInfo.getPayInfo = async () => {
  return new Promise((resolve, reject) => {
    AxiosUtil({method: 'get', url: '/api/interview/buyInfo'}).then((res) => {
      payStatus = res.buyed
      canBuy = res.canBuy
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

payInfo.getPayStatus = function () {
  return payStatus
}

payInfo.getCanBuy = function () {
  return canBuy
}


module.exports = payInfo;
