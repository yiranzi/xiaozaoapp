import React from 'react'// 库
import Button from '../../xz-components/button'
import Layout from '../../components/layout'// container
import AxiosUtil from '../../util/axios'
import WxShare from '../../xz-components/wxshare'
import wxPayController from '../../util/wxPayController2'// 工具类
import BuyPop from '../../containers/buygether/buypop'
import Fixfooter from '../../xz-components/fixfooter'

// 介绍页
export default class extends React.Component {
  groupLength = 4
  changeInterval = 1000

  buttonStyle = {
    backgroundColor: '#c41616',
    color: 'white'
  }

  constructor (props) {
    super(props)
    this.state = {
      showPop: false, // 购买弹窗
      myGroup: [], // 我的团信息
      otherGroup: undefined, // 其他团信息
      studyCardPackageList: [], // 套餐列表
      couponInfo: [], // 优惠券信息（我发给别人的）
      hasCoupon: {}, // 优惠券信息（我自己持有的）
      myGroupingId: null, // 我正在开团的id
      currentJoinInfo: {}, // 参团信息
      currentTypeSelect: 0 // // 当前选择的拼团套餐。用于购买
    }
    this.renderCard = this.renderCard.bind(this)
    this.renderShare = this.renderShare.bind(this)
    this.buyMyGroup = this.buyMyGroup.bind(this)
    this.buyOtherGroup = this.buyOtherGroup.bind(this)
    this.buyButtonCallBack = this.buyButtonCallBack.bind(this)
    this.canleCallBack = this.canleCallBack.bind(this)
  }

  componentDidMount = async () => {
    // 0 去参数
    // 1 拉取优惠券 （如果有。
    let buyDetail = await AxiosUtil.get('/api/study-card/buyDetail')
    let couponInfo = await AxiosUtil.get('/api/study-card/coupon')
    let {myGroup, otherGroup, studyCardPackageList, studyCardCouponInvite} = buyDetail
    // 4 设置不同的分享
    this.setGroupStatus(myGroup)
    this.setState({
      myGroup: myGroup,
      otherGroup: otherGroup,
      studyCardPackageList: studyCardPackageList,
      hasCoupon: studyCardCouponInvite,
      couponInfo: couponInfo
    }, this.setRenderOtherGroupInterval)
  }

  // 根据信息设置开团状态 如果有团 设置团号 没有滞null
  setGroupStatus (myGroup) {
    let myGroupingId = null
    if (myGroup && myGroup.length > 0) {
      let result = myGroup.find((ele, index) => {
        return (ele.status === 0)
      })
      myGroupingId = result ? result.groupId : null
    } else {
      myGroupingId = null
    }
    this.setState({
      myGroupingId: myGroupingId
    })
  }

  // otherGroup 列表自动刷新
  setRenderOtherGroupInterval () {
    // 如果可供参团大于一次展示的数量
    if (this.state.otherGroup.length > this.groupLength) {
      window.setInterval(this.refreshGroup, this.changeInterval)
    }
  }

  refreshGroup () {
    let {otherGroup} = this.state
    // 将前面的移动到最后
    let popArr = otherGroup.splice(1, this.groupLength)
    otherGroup.concat(popArr)
    this.setState({
      otherGroup: otherGroup
    })
  }

  renderShare () {
    let shareProp = {
      title: '我没有团，你可以来看看',
      desc: '我没有团',
      link: 'http://rcwx.review.xiaozao.org/buygether',
      imgUrl: 'http://wx.xiaozao.org/static/img/apollo/share-icon.jpg',
    }
    if (this.state.myGroupingId) {
      shareProp.title = '我正在团，来和我参团'
      shareProp.desc = '我正在团'
      shareProp.link += `/?groundId=${this.state.myGroupingId}`
    }

    return (<WxShare {...shareProp} />)
  }

  renderGroupType () {
    let {studyCardPackageList} = this.state
    return (<div className='show-card'>
      <div className='line'>
        <span>能力卡可以用于兑换2018课表课程</span>
        <span>已有9999人获得能力卡</span>
      </div>
      <div className='card-line'>
        {studyCardPackageList.map((ele, index) => {
          return (
            <div key={index} onClick={() => { this.buyMyGroup(index) }}>
              <img src={`/static/img/buygether/card_${ele.id}.png`} />
            </div>)
        })}
      </div>
      <div className='text-line'>
        <p>123123123</p>
      </div>
      <style jsx>{`
        .show-card {
          position: relative;
          height: 200px;
          background-image: url('/static/img/buygether/buyBg_2.jpeg');
          background-size: 100% 100%;
          padding: 8px;
          font-size: 14px;
          color: white;
        }
        .line {
          display: flex;
          justify-content: space-between;
        }
        .card-line {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
        }
        .card-line img {
          width: 80px;
        }
        .text-line {
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
        }
      `}</style>
    </div>)
  }

  // 立即邀请好友 弹窗 正在开团的line
  // 邀请好友，再得卡 跳转 已成团的line
  renderMyGroup () {
    const {myGroup} = this.state
    if (myGroup && myGroup.length > 0) {
      let button
      let arr = myGroup.map((ele, index) => {
        // 要根据这个团的不同情况进行渲染
        if (ele.status === 1) {
          // 历史团
          button = <Button style={this.buttonStyle} onClick={this.goRouter}>邀请好友，再得卡</Button>
        } else {
          // 正在团
          button = <Button style={this.buttonStyle} onClick={this.renderPop}>立即邀请好友</Button>
        }
        return (this.renderCard(ele, button, index))
      })
      return (<div className='div-with-bottom'>
        {this.renderTitle('我的团')}
        {arr}
        <style jsx>{`
          .div-with-bottom {
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
          }
        `}</style>
      </div>)
    }
  }

  renderPop () {
    console.log('renderPop')
  }

  goRouter () {
    console.log('go router')
  }

  renderCoupon () {
    let {hasCoupon} = this.state
    if (hasCoupon) {
      return (<div className='div-with-bottom'>
        {this.renderTitle('我获得的优惠券')}
        <p>报名后你的好友</p>
        <style jsx>{`
          .div-with-bottom {
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
          }
        `}</style>
      </div>)
    }
  }

  renderOtherGroup () {
    let {otherGroup} = this.state
    if (otherGroup !== undefined) {
      const perLength = this.groupLength
      let groupingArr = []
      if (otherGroup.length > perLength) {
        // 如果人数多于4个，取出4个渲染
        groupingArr = otherGroup.slice(1, perLength).map((ele, index) => {
          const button = <Button style={this.buttonStyle} onClick={() => { this.buyOtherGroup(ele) }}>参团</Button>
          return (this.renderCard(ele, button, index))
        })
      } else if (otherGroup.length > 0) {
        // 如果人数不足4个
        groupingArr = otherGroup.map((ele, index) => {
          const button = <Button style={this.buttonStyle} onClick={() => { this.buyOtherGroup(ele) }}>参团</Button>
          return (this.renderCard(ele, button, index))
        })
      } else {
        // 如果无人
        groupingArr = <img style={{width: '60%'}} src='/static/img/buygether/no_group.png' />
      }
      return (<div className='div-with-bottom'>
        {this.renderTitle('拼团进行中')}
        {groupingArr}
        <style jsx>{`
          .div-with-bottom {
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
          }
        `}</style>
      </div>)
    }
  }

  // 1 判定状态。
  // 已成团 参团

  // 解析参数。渲染拼团
  renderCard (groupInfo, button, index) {
    let {headimgurl, leftHour, leftMinute, nickname, groupId} = groupInfo
    let content
    if (groupInfo.status === 1) {
      content = '已成团'
    } else {
      let style = {
        backgroundColor: '#f0f2f6',
        borderRadius: '20px',
        padding: '2px 5px'
      }
      content = <div >
        剩余<span style={style}>{`${leftHour}时${leftMinute}分${29}秒`}</span>
        <br />还差1人
      </div>
    }
    return (<div key={index} className='group-card'>
      <div className='head-list'>
        {headimgurl.map((ele, index) => {
          return <img key={index} src={ele} />
        })}
      </div>
      <div className='content'>
        <p>{nickname}的拼团</p>
        <p>{content}</p>
      </div>
      <div className='button'>
        {button}
      </div>
      <style jsx>{`
        .group-card {
          display: flex;
          font-size: 14px;
          justift-content: space-between;
          align-items: center;
          padding: 10px 0px;
        }
        .group-card > div{
          margin: 0 6px;
        }
        .content {
          text-align: left;
          min-width: 180px;
        }
        .button {
          width: 100%;
          {/*height: 50px;*/}
        }
        .button > div {
          height: 100%;
        }
        .head-list {
          text-align: center;
          min-width: 80px;
          display: flex;
        }
        .head-list img {
          margin: auto;
          position: relative;
          z-index: 10;
        }
        .head-list img+img {
          z-index: 5;
          margin-left: -40px;
        }
        .head-list img {
          border-radius: 50%;
          width: 60px;
          height: 60px;
        }
      `}</style>
    </div>)
  }

  // 渲染 小标题
  renderTitle (title) {
    return (
      <div className='title-line'>
        <span className='dot'>.</span>
        <h1 className='my-h1'>{title}</h1>
        <style jsx>{`
          .title-line {
            padding: 10px;
            display: flex;
            align-items: center;
          }
          .my-h1 {
            font-size: 20px !important;
          }
          .dot {
            background-color: #241d66;
            color: #241d66;
            margin-right: 5px;
            border-radius: 5px;
            height: 24px;
            width: 8px;
          }
        `}</style>
      </div>
    )
  }

  renderBuyButton () {
    return (<div>
      <Button style={this.buttonStyle} onClick={() => { this.buyMyGroup() }}>自己开团</Button>
    </div>)
  }

  buyButtonCallBack = async (typeId, groupId) => {
    console.log(typeId)
    console.log(groupId)
    if (groupId) {
      let payInfo = await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}`)
      wxPayController.payInit(payInfo)
    } else {
      let payInfo = await AxiosUtil.get(`/api/study-card/buy/${typeId}`)
      wxPayController.payInit(payInfo)
    }
  }

  buyMyGroup = async (typeId) => {
    let currentTypeSelect = typeId || 0
    this.setState({
      currentTypeSelect: currentTypeSelect,
      currentJoinInfo: {},
      showPop: true
    })
  }

  buyOtherGroup = (ele) => {
    this.setState({
      currentTypeSelect: 0,
      currentJoinInfo: ele,
      showPop: true
    })
  }

  canleCallBack () {
    this.setState({
      showPop: false
    })
  }

  renderFooter () {
    return (<Fixfooter>
      <div className='fix-foot'>
        <div className='left'>
          <img src='/static/img/buygether/ask.png' />
          <span>在线咨询</span>
        </div>
        <div className='right' onClick={this.buyMyGroup}>
          <img src='/static/img/buygether/buy.png' />
          <span>获得能力卡 开团享3折</span>
        </div>
      </div>
      <style jsx>{`
        .fix-foot {
          margin: -16px;
          display: flex;
          font-size: 14px;
          color: white;
          height: 50px;
          line-height: 50px;
        }
        .left {
          flex: 1;
          background-color: #4146aa;
        }
        .right {
          flex: 2;
          background-color: #c41616;
        }
        .fix-foot > div{
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .fix-foot img{
          width: 25px;
          margin-right: 5px;
        }
      `}</style>
      </Fixfooter>)
  }

  render () {
    return (
      <Layout>
        {this.renderShare()}
        <div className='buy-card-page'>
          <img className='bg-img1' src={'/static/img/buygether/buyBg_1.jpeg'} />
          <div>{this.renderGroupType()}</div>
          <div className='card-div'>
            {this.renderMyGroup()}
            {this.renderCoupon()}
            {this.renderOtherGroup()}
          </div>
          <div className='buy-button'>
            {this.renderBuyButton()}
          </div>
          <div className='more-info'>
          </div>
          {this.renderFooter()}
        </div>
        {this.state.showPop && <BuyPop
          defaultActiveKey={this.state.currentTypeSelect}
          buyButtonCallBack={this.buyButtonCallBack}
          joinInfo={this.state.currentJoinInfo}
          canleCallBack={this.canleCallBack}
          dataInfo={this.state.studyCardPackageList} />}
        <style jsx>{`
          .buy-card-page {
            padding-bottom: 80px;
            width: 100%;
            font-size: 0;
            text-align: center;
            color: #2f3138;
          }
          .buy-card-page *{
            margin: 0px;
            padidng: 0;
          }
          .bg-img1 {
            width: 100%;
          }
          .buy-button {
            padding: 5px;
          }
          .header {
            font-size: 22px;
          }
          .card-div {
            padding: 0 10px;
          }
          .more-info {
            background-color: #f0f2f6;
          }
        `}</style>
      </Layout>
    )
  }
}
