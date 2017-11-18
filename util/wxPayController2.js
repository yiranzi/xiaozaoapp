import AxiosUtil from '../util/axios'
// 订单页
let payData = null

let wxPayController = {}

wxPayController.payInit = async () => {
  // 1 获取订单数据
  await wxPayController.getPayInfo()
  // 2 调用微信
  wxPayController.pay()
}

wxPayController.pay = () => {
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', wxPayController.pay, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', wxPayController.pay)
      document.attachEvent('onWeixinJSBridgeReady', wxPayController.pay)
    }
  } else {
    wxPayController.onBridgeReady()
  }
}

wxPayController.onBridgeReady = () => {
// 2 设置订单
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
      location.href = `/interviewvip/introPage`
    }
  )
}

wxPayController.getPayInfo = async () => {
  try {
    let payInfo = await AxiosUtil.get('/api/study-card/buy/3')
    payData = payInfo
  } catch (e) {
    alert(e.message)
  }
}

module.exports = wxPayController
