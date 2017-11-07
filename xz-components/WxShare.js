import React from 'react'
import AxiosUtil from '../util/axios'
import Layout from '../components/layout'

// 直接引用 传入props完成设置 就可以在该页面使用分享
// title: 分享标题
// desc: 描述
// link: 跳转链接
// imgUrl: 分享图片
// 使用绝对路径

export default class WxShare extends React.Component {
  componentDidMount = async () => {
    const url = `/api/interview/getWXConfig?url=${location.href.split('#')[0]}`
    let wxConfig = await AxiosUtil.get(url)
    wxConfig.jsApiList = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
    // eslint-disable-next-line
    wx.config(wxConfig)
    console.log(this.props)
    let { title, desc, link, imgUrl } = this.props
    // eslint-disable-next-line
    wx.ready(function () {
      console.log('ready')
      // eslint-disable-next-line
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl, // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
      // eslint-disable-next-line
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl, // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
      // eslint-disable-next-line
      wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl, // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
      // eslint-disable-next-line
      wx.onMenuShareWeibo({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl, // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
      // eslint-disable-next-line
      wx.onMenuShareQZone({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl, // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
    })
    // eslint-disable-next-line
    wx.error(function (res) {
      console.log('微信认证失败')
      console.log(res)
    })
  }
  render () {
    return <div>
      <Layout />
    </div>
  }
}

