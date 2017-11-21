import React from 'react'
import Layout from '../../components/layout'
import AxiosUtil from '../../util/axios'
import {Shadow} from '../../xz-components/shadow'
import WxShare from '../../xz-components/wxshare'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      detail: {},
      coupon: []
    }
  }
  componentDidMount = async () => {
    try {
      let detail = await AxiosUtil.get('/api/study-card') // 通过邀请获得的能力卡
      let coupon = await AxiosUtil.get('/api/study-card/coupon') // 优惠券
      this.setState({detail: detail, coupon: coupon})
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
    let prop = {
      title: '优惠券',
      desc: '优惠券详情',
      link: '',
      imgUrl: 'http://wx.xiaozao.org/static/img/apollo/share-icon.jpg',
      success: function () {
        AxiosUtil.get(`/api/interview/getWXConfig?url=onApolloMain`)
      }
    }
    return (<WxShare {...prop} />)
  }
  openShadow (category) {
    let content = (
      <div className='content'>
        <div className='arrow'>
          <img src='/static/img/abilitycollege/share_arrow.png' />
        </div>
        <p>你正在分享{category}券</p>
        <p>点击右上角发送给你的朋友或者分享到朋友圈</p>
        <p>*你可以分享多次给多个朋友哦，多邀多得能力卡</p>
        <style jsx>{`
          .content {
            color: #2f3138;
          }
          .content .arrow {
            text-align: right;
          }
          .content .arrow img {
            width: 50%;
          }
        `}</style>
      </div>
    )

    Shadow({
      content: content,
      style: {backgroundColor: '#f0f2f6'}
    })
  }
  renderCouponItem (subTitle, bg, category) {
    return (
      <div className='item'>
        <div className='wrapper'>
          <div className='sub-title' style={{backgroundColor: bg}}>{subTitle}</div>
          <div className='coupon'>9折</div>
        </div>
        <div className='share' onClick={() => { this.openShadow(category) }}>分享</div>
        <style jsx>{`
          .item {
            flex: 1;
            padding: 5px;
          }
          .wrapper {
            border-radius: 4px;
            background-color: #fff;
          }
          .coupon {
            font-size: 1.25rem;
            color: #c41616;
            font-weight: bold;
            padding: 0.75rem 0;
          }
          .sub-title {
            color: #fff;
            font-size: 0.75rem;
            padding: 8px 0px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
          .share {
            font-size: 0.85rem;
            color: #c41616;
            padding: 0.5rem;
            border-radius: 5px;
            background-color: #fff;
            margin-top: 2px
          }
        `}</style>
      </div>
    )
  }
  render () {
    const {detail} = this.state
    return (
      <Layout>
        <div className='coupon'>
          <div className='header'>
            <div className='title'>邀请好友，TA得优惠，你得能力卡</div>
            <p>
              赠送9折券，可以相应地多次分享给你的闺蜜/基友/室友/学弟学妹/学长学姐。
              邀请他们报名，你将会再获得1张能力卡，多邀多得
            </p>
          </div>
          <div className='coupon-detail'>
            {this.renderCouponItem('通用券', '#cba46b', '通用券')}
            {this.renderCouponItem('闺蜜券', '#ff91ad', '闺蜜券')}
            {this.renderCouponItem('基友券', '#f7be0f', '基友券')}
            {this.renderCouponItem('校友券', '#3964c5', '校友券')}
          </div>
          <div className='own'>
            <div className='text'>已通过邀请获得能力卡</div>
            <div className='acount'>{detail.buyCount}张</div>
          </div>
          <div className='link'>查看我的能力卡</div>
          <style jsx>{`
            .coupon {
              background-color: #f0f2f6;
              min-height: 100vh;
              padding-bottom: 3rem;
              box-sizing: border-box;
            }
            .header {
              color: #fff;
              background: url('/static/img/abilitycollege/share_bg.png');
              background-size: 100% 100%;
              padding: 2rem;
            }
            .header .title {
              font-size: 1.25rem;
              margin-bottom: 1rem;
            }
            .header p {
              font-size: 0.85rem;
            }
            .coupon-detail {
              display: flex;
              text-align: center;
              padding: 1rem;
            }
            .own {
              margin-top: 1rem;
              font-size: 0.75rem;
              background-color: #c41616;
              color: #fff;
              display: flex;
              justify-content: space-between;
              padding: 1rem 3rem;
            }
            .link {
              text-align: center;
              margin-top: 1rem;
              font-size: 0.75rem;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}