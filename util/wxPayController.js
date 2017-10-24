import AxiosUtil from '../util/axios'
// 订单页
let payData = null

let wxPayController = {}

wxPayController.payInit = async () => {
  console.log('init')
  // 1 获取订单数据
  await wxPayController.getPayInfo()
  // 2 调用微信
  wxPayController.pay()
}

wxPayController.pay = () => {
  console.log('pay')
  if (typeof WeixinJSBridge === "undefined") {
    console.log('1')
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', wxPayController.pay, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', wxPayController.pay);
      document.attachEvent('onWeixinJSBridgeReady', wxPayController.pay);
    }
  } else {
    console.log('2')
    wxPayController.onBridgeReady()
  }
}

wxPayController.onBridgeReady = () => {
// 2 设置订单
  console.log('onBridgeReady')
  let {appId, nonceStr, paySign, timeStamp, prepayId} = payData
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      'appId': appId,
      'timeStamp': timeStamp,
      'nonceStr': nonceStr,
      'package': `prepay_id=${prepayId}`,
      'signType': 'MD5',
      'paySign': paySign
    },
    function(res){
      if (res.err_msg == 'get_brand_wcpay_request:ok' ) {
        console.log('get ')
      }
      location.href = `/interviewvip/introPage`
    }
  );
}


wxPayController.getPayInfo = async () => {
  console.log('getPayInfo')
  try {
    let payInfo = await AxiosUtil.get('/api/interview/buy')
    payData = payInfo
    console.log(payData)
  } catch (e) {
    console.log(e)
  }
}

module.exports = wxPayController
