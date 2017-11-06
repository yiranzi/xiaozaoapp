import React from 'react'
import AxiosUtil from '../util/axios'
import Layout from '../components/layout'

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

