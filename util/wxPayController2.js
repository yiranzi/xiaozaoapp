import AxiosUtil from '../util/axios'
// 订单页
let payData = null

let wxPayController = {}

wxPayController.payInit = async (payInfo) => {
  payData = payInfo
  // 2 调用微信
  await wxPayController.pay()
}

wxPayController.pay = async () => {
  console.log('wxPayController.pay')
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', wxPayController.pay, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', wxPayController.pay)
      document.attachEvent('onWeixinJSBridgeReady', wxPayController.pay)
    }
  } else {
    console.log('wxPayController.onBridgeReady')
    await wxPayController.onBridgeReady()
  }
}

wxPayController.onBridgeReady = () => {
  return new Promise((resolve, reject) => {
    let {appId, nonceStr, paySign, timeStamp, prepayId} = payData
    // eslint-disable-next-line
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        'appId': appId,
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': `prepay_id=${prepayId}`,
        'signType': 'MD5',
        'paySign': paySign
      },
      function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
        }
        // alert('1111')
        resolve(true)
      }
    )
  })
}

module.exports = wxPayController
