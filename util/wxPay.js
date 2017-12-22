// 订单页
let payData = null

let wxPayController = {}

wxPayController.payInit = (payInfo) => {
  payData = payInfo
  // 2 调用微信
  if (window.__wxjs_environment === 'miniprogram') {
    alert('小程序获取订单')
    let { nonceStr, paySign, timeStamp, prepayId } = payInfo
    alert(wx)
    alert(wx.miniProgram.navigateTo)
    wx.miniProgram.navigateTo({ url: `/pages/target/target?timeStamp=${timeStamp}&nonceStr=${nonceStr}&prepayId=${prepayId}&signType=MD5&paySign=${paySign}` })
  } else {
    return wxPayController.pay()
  }
}

wxPayController.pay = () => {
  console.log('wxPayController.pay')
  if (typeof WeixinJSBridge === 'undefined') {
    // 这段代码似乎没跑过。如果跑会影响到回调。
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', wxPayController.pay, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', wxPayController.pay)
      document.attachEvent('onWeixinJSBridgeReady', wxPayController.pay)
    }
  } else {
    console.log('wxPayController.onBridgeReady')
    return wxPayController.onBridgeReady()
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
        alert(res.err_msg)
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
        alert('支付回调')
        resolve(json)
      }
    )
  })
}

module.exports = wxPayController
