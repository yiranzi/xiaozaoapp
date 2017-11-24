import React from 'react'
import Layout from '../../components/layout'
import LoadingIcon from '../../xz-components/loadingicon'
import AxiosUtil from '../../util/axios'
import DataUtils from '../../util/data'
import Header from '../../containers/abilitycollege/header'
import Footer from '../../components/footer'
import Schedule from '../../containers/abilitycollege/main/schedule'
import Plan from '../../containers/abilitycollege/main/plan'
import Course from '../../containers/abilitycollege/main/course'
import Patent from '../../containers/abilitycollege/main/patent'
import Teacher from '../../containers/abilitycollege/main/teacher'
import Study from '../../containers/abilitycollege/main/study'
import ToolsUtil from '../../util/tools'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      exchangeDetail: {},
      coupon: [],
      groupId: '',
      headimg: '',
      nickname: '',
      category: '',
      couponname: '',
      couponid: '',
      couponError: '',
      canEnter: false
    }
  }
  componentDidMount = async () => {
    let groupId = ToolsUtil.getQueryString('groupId') // 拼团id
    let headimg = ToolsUtil.getQueryString('headimg') // 邀请人头像
    let nickname = ToolsUtil.getQueryString('nickname') // 邀请人昵称
    let category = ToolsUtil.getQueryString('category') // 区分是邀请参团还是分享优惠券, 参团值为invite, 优惠券是coupon
    let couponname = ToolsUtil.getQueryString('couponname') // 通用券, 闺蜜券, 基友券, 校友券
    let couponid = ToolsUtil.getQueryString('couponid') // 优惠券id
    if (couponid) {
      try {
        await AxiosUtil.get('/api/study-card/receiveCoupon/' + couponid)
      } catch (e) {
        if (e.status === 10003) { this.setState({canEnter: true}) }
        this.setState({couponError: e.message})
      }
    }
    this.setState({
      groupId: groupId,
      headimg: headimg,
      nickname: decodeURI(decodeURI(nickname)),
      category: category,
      couponname: decodeURI(decodeURI(couponname))
    })

    let exchangeDetail = await AxiosUtil.get('/api/study-card/exchangeDetail') // 获取schedule course文案
    let coupon = await AxiosUtil.get('/api/study-card/coupon') // 获取已获得的优惠券
    exchangeDetail = this.formData(exchangeDetail)
    this.setState({exchangeDetail: exchangeDetail, coupon: coupon})

    this.scrollFunction()
  }
  formData (exchangeDetail) {
    let json = {}
    exchangeDetail.map((item) => {
      let {title} = item
      let category

      if (title.match(/核心/)) {
        category = 'currency'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
      if (title.match(/职场/)) {
        category = 'work'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
      if (title.match(/求职/)) {
        category = 'job'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
      if (title.match(/最新/)) {
        category = '_new'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
      if (title.match(/最热/)) {
        category = 'hot'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
    })
    return json
  }
  jumpTo () {
    location.href = '/payment/buygether' + location.search
  }
  renderInviteBar (headimg, nickname) {
    return (
      <div id='share-tips' onClick={() => { this.jumpTo() }}>
        <div><img src={headimg} /></div>
        <div style={{marginLeft: '0.5rem'}}>参加{nickname}的团，低至3折获取能力卡</div>
      </div>
    )
  }
  renderCouponBar (headimg, nickname) {
    const {couponname, couponError, canEnter} = this.state
    if (couponError && canEnter) return <div className='share-tips' onClick={() => { this.jumpTo() }}>{couponError}</div>
    if (couponError) return <div className='share-tips'>{couponError}</div>
    return (
      <div className='share-tips' onClick={() => { this.jumpTo() }}>
        <div><img src={headimg} /></div>
        <div style={{marginLeft: '0.5rem'}}>
          <p>已获得{nickname}赠送的{couponname}，购买能力卡，立享9折！</p>
        </div>
      </div>
    )
  }
  renderBar () {
    return <div style={{backgroundColor: '#f0f2f6', height: '1rem'}} />
  }
  scrollFunction () {
    let tipsDom = document.getElementById('tips-wrapper')
    if (tipsDom) {
      window.onscroll = function () {
        let tipsOffsetTop = tipsDom.offsetTop
        let bodyScrollTop = document.body.scrollTop
        if (bodyScrollTop > tipsOffsetTop) {
          tipsDom.style.position = 'fixed'
        } else {
          tipsDom.style.position = 'relative'
        }
      }
    }
  }
  render () {
    const {exchangeDetail, coupon, headimg, nickname, category} = this.state
    return (
      <Layout>
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
        <div className='main'>
          <Header coupon={coupon} />
          {this.renderBar()}
          {category && (
            <div id='tips-wrapper'>
              {category === 'invite' && this.renderInviteBar(headimg, nickname)}
              {category === 'coupon' && this.renderCouponBar(headimg, nickname)}
            </div>
          )}
          <div className='content'>
            {DataUtils.isEmpty(exchangeDetail) ? <LoadingIcon /> : <Schedule exchangeDetail={this.state.exchangeDetail} />}
            {this.renderBar()}
            <Plan />
            {this.renderBar()}
            {DataUtils.isEmpty(exchangeDetail) ? <LoadingIcon /> : <Course exchangeDetail={this.state.exchangeDetail} />}
            {this.renderBar()}
            <Patent />
            {this.renderBar()}
            <Teacher />
            {this.renderBar()}
            <Study />
          </div>
          <Footer type='college' />
        </div>
        <style jsx>{`
          .content {
            padding-bottom: 7rem;
          }
        `}</style>
        <style global jsx>{`
          h1 {
            font-size: 1.25rem;
            font-weight: normal;
            color: #2f3138;
            display: inline-block;
            position: relative;
            padding-left: 1.25rem;
            margin-left: 1rem;
          }
          h1::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 6px;
            width: 6px;
            height: 1rem;
            border-radius: 15px;
            background-color: #241d66;
          }
          /**
           * bar 样式
           */
          #tips-wrapper {
            background-color: #fff;
            width: 100%;
            top: 0;
            z-index: 9;
            padding: 1rem 0;
          }
          .share-tips {
            width: 100%;
            background-color: #c41616;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.85rem;
            color: #fff;
            padding: 0.5rem 0;
          }
          .share-tips img {
            width: 2rem;
            border-radius: 2rem;
            display: block;
          }
          .schedule .slick-slide,
          .course .slick-slide {
            height: 154px !important;
          }
        `}</style>
      </Layout>
    )
  }
}
