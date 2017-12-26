import AxiosUtil from '../util/axios'

// 付费信息 
let canBuy = null
let canEnter = null

// 订单页
let priceInfo = {}

let payInfo = {}

payInfo.getPayInfo = async () => {
  return new Promise((resolve, reject) => {
    AxiosUtil.get('/api/interview/buyInfo').then((res) => {
      // 设置付费
      localStorage.setItem('payStatus', res.buyed)
      canBuy = res.canBuy
      canEnter = res.canEnter
      let {price, offerPrice} = res

      priceInfo.price = price / 100
      priceInfo.offerPrice = offerPrice / 100
      priceInfo.discountPrice = (price - offerPrice) / 100

      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

/*
  获得基本付费信息
 */
payInfo.getPriceInfo = () => {
  return priceInfo
}

payInfo.getCanEnter = function () {
  return canEnter
}

payInfo.getCanBuy = function () {
  return canBuy
}

payInfo.getPayStatus = () => {
  let payStatus = localStorage.getItem('payStatus')
  if (payStatus === 'true') {
    payStatus = true
  } else {
    payStatus = false
  }
  return payStatus
}

module.exports = payInfo
