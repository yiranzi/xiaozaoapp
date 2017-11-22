import React from 'react'
import Layout from '../../components/layout'
import AxiosUtil from '../../util/axios'
import DataUtils from '../../util/data'
import { Shadow } from '../../xz-components/shadow'
import LoadingIcon from '../../xz-components/loadingicon'
import WxShare from '../../xz-components/newWxShare'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      wxConfig: new WxShare(),
      detail: {},
      coupon: []
    }
  }
  componentDidMount = async () => {
    // 初始化wxShare
    const {wxConfig} = this.state
    try {
      let detail = await AxiosUtil.get('/api/study-card') // 通过邀请获得的能力卡
      this.setState({ detail: detail })

      let coupon = await AxiosUtil.get('/api/study-card/coupon') // 优惠券详情

      // 设置默认的分享内容
      let _default = coupon[0]
      let {name, headimgurl, nickname} = _default
      let afterfix = 'headimg=' + encodeURI(headimgurl) +
                     '&nickname=' + encodeURI(encodeURI(nickname)) +
                     '&category=coupon' +
                     '&couponname=' + encodeURI(encodeURI(name)) +
                     '&couponid=' + _default.id
      await wxConfig.init()
      await wxConfig.setShareConfig({
        title: `${nickname}送你26个能力课，${name}享9折`,
        desc: '小灶能力学院限时拼团特惠，PPT 课、商业英语课、结构化逻辑课、四大求职通关课等26大课程3大类能力等你拥有。',
        link: 'http://rcwx.review.xiaozao.org/abilitycollege/main?' + afterfix,
        imgUrl: 'http://wx.xiaozao.org/static/img/abilitycollege/shareicon.png'
      })
      this.setState({ coupon: coupon })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  };

  openShadow (item) {
    let {id, name, headimgurl, nickname} = item
    let afterfix = 'headimg=' + encodeURI(headimgurl) +
                   '&nickname=' + encodeURI(encodeURI(nickname)) +
                   '&category=coupon' +
                   '&couponname=' + encodeURI(encodeURI(name)) +
                   '&couponid=' + id
    this.state.wxConfig.setShareConfig({
      title: `${nickname}送你26个能力课，${name}享9折`,
      desc: '小灶能力学院限时拼团特惠，PPT 课、商业英语课、结构化逻辑课、四大求职通关课等26大课程3大类能力等你拥有。',
      link: 'http://rcwx.review.xiaozao.org/abilitycollege/main?' + afterfix,
      imgUrl: 'http://wx.xiaozao.org/static/img/abilitycollege/shareicon.png'
    })

    let content = (
      <div className='content'>
        <div className='arrow'>
          <img src='/static/img/abilitycollege/share_arrow.png' />
        </div>
        <p>你正在分享{name}</p>
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
      style: { backgroundColor: '#f0f2f6' }
    })
  }
  renderCouponItem (item, key) {
    let {name} = item
    let bg = ''
    if (name === '通用券') { bg = '#cba46b' }
    if (name === '闺蜜券') { bg = '#ff91ad' }
    if (name === '基友券') { bg = '#f7be0f' }
    if (name === '校友券') { bg = '#3964c5' }

    return (
      <div className='item' key={key}>
        <div className='wrapper'>
          <div className='sub-title' style={{ backgroundColor: bg }}>
            {name}
          </div>
          <div className='coupon'>9折</div>
        </div>
        <div
          className='share'
          onClick={() => {
            this.openShadow(item)
          }}
        >
          分享
        </div>
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
            margin-top: 2px;
          }
        `}</style>
      </div>
    )
  }
  render () {
    const { detail, coupon } = this.state
    return (
      <Layout>
        <div className='coupon'>
          <div className='header'>
            <div className='title'>邀请好友，TA得优惠，你得能力卡</div>
            <p>赠送9折券，可以相应地多次分享给你的闺蜜/基友/室友/学弟学妹/学长学姐。 邀请他们报名，你将会再获得1张能力卡，多邀多得</p>
          </div>
          <div className='coupon-detail'>
            {DataUtils.isEmpty(coupon) && <LoadingIcon />}
            {!DataUtils.isEmpty(coupon) &&
              coupon.map((item, key) => {
                return this.renderCouponItem(item, key)
              })
            }
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
              background: url("/static/img/abilitycollege/share_bg.png");
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
              justify-content: center;
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
