import React from 'react'

export default class Layout extends React.Component {
  pop () {
    console.log('123')
    if (window.__wxjs_environment === 'miniprogram') {
      alert('小程序获取订单')
      alert(wx)
      alert(wx.miniProgram.navigateTo)
      wx.miniProgram.navigateTo({ url: `/pages/target/target` })
    } else {
      alert('not little')
    }
  }

  render () {
    return (
      <div>
        <script type='text/javascript' src='https://res.wx.qq.com/open/js/jweixin-1.3.0.js'></script>
        <div onClick={() => { this.pop() }}>点击跳转</div>
      </div>
    )
  }
}
