// 订单页
let payData = null
let dev = false
let wxPayController = {}

wxPayController.payInit = async (payInfo, _dev) => {
  payData = payInfo
  if (_dev) {
    dev = true
  }
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
        let json = {state: 'unknown', message: '未知错误'}
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          json.state = 'ok'
          json.message = '支付成功'
        } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          json.state = 'cancel'
          json.message = '支付取消'
        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
          json.state = 'fail'
          json.message = '支付失败'
        }
        if (dev === true) {
          alert(JSON.stringify(json))
          alert(JSON.stringify(res))
        }
        resolve(json)
      }
    )
  })
}

module.exports = wxPayController
