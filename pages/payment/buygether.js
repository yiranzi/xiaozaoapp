import React from 'react'// 库
import Button from '../../xz-components/button'
import Layout from '../../components/layout'// container
import AxiosUtil from '../../util/axios'
import WxShare from '../../xz-components/wxshare'
import wxPayController from '../../util/wxPayController2'// 工具类
import BuyPop from '../../containers/buygether/buypop'
import Triangle from '../../containers/buygether/poptag'
import Fixfooter from '../../xz-components/fixfooter'
import TimeDown from '../../xz-components/timedown'
import ToolsUtil from '../../util/tools'
import {Alert} from '../../xz-components/alert'

// 介绍页
export default class extends React.Component {
  groupLength = 4
  changeInterval = 1000
  nickname // 分享昵称
  headimgurl // 分享头像

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
      hasCoupon: undefined, // 优惠券信息（我自己持有的）
      myGroupingId: undefined, // 我正在开团的id
      currentJoinInfo: {}, // 参团信息
      currentTypeSelect: 0 // // 当前选择的拼团套餐。用于购买
    }
    this.renderCard = this.renderCard.bind(this)
    this.renderShare = this.renderShare.bind(this)
    this.buyMyGroup = this.buyMyGroup.bind(this)
    this.buyOtherGroup = this.buyOtherGroup.bind(this)
    this.buyButtonCallBack = this.buyButtonCallBack.bind(this)
    this.cancelCallBack = this.cancelCallBack.bind(this)
  }

  componentDidMount = async () => {
    let buyDetail = await AxiosUtil.get('/api/study-card/buyDetail')
    let {myGroup, otherGroup, studyCardPackageList, studyCardCouponInvite} = buyDetail
    this.setState({
      myGroup: myGroup,
      otherGroup: otherGroup,
      studyCardPackageList: studyCardPackageList,
      hasCoupon: studyCardCouponInvite
    }, this.setRenderOtherGroupInterval)
    // 这只我的团状态
    await this.setGroupStatus(myGroup)
    // 0 取参数
    this.joinGroupFromShare()
  }

  // 根据链接 弹出购买框
  joinGroupFromShare () {
    let groupId = ToolsUtil.getQueryString('groupId')
    if (groupId) {
      let nickname = ToolsUtil.getQueryString('nickname')
      let headimgurl = ToolsUtil.getQueryString('headimgurl')

      let currentJoinInfo = {
        nickname: nickname,
        headimgurl: headimgurl,
        groupId: groupId
      }
      this.buyOtherGroup(currentJoinInfo)
    }
  }

  // 根据信息设置开团状态 如果有团 设置团号 没有滞null
  setGroupStatus = async (myGroup) => {
    let myGroupingId = null
    if (myGroup && myGroup.length > 0) {
      let result = myGroup.find((ele, index) => {
        return (ele.status === 0)
      })
      if (result) {
        myGroupingId = result.groupId
        let userInfo = await AxiosUtil.get('/api/user')
        let {nickname, headimgurl} = userInfo
        this.nickname = nickname
        this.headimgurl = headimgurl
      } else {
        myGroupingId = null
      }
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
      link: 'http://rcwx.review.xiaozao.org/',
      imgUrl: 'http://wx.xiaozao.org/static/img/apollo/share-icon.jpg'
    }
    if (this.state.myGroupingId) {
      shareProp.title = '我正在团，来和我参团'
      shareProp.desc = '我正在团'
      shareProp.imgUrl = this.headimgurl
      shareProp.link += `abilitycollege/main/?groundId=${this.state.myGroupingId}&headimgurl=${this.headimgurl}&nickname=${this.nickname}&category=invite`
    }
    return (<WxShare {...shareProp} />)
  }

  renderGroupType () {
    let {studyCardPackageList} = this.state
    return (<div className='show-card'>
      <div className='line'>
        <p>能力卡用于兑换2018课表课程</p>
        <p>已有9999人获得</p>
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
        {/*<p>123123123</p>*/}
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
          flex-wrap: wrap;
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
        {/*return <div style={{fontSize: '20px'}} key={index}>123</div>*/}
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
        <img src='/static/img/buygether/coupon.png' />
        <p>报名后你的好友</p>
        <style jsx>{`
          .div-with-bottom {
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 14px;
            text-align: left
          }
          img {
            width: 100%;
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
        padding: '0px 5px',
        display: 'inline-block'
      }
      content = <div>
        剩余<div style={style}><TimeDown limitTime={leftMinute}>{`${leftHour} : `}</TimeDown></div>
        {/*<br />还差1人*/}
      </div>
    }
    return (<div key={index} className='group-card'>
      <div className='head-list'>
        {headimgurl.map((ele, index) => {
          return (<div key={index} >
            <img src={ele} />
          </div>)
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
          justify-content: space-between;
          align-items: center;
          padding: 10px 0px;
          height: 50px;
        }
        .head-list {
          text-align: center;
          display: flex;
          justify-content: center;
          flex: 2;
          margin-right: 6px;
        }
        .head-list div {
          position: relative;
          z-index: 10;
          width: 70%;
          flex: none;
          text-align:center;
        }
        .head-list img {
          width: 100%;
          border-radius: 50%;
        }
        .head-list div+div {
          z-index: 15;
          margin-left: -35px;
        }
        .content {
          text-align: left;
          flex: 4;
        }
        .button {
          width: 100%;
          flex: 3;
        }
        .button > div {
          height: 100%;
        }
      `}</style>
    </div>)
  }

  // 渲染 小标题
  renderTitle (title) {
    return (
      <div className='title-line'>
        <h1 className='my-h1'>{title}</h1>
        <style jsx>{`
          .title-line {
            padding: 10px 0px;
            display: flex;
            align-items: center;
          }
          .my-h1 {
            font-size: 22px;
            font-weight: normal;
            color: #2f3138;
            display: inline-block;
            position: relative;
            padding-left: 1rem;
          }
          h1::before {
            font-size: 14px;
            content: '';
            position: absolute;
            left: 8px;
            top: 6px;
            width: 6px;
            height: 24px;
            border-radius: 15px;
            background-color: #241d66;
          }
        `}</style>
      </div>
    )
  }

  renderBuyButton () {
    if (this.state.myGroupingId === null) {
      return (<div className='button'>
        <Triangle
          borderStyle={{top: '-8px', borderColor: 'transparent transparent #cba46b #cba46b'}}
          style={{right: '60px', bottom: '-10px'}}>
          团长开团立减10元
        </Triangle>}
        <Button style={this.buttonStyle} onClick={() => { this.buyMyGroup() }}>自己开团</Button>
        <style jsx>{`
        .button {
          position: relative;
        }
      `}</style>
      </div>)
    }
  }

  buyButtonCallBack = async (typeId, groupId) => {
    if (groupId) {
      let payInfo = await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}`)
      wxPayController.payInit(payInfo)
    } else {
      let payInfo = await AxiosUtil.get(`/api/study-card/buy/${typeId}`)
      wxPayController.payInit(payInfo)
    }
  }

  buyMyGroup = (typeId) => {
    if (this.state.myGroupingId == null) {
      let currentTypeSelect = typeId || 0
      this.setState({
        currentTypeSelect: currentTypeSelect,
        currentJoinInfo: {},
        showPop: true
      })
    } else {
      Alert({
        content: '您正在拼团，无法重新参团，拼团成功后会通知您哦'
      })
    }
  }

  buyOtherGroup = (ele) => {
    console.log(ele)
    if (this.state.myGroupingId == null) {
      this.setState({
        currentTypeSelect: 0,
        currentJoinInfo: ele,
        showPop: true
      })
    } else {
      Alert({
        content: '您正在拼团，无法重新参团，拼团成功后会通知您哦'
      })
    }
  }

  cancelCallBack () {
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
        <div className='right' onClick={() => { this.buyMyGroup() }}>
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
          <div className='more-info' />
          {this.renderFooter()}
        </div>
        {this.state.showPop && <BuyPop
          defaultActiveKey={this.state.currentTypeSelect}
          buyButtonCallBack={this.buyButtonCallBack}
          joinInfo={this.state.currentJoinInfo}
          cancelCallBack={this.cancelCallBack}
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
