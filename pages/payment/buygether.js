import React from 'react'// 库
import Button from '../../xz-components/button'
import Layout from '../../components/layout'// container
import AxiosUtil from '../../util/axios'
import WxShare from '../../xz-components/newWxShare'
import wxPayController from '../../util/wxPayController2'// 工具类
import BuyPop from '../../containers/buygether/buypop'
import Triangle from '../../containers/buygether/poptag'
import Scrolling from '../../containers/buygether/scrolling'
import Fixfooter from '../../xz-components/fixfooter'
import ToolsUtil from '../../util/tools'
import {Alert} from '../../xz-components/alert'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import MoreLine from '../../xz-components/moreLine'
import staticContent from '../../containers/buygether/staticContent'
import GroupCard from '../../containers/buygether/groupcard'

// 介绍页
export default class extends React.Component {
  groupLength = 4 // 列表长度
  changeInterval = 4000 // 切换间隔
  nickname // 分享昵称
  headimgurl // 分享头像

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
    this.goRouter = this.goRouter.bind(this)
    this.renderPop = this.renderPop.bind(this)
    this.refreshGroup = this.refreshGroup.bind(this)
  }

  componentDidMount = async () => {
    await this.updateInfo()
    // 分享跳转进入的时候 判定弹出购买框
    this.joinGroupFromShare()
  }

  updateInfo = async () => {
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
    this.state.wxConfig.init().then(() => {
      _this.setShare()
    })
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
      link: 'http://wx.xiaozao.org/abilitycollege/main',
      imgUrl: 'http://wx.xiaozao.org/static/img/abilitycollege/shareicon.png'
    }
    if (this.state.myGroupingId) {
      let nickname = encodeURI(encodeURI(this.nickname))
      let headimgurl = encodeURI(this.headimgurl)
      shareProp.title = this.nickname + shareProp.title
      shareProp.link += `?groupId=${this.state.myGroupingId}&headimgurl=${headimgurl}&nickname=${nickname}&category=invite`
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
            button={<Button style={this.buttonStyle} onClick={() => { this.goRouter('/abilitycollege/coupon') }}>邀好友，得能力卡</Button>} />)
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

  goRouter (router) {
    location.href = router
  }

  renderCoupon () {
    let {couponInfo} = this.state
    if (couponInfo) {
      let couponType
      switch (couponInfo.name) {
        case '通用券':
          couponType = 0
          break
        case '闺蜜券':
          couponType = 1
          break
        case '基友券':
          couponType = 2
          break
        case '校友券':
          couponType = 3
          break
      }
      let {nickname} = couponInfo
      return (<div className='div-with-bottom'>
        {this.renderTitle('我获得的优惠券')}
        <img onClick={() => { this.buyMyGroup() }} src={`/static/img/buygether/coupon_card_${couponType}.png`} />
        <p>* {nickname} 赠送，报名后你的好友 {nickname} 将免费获得一张能力卡</p>
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

  buyButtonCallBack = async (typeId, groupId) => {
    try {
      let _this = this
      let payInfo
      if (groupId) {
        payInfo = await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}`)
      } else {
        payInfo = await AxiosUtil.get(`/api/study-card/buy/${typeId}`)
      }
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
            await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/${typeId}`)
          } catch (e) {
            // 如果订单已经消失。跳转
            if (e.status === 10001 || e.status === 10002) {
              Alert({
                content: '您已拼团成功！现在每成功分享一位好友，都能免费得到成就卡！',
                okText: '去看看',
                ok: () => location.href = '/abilitycollege/coupon'
              })
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
          onClick={() => { this.goRouter('https://static.meiqia.com/dist/standalone.html?_=t&eid=63917&agentid=ed8f6b7c96fc339a6fcd6f8985624f82)') }}>
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

  renderMoreQA () {
    if (this.state.otherGroup !== undefined) {
      let moreStyle = {
        marginTop: '10px'
      }
      let arr = staticContent.map((ele, index) => {
        return (<div key={index} className='question'>
          <MoreLine style={moreStyle} title={ele.question} content={ele.content} />
          <style jsx>{`
            .question {
              color: #646464;
              text-align: left;
              margin: 10px auto 15px auto;
            }
          `}</style>
        </div>)
      })
      return (<div className='more-div'>
        <div className='more-info-title'>
          <span>小灶能力学院Q&A</span>
        </div>
        {arr}
        <style jsx>{`
        .more-div {
          font-size: 14px;
          padding: 4px;
        }
         .more-info-title{
            height: 1px;
            border-top: 3px dotted #e1e4f0;
            text-align: center;
            margin: 40px 0px 18px 0px !important;
          }
          .more-info-title span{
            background-color: #f0f2f6;
            font-size: 18px;
            position: relative;
            top: -18px;
            padding: 0 10px;
          }
      `}</style>
      </div>)
    }
  }

  render () {
    return (
      <Layout>
        <div className='buy-card-page'>
          <img className='bg-img1' src={'/static/img/buygether/buyBg_1.jpeg'} />
          <div>{this.renderAllGroupView()}</div>
          <div className='card-div'>
            {this.renderMyGroup()}
            {this.renderCoupon()}
            {this.renderOtherGroup()}
          </div>
          <div className='buy-button'>
            {this.renderBuyButton()}
          </div>
          <div className='more-info'>
            {this.renderMoreQA()}
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
          .bg-img1 {
            width: 100%;
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
