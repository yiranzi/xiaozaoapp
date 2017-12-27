import React from 'react'// 库
import Button from '../../xz-components/button'
import Layout from '../../components/layout'// container
import AxiosUtil from '../../util/axios'
import WxShare from '../../xz-components/newWxShare'
import wxPay from '../../util/wxPay'// 工具类
import BuyPop from '../../containers/buygether/buypop'
import Triangle from '../../containers/buygether/poptag'
import Scrolling from '../../containers/buygether/scrolling'
import Fixfooter from '../../xz-components/fixfooter'
import ToolsUtil from '../../util/tools'
import {Alert} from '../../xz-components/alert'
import {Confirm} from '/xz-components/confirm'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import GroupCard from '../../containers/buygether/groupcard'
import Link from 'next/link'
import {HelpPopFunc} from '../../containers/buygether/helpPopFunc'
import Slider from 'react-slick'
import {
  LoadMore
} from 'react-weui'

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

  settings = {
    className: 'center slider-banner',
    mobileFirst: true,
    arrows: false,
    centerMode: true,
    infinite: true,
    centerPadding: '15px',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    adaptiveHeight: false,
    touchMove: true,
    touchThreshold: 999999999
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
      currentTypeSelect: 0, // // 当前选择的拼团套餐。用于购买
      hideTest: true,
      showHelpButtonPop: false,
      environment: undefined,
      bannerArray: undefined,
      topFixed: false
    }
    this.buyMyGroup = this.buyMyGroup.bind(this)
    this.buyOtherGroup = this.buyOtherGroup.bind(this)
    this.buyButtonCallBack = this.buyButtonCallBack.bind(this)
    this.cancelCallBack = this.cancelCallBack.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
    this.renderPop = this.renderPop.bind(this)
    this.refreshGroup = this.refreshGroup.bind(this)
    this.setHelpButtonPop = this.setHelpButtonPop.bind(this)
    this.setScroll = this.setScroll.bind(this)
  }

  componentDidMount = async () => {
    await this.updateInfo()
    // 分享跳转进入的时候 判定弹出购买框
    this.joinGroupFromShare()
    this.setLittle()
    this.setHelpButtonPop()
    this.bannerAxios()
    this.setScroll()
  }

  setScroll () {
    let _this = this
    window.addEventListener('scroll', function (e) {
      let a = _this.refs.topFixedPos.offsetTop
      if (window.scrollY > a && !_this.state.topFixed) {
        _this.setState({
          topFixed: true
        })
      }
      if (window.scrollY < a && _this.state.topFixed) {
        _this.setState({
          topFixed: false
        })
      }
    })
  }

  bannerAxios = async () => {
    let bannerArray = []
    let a = await AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/13/1`)
    bannerArray.push(a)
    let b = await AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/14/1`)
    bannerArray.push(b)
    let c = await AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/15/1`)
    bannerArray.push(c)
    this.setState({
      bannerArray: bannerArray
    })
  }

  setLittle () {
    if (window.__wxjs_environment === 'miniprogram') {
      this.setState({
        environment: 'little'
      })
    }
  }

  setHelpButtonPop () {
    const popWaitTime = 3000
    window.setTimeout(() => {
      this.setState({
        showHelpButtonPop: true
      })
    }, popWaitTime)
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
      title: '邀请你和我一起参加线上学徒项目',
      desc: '一次性搞定探索职业兴趣、掌握企业必备实战技能、增加一次高含金量的实习',
      link: 'https://wx.xiaozao.org/payment/buygether',
      imgUrl: 'https://wx.xiaozao.org/static/img/buygether/shareImg.png'
    }
    if (this.state.myGroupingId) {
      let nickname = encodeURI(encodeURI(this.nickname))
      let headimgurl = encodeURI(this.headimgurl)
      shareProp.title = this.nickname + shareProp.title
      let addParam = `?groupId=${this.state.myGroupingId}&headimgurl=${headimgurl}&nickname=${nickname}&category=invite`
      // let addParam = `?groupId=${this.state.myGroupingId}`
      shareProp.link += addParam
      this.littleShareUrl = addParam
      // 如果小程序上线开团成功。修改url
      if (this.littleShareUrl && this.state.environment === 'little') {
        window.history.replaceState(null, '', location.href + this.littleShareUrl)
      }
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
            button={<Button style={this.buttonStyle} onClick={() => { HelpPopFunc() }}>添加小助手</Button>} />)
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
    let dom = <div className='main-content'>
      <img className='img-style' src='/static/img/buygether/shareArrow.png' />
      <h2 className='course-title'>《线上学徒项目-商业分析方向》</h2>
      <p className='title'>只需6周！带你获得能进滴滴、阿里、百度、四大的能力！</p>
      <p className='time-div'>剩余<span className='time-content'>{leftHour}时{leftMinute}分{randomSecond}秒</span>结束</p>
      <p className='title'>还差<strong className='strong'> 1 </strong>人，邀请好友拼团</p>
      <p className='title'>每人可减1000元哦！</p>
      <style jsx>{`
      .main-content {
        position: relative;
        top: -90px;
        background-color: #3e84e0;
        border-radius: 30px;
        padding: 10px;
        width: 80%;
      }
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .course-title {
        font-size: 20px;
      }
      .strong {
        font-size:28px;
        font-weight: bold;
        color: red;
      }
      .img-style {
        position: absolute;
        top: -100px;
        right: 50px;
        width: 100px;
        height: 100px;
      }
      .time-div {
        margin: 10px auto;
      }
      .time-content{
        margin: auto 5px;
        border-radius: 30px;
        height: 30px;
        line-height: 30px;
        background-color: white;
        color: red;
        padding: 5px 15px;
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
          }
        `}</style>
      </div>
    )
  }

  littleBuy = async (typeId, groupId, payInfo) => {
    // 1 调用小程序支付
    wxPay.payInit(payInfo)
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
        this.updateInfo(true)
        Alert({ content: '如果付款失败，微信添加小助手xiaozao906获得帮助' })
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
      try {
        await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}/true`)
      } catch (e) {
        // 如果订单已经消失。跳转
        if (e.status === 10001 || e.status === 10002) {
          HelpPopFunc()
        }
      }
    } else if (currentGroupStatus === null) {
      // 如果之前没有团。现在有团了
      if (this.state.myGroupingId) {
        // 弹窗
        this.renderPop()
      }
    }
  }

  wxBuy = async (typeId, groupId, payInfo) => {
    let _this = this
    wxPay.payInit(payInfo).then(async function () {
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
            HelpPopFunc()
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
      if (this.state.environment === 'little') {
        isMiniProgram = true
      } else {
        isMiniProgram = false
      }
      if (groupId) {
        payInfo = await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}/${isMiniProgram}`)
      } else {
        payInfo = await AxiosUtil.get(`/api/study-card/buy/${typeId}/${isMiniProgram}`)
      }
      if (this.state.environment === 'little') {
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
          onClick={() => { HelpPopFunc() }}>
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
          background-color: #ffc581;
          text-align: center;
        }
        .group-price {
          background-color: #ef4645;
          flex: 1;
          height: 100%;
          line-height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .group-price div {
          width: 70px;
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
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .left span {
          color: black;
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

  renderNavBar () {
    let fixed = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100%',
      zIndex: '99',
      // paddingLeft: '15px',
      // paddingRight: '15px',
      boxSizing: 'border-box'
    }
    let inTxt = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      zIndex: '99',
      boxSizing: 'border-box'
    }
    let style = this.state.topFixed ? fixed : inTxt
    return (
      <div style={style}>
        <div className='nav-bar'>
          <a href='#intro1'>引言</a>
          <a href='#intro2'>概述</a>
          <a href='#process'>项目安排</a>
          <a href='#get'>收获</a>
          <a href='#team'>项目团队</a>
          <a href='#feedback'>学员反馈</a>
          <a href='#pay'>报名</a>
        </div>
        <style>{`
          .nav-bar {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            background-color: #F9F9F9;
            padding: 3px;
            // margin: 10px auto 10px auto;
            height: 50px;
            line-height: 50px;
            // margin: auto -15px;
            overflow: hidden;
          }
          a {
            color: black;
            font-size: 12px;
          }
        `}</style>
      </div>
    )
  }

  renderDivBanner (index) {
    const {bannerArray} = this.state
    if (!bannerArray || bannerArray.length === 0) {
      return
    }
    let bannerImgArr = bannerArray[index]
    if (bannerImgArr && bannerImgArr.length > 0) {
      const bannerElements = bannerImgArr.map(function (item, index) {
        return (<div key={index}>
          <a className='block-a' href={item.url ? item.url : 'javascript:;'}>
            <img className='banner-img' src={item.img} /></a>
        </div>)
      })
      return (
        <div style={{margin: 'auto 15px auto 15px'}}>
          <Slider {...this.settings}>
            {bannerElements}
          </Slider>
          <style global jsx>{`
          .slider-banner {
            margin: 0 -15px;
          }
          .slider-banner .block-a {
            display: inline-block;
            padding: 0 5px;
          }
          .slider-banner .banner-img {
            width: 100%;
          }
        `}</style>
        </div>
      )
    } else {
      return (<div style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderCourseInfo () {
    return (<div className='div-with-bottom'>
      {this.renderTitle('课程详情')}
      <div className='intro-div-content'>
        <div id='intro1'>
          <div ref='topFixedPos' style={{height: '56px', position: 'relative'}}>
            {this.renderNavBar()}
          </div>}
          <img src={'/static/img/buygether/intro/intro_0_0.png'} />
          <img src={'/static/img/buygether/intro/intro_0_1.png'} />
          <img src={'/static/img/buygether/intro/intro_0_2.png'} />
          <div id='intro2' style={{height: '56px', backgroundColor: 'white'}} />
        </div>
        <div>
          <img src={'/static/img/buygether/intro/intro_1_1.png'} />
          <div id='process' style={{height: '56px', backgroundColor: 'white'}} />
        </div>
        <div>
          <img src={'/static/img/buygether/intro/intro_2_1.png'} />
          <img src={'/static/img/buygether/intro/intro_2_2.png'} />
          {this.renderDivBanner(0)}
          <div id='get' style={{height: '56px', backgroundColor: 'white'}} />
        </div>
        <div>
          <img src={'/static/img/buygether/intro/intro_3_1.png'} />
          <img src={'/static/img/buygether/intro/intro_3_2.png'} />
          <img src={'/static/img/buygether/intro/intro_3_3.png'} />
          <img src={'/static/img/buygether/intro/intro_3_4.png'} />
          {this.renderDivBanner(1)}
          <img src={'/static/img/buygether/intro/intro_3_5.png'} />
          <div id='team' style={{height: '56px', backgroundColor: 'white'}} />
        </div>
        <div>
          <img src={'/static/img/buygether/intro/intro_4_1.png'} />
          <img src={'/static/img/buygether/intro/intro_4_2.png'} />
          <img src={'/static/img/buygether/intro/intro_4_3.png'} />
          <img src={'/static/img/buygether/intro/intro_4_4.png'} />
          <img src={'/static/img/buygether/intro/intro_4_5.png'} />
          <img src={'/static/img/buygether/intro/intro_4_6.png'} />
          <img src={'/static/img/buygether/intro/intro_4_7.png'} />
          <div id='feedback' style={{height: '56px', backgroundColor: 'white'}} />
        </div>
        <div>
          <img src={'/static/img/buygether/intro/intro_5_1.png'} />
          {this.renderDivBanner(2)}
          <div id='pay' style={{height: '56px', backgroundColor: 'white'}} />
        </div>
        <div>
          <img src={'/static/img/buygether/intro/intro_6_1.png'} />
          <img src={'/static/img/buygether/intro/intro_6_2.png'} />
          <img src={'/static/img/buygether/intro/intro_6_3.png'} />
          <img src={'/static/img/buygether/intro/intro_6_4.png'} />
          <img src={'/static/img/buygether/intro/intro_7_1.png'} />
        </div>
      </div>

      <style jsx>{`
        .div-with-bottom {
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
        }
        .div-with-bottom img {
          width: 100%;
        }
        .intro-div-content {
          margin: auto -15px;
        }
      `}</style>
    </div>)
  }

  renderMoreCourse () {
    return (
      <div className='fix-link'>
        <Link href={this.state.environment === 'little' ? '/abilitycollege/mainx' : '/abilitycollege/main'}>
          <a className='content'>更多课程</a>
        </Link>
        <style jsx>{`
        .fix-link{
          position: fixed;
          bottom: 100px;
          left: -10px;
          width: 100px;
          height: 25px;
          line-height: 25px;
          background-color: #3e84e0;
          z-index: 100;
          border-radius: 30px;
        }
        .content {
          font-size: 14px;
          color: white;
        }
      `}</style>
      </div>
    )
  }

  renderTop () {
    return (
      <div>
        <div className='top-banner'>
          <img className='bg-img1' src={'/static/img/buygether/buyBg_1.png'} />
          <div className='text-line'>
            <Scrolling interval={10000} />
          </div>
        </div>
        {/*<video width='100%' controls>*/}
          {/*<source src='/static/img/buygether/movie.mp4' type='video/mp4' />*/}
        {/*</video>*/}
        <style>{`
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
            height: 30px;
            line-height: 30px;
          }
        `}
        </style>
      </div>
    )
  }

  renderShowHelpButtonPop () {
    let {showHelpButtonPop} = this.state
    let borderStyle = {
      height: '30px',
      lineHeight: '30px',
      borderRadius: '30px',
      left: '0px',
      bottom: '0px',
      backgroundColor: '#3e84e0'
    }
    let style = {}
    if (showHelpButtonPop) {
      style = {
        transform: 'translateX(0px)'
      }
    } else {
      style = {
        transform: 'ttranslateX(-300px)'
      }
    }
    return (
      <div style={style} className='pop-out-div' onClick={() => { HelpPopFunc() }}>
        <Triangle
          triangleStyle={{borderColor: '#3e84e0  transparent transparent #3e84e0'}}
          style={borderStyle}>
          <div className='inner-content'>
            <img src='/static/img/buygether/headImg_help.png' />
            <p>关于课程和分期的问题，我可以帮你解答哦</p>
          </div>
        </Triangle>
        <style>{`
          .pop-out-div {
            position: fixed;
            bottom: 50px;
            left: 0px;
            width: 500px;
            transition: transform 1s;
            z-index: 200;
          }
          .out-container {
            font-size: 16px;
            position: relative;
          }
          .inner-content {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .inner-content img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
        `}</style>
      </div>
    )
  }

  render () {
    return (
      <Layout>
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
        <div className='buy-card-page'>
          {this.renderTop()}
          <div className='card-div'>
            {this.renderMyGroup()}
            {this.renderOtherGroup()}
            {this.renderCourseInfo()}
            {this.renderMoreCourse()}
            {this.renderShowHelpButtonPop()}
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
            padding-bottom: 60px;
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

          .buy-button {
            padding: 5px;
          }
          .card-div {
            padding: 0 15px;
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
