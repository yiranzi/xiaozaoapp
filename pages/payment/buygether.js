import React from 'react'// 库
import Button from '../../xz-components/button'
import Layout from '../../components/layout'// container
import AxiosUtil from '../../util/axios'
import WxShare from '../../xz-components/newWxShare'
import wxPayController from '../../util/wxPay'// 工具类
import BuyPop from '../../containers/buygether/buypop'
import Triangle from '../../containers/buygether/poptag'
import Scrolling from '../../containers/buygether/scrolling'
import Fixfooter from '../../xz-components/fixfooter'
import ToolsUtil from '../../util/tools'
import {Alert} from '../../xz-components/alert'
import {Confirm} from '/xz-components/confirm'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import GroupCard from '../../containers/buygether/groupcard'
import Router from 'next/router'
import Link from 'next/link'

// 介绍页
export default class extends React.Component {
  groupLength = 4 // 列表长度
  changeInterval = 4000 // 切换间隔
  nickname // 分享昵称
  headimgurl // 分享头像
  littleShareUrl

  buttonStyle = {
    backgroundColor: '#c41616',
    color: 'white',
    fontSize: '14px'
  }

  constructor (props) {
    super(props)
    this.state = {
      wxConfig: new WxShare(), // 分享初始化
      showPop: false, // 购买弹窗
      myGroup: [], // 我的团信息
      otherGroup: undefined, // 其他团信息
      studyCardPackageList: [], // 套餐列表
      couponInfo: undefined, // 优惠券信息（我自己持有的）
      myGroupingId: undefined, // 我正在开团的id
      currentJoinInfo: {}, // 参团信息
      currentTypeSelect: 0 // // 当前选择的拼团套餐。用于购买
    }
    this.buyMyGroup = this.buyMyGroup.bind(this)
    this.buyOtherGroup = this.buyOtherGroup.bind(this)
    this.buyButtonCallBack = this.buyButtonCallBack.bind(this)
    this.cancelCallBack = this.cancelCallBack.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
    this.renderPop = this.renderPop.bind(this)
    this.refreshGroup = this.refreshGroup.bind(this)
  }

  componentDidMount = async () => {
    await this.updateInfo()
    // 分享跳转进入的时候 判定弹出购买框
    this.joinGroupFromShare()
    alert(location.href)
  }

  updateInfo = async (type) => {
    let buyDetail = await AxiosUtil.get('/api/study-card/buyDetail')
    let {myGroup, otherGroup, studyCardPackageList, studyCardCouponInvite} = buyDetail
    this.setState({
      myGroup: myGroup,
      otherGroup: otherGroup,
      studyCardPackageList: studyCardPackageList,
      couponInfo: studyCardCouponInvite
    }, this.setRenderOtherGroupInterval)
    // 设置我的团状态
    await this.setGroupStatus(myGroup)
    // 调用分享函数
    let _this = this
    if (type) {
      await this.state.wxConfig.init()
      await _this.setShare()
    } else {
      this.state.wxConfig.init().then(() => {
        _this.setShare()
      })
    }
  }

  // 根据信息设置开团状态
  setGroupStatus = async (myGroup) => {
    let myGroupingId = null
    if (myGroup && myGroup.length > 0) {
      // 查找 正在开团？
      let result = myGroup.find((ele, index) => {
        return (ele.status === 0)
      })
      if (result) {
        // 1 保存分享信息
        let userInfo = await AxiosUtil.get('/api/user')
        let {nickname, headimgurl} = userInfo
        this.nickname = nickname
        this.headimgurl = headimgurl
        // 1 设置正在团 状态
        myGroupingId = result.groupId
      }
    }
    this.setState({
      myGroupingId: myGroupingId
    })
  }

  setShare () {
    let shareProp = {
      title: '邀你一起拼团能力课程，低至3折',
      desc: '小灶能力学院限时拼团特惠，PPT课、商业英语课、结构化逻辑课、四大求职通关课等26大课程3大类能力等你拥有。',
      link: 'https://rcwx.review.xiaozao.org/payment/buygether',
      imgUrl: 'https://wx.xiaozao.org/static/img/abilitycollege/shareicon.png'
    }
    if (this.state.myGroupingId) {
      let nickname = encodeURI(encodeURI(this.nickname))
      let headimgurl = encodeURI(this.headimgurl)
      shareProp.title = this.nickname + shareProp.title
      let addParam = `?groupId=${this.state.myGroupingId}&headimgurl=${headimgurl}&nickname=${nickname}&category=invite`
      // let addParam = `?groupId=${this.state.myGroupingId}`
      shareProp.link += addParam
      this.littleShareUrl = addParam
    }
    this.state.wxConfig.setShareConfig(shareProp)
  }

  // 根据链接 弹出购买框
  joinGroupFromShare () {
    let groupId = ToolsUtil.getQueryString('groupId')
    if (groupId) {
      let nickname = ToolsUtil.getQueryString('nickname')
      let headimgurl = ToolsUtil.getQueryString('headimgurl')
      nickname = decodeURI(decodeURI(nickname))
      headimgurl = decodeURI(headimgurl)
      let currentJoinInfo = {
        nickname: nickname,
        headimgurl: headimgurl,
        groupId: groupId
      }
      this.buyOtherGroup(currentJoinInfo)
    }
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
    let popArr = otherGroup.splice(0, this.groupLength)
    otherGroup = otherGroup.concat(popArr)
    this.setState({
      otherGroup: otherGroup
    })
  }

  renderAllGroupView () {
    let {studyCardPackageList} = this.state
    let count = 0
    studyCardPackageList.forEach((ele, index) => {
      count += ele.buyCount
    })
    return (<div className='show-card'>
      <div className='line'>
        <p>能力卡用于兑换2018课表课程</p>
        <p>已有{count}人获得</p>
      </div>
      <div className='card-line'>
        {studyCardPackageList.map((ele, index) => {
          return (
            <div key={index} onClick={() => { this.buyMyGroup(index) }}>
              <img src={`/static/img/buygether/card_${index + 1}0.png`} />
            </div>)
        })}
        {(studyCardPackageList && studyCardPackageList.length > 0) && <div><img src={`/static/img/buygether/card_00.png`} /></div>}
      </div>
      <div className='text-line'>
        <Scrolling interval={6000} />
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
          position: absolute;
          bottom: 60px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }
        .card-line img {
          width: 100%;
          max-width: 80px;
        }
        .text-line {
          position: absolute;
          bottom: 10px;
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
      let arr = myGroup.map((ele, index) => {
        // 要根据这个团的不同情况进行渲染
        if (ele.status === 1) {
          // 历史团
          return (<GroupCard key={ele.groupId} groupInfo={ele}
            button={<Button style={this.buttonStyle} onClick={() => { this.renderPopAssistant() }}>添加小助手</Button>} />)
        } else {
          return (<GroupCard key={ele.groupId} groupInfo={ele}
            button={<Button style={this.buttonStyle} onClick={() => { this.renderPop(ele) }}>立即邀请好友</Button>} />)
        }
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

  renderPop (ele) {
    let leftHour = 23
    let leftMinute = 59
    if (ele) {
      ({leftHour, leftMinute} = ele)
    }
    let defaultStyle = {
      backgroundColor: 'rgba(0, 10, 49, 0.5)'
    }
    let randomSecond = parseInt(60 * Math.random())
    let dom = <div>
      <img className='img-style' src='/static/img/buygether/share-arrow.png' />
      <p className='title'>离成团只剩{leftHour}时{leftMinute}分{randomSecond}秒</p>
      <p className='title'>还差<strong className='strong'> 1 </strong>人，赶紧邀请好友来拼团吧~</p>
      <p className='title'>拼团人满后可拿成就卡</p>
      <style jsx>{`
      .title {
        font-size:20px;
        font-weight: bold;
      }
      .strong {
        font-size:28px;
        font-weight: bold;
        color: red;
      }
      .img-style {
        position: absolute;
        top: 0;
        right: 0;
        width: 150px;
        height: 300px;
      }
    `}</style>
    </div>
    let prop = {
      innerDiv: dom,
      style: defaultStyle
    }
    ModalBoxPopFunc({...prop})
  }

  renderPopAssistant (ele) {
    let defaultStyle = {
      backgroundColor: 'rgba(0, 10, 49, 0.5)'
    }
    let dom = <div>
      <p className='title'>参团成功！</p>
      <p className='title'>请务必添加小助手，关注课程进度</p>
      <p className='title'>添加小助手</p>
      <img className='img-style' src='/static/img/buygether/codeImg.jpg' />
      <style jsx>{`
      .title {
        font-size:20px;
        font-weight: bold;
      }
      .strong {
        font-size:28px;
        font-weight: bold;
        color: red;
      }
      .img-style {
        // position: absolute;
        // top: 0;
        // right: 0;
        // width: 150px;
        // height: 300px;
      }
    `}</style>
    </div>
    let prop = {
      innerDiv: dom,
      style: defaultStyle
    }
    ModalBoxPopFunc({...prop})
  }

  renderOtherGroup () {
    let {otherGroup} = this.state
    if (otherGroup !== undefined) {
      const perLength = this.groupLength
      let groupingArr = []
      let buttonStyle = {
        backgroundColor: '#F9F9F9',
        color: '#c41616',
        border: '1px solid #c41616',
        fontSize: '14px',
        width: '60px'
      }
      if (otherGroup.length > perLength) {
        // 如果人数多于4个，取出4个渲染
        groupingArr = otherGroup.slice(0, perLength).map((ele, index) => {
          return (<GroupCard key={ele.groupId} groupInfo={ele}
            button={<Button style={buttonStyle} onClick={() => { this.buyOtherGroup(ele) }}>参团</Button>} />)
        })
      } else if (otherGroup.length > 0) {
        // 如果人数不足4个
        groupingArr = otherGroup.map((ele, index) => {
          return (<GroupCard key={ele.groupId} groupInfo={ele}
            button={<Button style={buttonStyle} onClick={() => { this.buyOtherGroup(ele) }}>参团</Button>} />)
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
            {/*border-bottom: 1px solid #e5e5e5;*/}
          }
        `}</style>
      </div>)
    }
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
            font-size: 20px;
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

  littleBuy = async (typeId, groupId, payInfo) => {
    // 1 调用小程序支付
    wxPayController.payInit(payInfo)
    // 2 显示弹窗 等待完成 确保这个弹窗还有
    this.openConfirm(typeId, groupId, payInfo)
  }

  // 小程序打开弹窗
  openConfirm (typeId, groupId, payInfo) {
    const _this = this
    Confirm({
      content: '付款成功？',
      okText: '成功',
      cancelText: '失败',
      ok: () => { _this.afterLittlePay(typeId, groupId) },
      cancel: () => {
        Alert({ content: '微信添加小助手xiaozao906获得帮助' })
      }
    })
  }

  afterLittlePay = async (typeId, groupId) => {
    // 关闭弹窗
    this.setState({
      showPop: false
    })
    let currentGroupStatus = this.state.myGroupingId
    // 刷新数据
    await this.updateInfo(true)
    // 判定是否需要跳转
    if (groupId) {
      alert('小程序参团成功')
      try {
        await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}/true`)
      } catch (e) {
        // 如果订单已经消失。跳转
        if (e.status === 10001 || e.status === 10002) {
          this.renderPopAssistant()
        }
      }
    } else if (currentGroupStatus === null) {
      alert('小程序开团成功')
      // 如果之前没有团。现在有团了
      if (this.state.myGroupingId) {
        // 弹窗
        this.renderPop()
        let littleShareUrl = this.littleShareUrl
        // 如果小程序上线开团成功。修改url
        if (littleShareUrl) {
          window.history.replaceState(null, '', location.href + this.littleShareUrl)
        }
      }
    }
  }

  wxBuy = async (typeId, groupId, payInfo) => {
    let _this = this
    wxPayController.payInit(payInfo).then(async function () {
      // 关闭弹窗
      _this.setState({
        showPop: false
      })
      let currentGroupStatus = _this.state.myGroupingId
      // 刷新数据
      await _this.updateInfo()
      // 判定是否需要跳转
      if (groupId) {
        try {
          await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}/false`)
        } catch (e) {
          // 如果订单已经消失。跳转
          if (e.status === 10001 || e.status === 10002) {
            _this.renderPopAssistant()
          }
        }
      } else if (currentGroupStatus === null) {
        // 如果之前没有团。
        if (_this.state.myGroupingId) {
          // 弹窗
          _this.renderPop()
        }
      }
    })
  }

  buyButtonCallBack = async (typeId, groupId) => {
    try {
      let payInfo
      // 判断是否是小程序
      let isMiniProgram = true
      if (window.__wxjs_environment === 'miniprogram') {
        isMiniProgram = true
      } else {
        isMiniProgram = false
      }
      if (groupId) {
        payInfo = await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}/${isMiniProgram}`)
      } else {
        payInfo = await AxiosUtil.get(`/api/study-card/buy/${typeId}/${isMiniProgram}`)
      }
      if (window.__wxjs_environment === 'miniprogram') {
        this.littleBuy(typeId, groupId, payInfo)
      } else {
        this.wxBuy(typeId, groupId, payInfo)
      }
    } catch (e) {
      Alert({
        content: e.message
      })
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
        content: '您正在拼团，无法同时参加2个团哦，快邀请好友帮你完成拼团吧！'
      })
    }
  }

  buyOtherGroup = (ele) => {
    if (this.state.myGroupingId == null) {
      this.setState({
        currentTypeSelect: 0,
        currentJoinInfo: ele,
        showPop: true
      })
    } else {
      Alert({
        content: '您正在拼团，无法同时参加2个团哦，快邀请好友帮你完成拼团吧！'
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
        <div className='left'
          onClick={() => { location.href('https://static.meiqia.com/dist/standalone.html?_=t&eid=63917&agentid=ed8f6b7c96fc339a6fcd6f8985624f82)') }}>
          <img src='/static/img/buygether/ask.png' />
          <span>在线咨询</span>
        </div>
        <div className='right' onClick={() => { this.buyMyGroup() }}>
          <div className='single-price'>
            <span>￥4999</span>
            <p>原价购买</p>
          </div>
          <div className='group-price'>
            <img style={{height: '70%'}}src='/static/img/buygether/buy.png' />
            <div className='price-inner'>
              <span>￥3999</span>
              <p>特惠开团</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .price-inner {
          display: flex;
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
        }
        .right span {
          font-size: 16px;
        }
        .right p {
          font-size: 14px;
        }
        .single-price {
          flex: 1;
          height: 100%;
          line-height: 25px;
          background-color: green;
        }
        .single-price span {
          text-decoration:line-through
        }
        .group-price {
          background-color: #c41616;
          flex: 1;
          height: 100%;
          line-height: 25px;
          display: flex;

        }
        .group-price span{
          width: 100%;
        }
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
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .right {
          flex: 3;
          display: flex;
          justify-content: space-around;
        }
        .fix-foot img{
          width: 25px;
          margin-right: 5px;
        }
      `}</style>
    </Fixfooter>)
  }

  renderCourseInfo () {
    return (<div className='div-with-bottom'>
      {this.renderTitle('课程详情')}
      <img src={'/static/img/buygether/intro_1.png'} />
      <img src={'/static/img/buygether/intro_2.png'} />
      <style jsx>{`
        .div-with-bottom {
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
        }
        .div-with-bottom img {
          width: 100%;
        }
      `}</style>
    </div>)
  }

  renderMoreCourse () {
    return (
      <div className='fix-link'>
        <Link href={'/abilitycollege/main'}>
          <a className='content'>更多课程</a>
        </Link>
        <style jsx>{`
        .fix-link{
          position: fixed;
          bottom: 70px;
          left: 0;
          width: 100px;
          height: 20px;
          line-height: 20px;
          background-color: blue;
        }
        .content {
          font-size: 14px;
          color: white;
        }
      `}</style>
      </div>
    )
  }

  render () {
    return (
      <Layout>
        <div className='buy-card-page'>
          <div className='top-banner'>
            <img className='bg-img1' src={'/static/img/buygether/buyBg_1.jpeg'} />
            <div className='text-line'>
              <Scrolling interval={6000} />
            </div>
          </div>
          <div className='card-div'>
            {this.renderMyGroup()}
            {this.renderOtherGroup()}
            {this.renderCourseInfo()}
            {this.renderMoreCourse()}
          </div>
          {this.renderFooter()}
        </div>
        {this.state.showPop && <BuyPop
          defaultActiveKey={this.state.currentTypeSelect}
          buyButtonCallBack={this.buyButtonCallBack}
          joinInfo={this.state.currentJoinInfo}
          cancelCallBack={this.cancelCallBack}
          couponInfo={this.state.couponInfo}
          dataInfo={this.state.studyCardPackageList} />}
        <style jsx>{`
          .buy-card-page {
            padding-bottom: 80px;
            width: 100%;
            font-size: 0px;
            text-align: center;
            color: #2f3138;
            background-color: #f0f2f6;
          }
          .buy-card-page *{
            margin: 0px;
            padidng: 0;
          }
          .top-banner {
            position: relative;
          }
          .bg-img1 {
            width: 100%;
          }
          .text-line {
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            z-index: 10;
            background-color: white;
            color: black;
          }
          .buy-button {
            padding: 5px;
          }
          .card-div {
            padding: 0 10px;
            background-color: #F9F9F9;
            {/*border-bottom: 1px solid #e5e5e5;*/}
            {/*margin-bottom: -2px;*/}
          }
          .more-info {
            background-color: #f0f2f6;
          }
        `}</style>
      </Layout>
    )
  }
}
