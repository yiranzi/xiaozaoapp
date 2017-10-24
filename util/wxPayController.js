import AxiosUtil from '../util/axios'
// 订单页
let payData = null

let wxPayController = {}

wxPayController.payInit = () => {
  console.log('init')
  // 1 获取订单数据
  wxPayController.getPayInfo()
  // 2 调用微信
  wxPayController.pay()
}

wxPayController.pay = () => {
  console.log('pay')
  if (typeof WeixinJSBridge === "undefined") {
    console.log('1')
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', wxPayController.payInit, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', wxPayController.payInit);
      document.attachEvent('onWeixinJSBridgeReady', wxPayController.payInit);
    }
  } else {
    console.log('2')
    wxPayController.onBridgeReady()
  }
}

wxPayController.onBridgeReady = () => {
// 2 设置订单
  console.log('onBridgeReady')
  let {appId, nonceStr, paySign, timeStamp} = payData
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      "appId": appId,     //公众号名称，由商户传入
      "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
      "nonceStr": nonceStr, //随机串
      "package":"prepay_id=u802345jgfjsdfgsdg888",
      "signType":"MD5",         //微信签名方式：
      "paySign": paySign //微信签名
    },
    function(res){
      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
        console.log('get ')
      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
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
