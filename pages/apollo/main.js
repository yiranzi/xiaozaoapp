import React from 'react'// 库
import Button from '../../xz-components/button'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import DateSelector from '../../containers/apollo/DateSelector'// 自定义组件
import Layout from '../../components/layout'// container
import ThemeConfig from '../../config/theme'
import { Confirm } from '../../xz-components/confirm'
import WxShare from '../../xz-components/wxshare'
import AxiosUtil from '../../util/axios'

// 介绍页
export default class extends React.Component {
  todayDayKey
  constructor (props) {
    super(props)
    this.state = {
      todayFinishCount: null,
      headimgList: null,
      allWeek: {},
      currentSelectDay: -1, // 当前选中日
      currentSelectWeek: -1, // 当前选中周
      error: ''
    }
    this.signUp = this.signUp.bind(this)
    this.onChangeWeek = this.onChangeWeek.bind(this)
    this.onChooseDay = this.onChooseDay.bind(this)
    this.setShare = this.setShare.bind(this)
    this.onSignSuccess = this.onSignSuccess.bind(this)
    this.setModalPop = this.setModalPop.bind(this)
  }

  componentDidMount = async () => {
    this.getDetail()
  }

  // 拉取数据
  getDetail = async function () {
    try {
      let getDetail = await AxiosUtil.get('/api/apollo/getDetail')
      let {week, dayOfYear, apolloWeekDTOList, clockCount} = getDetail
      let apolloWeekDayDTOList = apolloWeekDTOList[week].apolloWeekDayDTOList
      let currentDay = apolloWeekDayDTOList.findIndex((ele, index) => {
        return (ele.dayOfYear === dayOfYear)
      })

      this.setState({
        allWeek: apolloWeekDTOList, // 总日期
        signTotalDay: clockCount, // 总投递次数
        currentSelectDay: currentDay, // 当前选中日
        currentSelectWeek: week // 当前选中周
      })
      this.todayDayKey = dayOfYear // 设置今天的日期标识常量
      this.setToday(apolloWeekDayDTOList[currentDay])
    } catch (e) {
      let err = {}
      if (!e.message) {
        err.message = e
      } else {
        err = e
      }
      this.setState({
        error: err
      })
    }
  }

  setToday = async function (item) {
    if (item.start) {
      let getByDay = await AxiosUtil.get(`/api/apollo/getByDay/?day=${item.dayOfYear}`)
      let {totalCount, headimgUrlList} = getByDay
      this.setState({
        todayFinishCount: totalCount,
        headimgList: headimgUrlList
      })
    } else {
      this.setState({
        todayFinishCount: 0,
        headimgList: []
      })
    }
  }

  // 发起打卡
  signUp = async function () {
    // 增加居中样式
    let centerStyle = {
      textAlign: 'center'
    }
    let content = <div style={centerStyle}>
      <p>小伙伴，您今日尚未投递职位哦~
        <br />
        当天至少完成一次投递，才可打卡
      </p>
    </div>
    try {
      await AxiosUtil.get('/api/apollo/complete')
      this.onSignSuccess()
    } catch (e) {
      Confirm({
        title: '小伙伴，您今日尚未投递职位哦~',
        content: content,
        okText: '去投递',
        cancelText: '残忍拒绝',
        ok: () => { this.goRouter('/') }
      })
    }
    // 刷新
    this.getDetail()
  }

  // 设置分享
  setShare () {
    let prop = {
      title: '我正在参加 - 找实习有投必反馈的【阿波罗实习计划】...',
      desc: '立即申请加入阿波罗实习计划',
      link: 'http://wx.xiaozao.org/redirect?url=https://detail.youzan.com/show/goods?alias=26winu6syk8pd&v2/goods/26winu6syk8pd',
      imgUrl: 'http://wx.xiaozao.org/static/img/apollo/share-icon.jpg',
      success: function () {
        AxiosUtil.get(`/api/interview/getWXConfig?url=onApolloMain`)
      }
    }
    return (<WxShare {...prop} />)
  }

  // 成功弹窗弹窗
  onSignSuccess (type) {
    let content
    if (type === 1) {
      content = '很棒！完成今日打卡，你获得了1次推荐机会，分享链接邀请你的朋友加入【阿波罗实习计划】吧！(当日有效)'
    } else {
      content = '很棒！完成今日打卡，你获得了1次推荐机会，分享链接邀请你的朋友加入【阿波罗实习计划】吧！(当日有效)'
    }
    Confirm({
      title: '恭喜你完成打卡',
      content: content,
      okText: '分享',
      cancelText: '返回',
      ok: () => { this.setModalPop() }
    })
  }

  // 成功弹窗弹窗
  setModalPop () {
    let defaultStyle = {
      backgroundColor: 'rgba(0, 10, 49, 0.5)'
    }
    let imgStyle = {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '150px',
      height: '300px'
    }
    let innerContent = {
      position: 'absolute',
      top: '288px',
      right: '10px'
    }
    let dom = <div>
      <img style={imgStyle} src='/static/img/apollo/shareArrow.png' />
      <p style={innerContent}>点击右上角分享给你的朋友吧</p>
    </div>
    let prop = {
      innerDiv: dom,
      style: defaultStyle
    }
    ModalBoxPopFunc({...prop})
  }

  // 更改周
  onChangeWeek (type) {
    console.log(type)
    let week = this.state.currentSelectWeek
    if (type === 'left') {
      week--
    } else {
      week = this.state.currentSelectWeek
      week++
    }
    if (week >= 0) {
      this.setState({
        currentSelectWeek: week
      }, () => {
        let week = this.state.allWeek[this.state.currentSelectWeek].apolloWeekDayDTOList
        let day = week[this.state.currentSelectDay]
        this.setToday(day)
      })
    }
  }

  // 选中某一天
  onChooseDay (index) {
    // 设置日期
    this.setState({
      currentSelectDay: index
    }, () => {
      let week = this.state.allWeek[this.state.currentSelectWeek].apolloWeekDayDTOList
      let day = week[this.state.currentSelectDay]
      this.setToday(day)
    })
    // 查看当日完成人数
  }

  // 路由跳转
  goRouter (goRouter) {
    location.href = goRouter
  }

  render () {
    const {error} = this.state
    if (this.state.allWeek.length > 0) {
      let week = this.state.allWeek[this.state.currentSelectWeek].apolloWeekDayDTOList
      return (
        <Layout error={error}>
          {this.setShare()}
          <div className='out'>
            <div className='page'>
              <div className='top'>
                <img className='top-bg' src='/static/img/apollo/bg1.jpg' />
                <div className='top-content'>
                  <div className='header'>
                    <p>阿波罗实习打卡 您已成功打卡 {this.state.signTotalDay} 天</p>
                  </div>
                  <DateSelector
                    weekInfo={week}
                    onChange={this.onChangeWeek}
                    onChoose={this.onChooseDay}
                    currentSelect={this.state.currentSelectDay} />
                  <div className='finish-button'>
                    {this.renderSignUpButton()}
                  </div>
                  <div className='top-help-info'>入群开始2个月内进行10次打卡即可完成全部任务</div>
                </div>
              </div>
              <div className='container rank'>{this.renderSignReview()}</div>
              <div className='container'>{this.renderButtonList()}</div>
              {this.renderActivityInfo()}
              <div className='logo-line'>
                <img src='/static/img/apollo/logoLine.png' />
              </div>
            </div>

          </div>
          <style jsx>{`
          .out {
            background-color: #f8f9ff;
            font-size: 0px;
            padding: 1rem 1rem 0 1rem;
          }
          .page{
            width: 100%;
            color: ${ThemeConfig.color.deepBlue};
            padding-bottom: 100px;
          }
          .top {
            min-height: 270px;
            margin: 0 -1rem 0 -1rem;
          }
          .top-bg {
            position: relative;
            width: 100%;
          }
          .top-content {
            position: absolute;
            z-index: 1;
            top: 0;
            width: 100%;
          }
          .header{
            background-color: #001453;
            color: white
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
          }
          .finish-button {
            font-size: 30px !important;
          }
          .top-help-info {
            padding: 0 1rem;
            color: ${ThemeConfig.color.yellow};
            font-size: 12px;
            text-align: center;
            margin-top: 10px;
          }
          .container {
            margin: 0 -1rem 0 -1rem;
            padding: 1rem;
            border-bottom: 10px solid ${ThemeConfig.color.deepBorder};
          }
          .rank {
            margin-top: -1rem;
          }
          .logo-line {
            margin: 1rem -1rem 0 -1rem;
          }
          .logo-line img{
            width: 100%;
          }
        `}</style>
        </Layout>
      )
    } else {
      return (
        <Layout error={error} />
      )
    }
  }

  // 今日review
  renderSignReview () {
    return (<div>
      <h1 className='content'>今日有<span className='count'> {this.state.todayFinishCount} </span>人完成打卡</h1>
      <div className='flex'>
        <div>{this.renderAvatar()}</div>
        <div className='content' onClick={() => { this.goRouter('/apollo/rank') }}>查看总排行榜 ></div>
      </div>
      <style jsx>{`
        .flex {
          font-size: 0px;
          display: flex;
          justify-content: space-between;
        }
        .content {
          font-size: 16px;
        }
        .count {
          font-size: 20px;
        }
      `}</style>
    </div>)
  }

  // 渲染头像列表
  renderAvatar () {
    let style = {
      fontSize: '0',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      margin: '1px'
    }
    let headArray = this.state.headimgList
    if (headArray && headArray.length > 0) {
      return headArray.map((item, index) => {
        if (index < 7) {
          return <img style={style} key={item + index} src={item} />
        }
      })
    } else {
      let emptyArr = []
      let style2 = {
        backgroundColor: `${ThemeConfig.color.deepBorder}`
      }
      style = Object.assign(style, style2)
      for (let i = 0; i < 7; i++) {
        emptyArr.push('')
      }
      return emptyArr.map((item, index) => {
        return <img style={style} key={index} />
      })
    }
  }

  // 跳转链接
  renderButtonList () {
    return (<div className='column'>
      <div className='colume-inner' onClick={() => { this.goRouter('https://shimo.im/doc/WpXxL5ZVRkUusykC?r=J5P19Z/') }}>
        <span>点击获取实习干货</span>
        <span>{'>'}</span>
      </div>
      {this.todayDayKey > 318 && <div className='colume-inner has-border-div' onClick={() => { this.goRouter('/apollo/finish') }}>
        <span>我已找到实习，结束打卡</span>
        <span>{'>'}</span>
      </div>}
      <style>{
        `
        .column {
          font-size: 16px;
          margin: -1rem auto -1rem auto;
        }
        .colume-inner {
          line-height: 60px;
          height: 60px;
          display: flex;
          justify-content: space-between;
        }
        .has-border-div {
          border-top: 1px solid ${ThemeConfig.color.deepBorder};
        }
        `
      }</style>
    </div>)
  }

  // 活动信息
  renderActivityInfo () {
    return (<div className='help-info'>
      <h1 className='title'>活动注意事项</h1>
      <p>每天完成一次投递，并点击"完成今日打卡"</p>
      <p>即可完成今日打卡任务哦。</p>
      <p>*入群开始2个月内进行10次打卡即可完成全部任务~*</p>
      <style jsx>{`
      .help-info {
        font-size: 14px;
        text-align: center;
      }
      .title {
        margin: 20px auto 10px auto;
        font-size: 16px;
      }
      `}</style>
    </div>)
  }

  renderSignUpButton () {
    let week = this.state.allWeek[this.state.currentSelectWeek].apolloWeekDayDTOList
    let day = week[this.state.currentSelectDay]
    // 如果是当日
    if (day.today) {
      if (day.over) {
        return <Button style={{backgroundColor: ThemeConfig.color.yellow, color: ThemeConfig.color.deepBlue}} onClick={() => this.onSignSuccess(1)} >今日已完成</Button>
      } else {
        return <Button style={{backgroundColor: ThemeConfig.color.yellow, color: ThemeConfig.color.deepBlue}} onClick={this.signUp} >完成今日打卡</Button>
      }
    } else {
      if (day.start) {
        if (day.over) {
          return <Button style={{backgroundColor: ThemeConfig.color.yellow, color: ThemeConfig.color.deepBlue}} onClick={() => this.onSignSuccess(0)} >已完成打卡</Button>
        } else {
          return <Button style={{backgroundColor: ThemeConfig.color.deepBorder, color: ThemeConfig.color.deepBlue}} >未完成打卡</Button>
        }
      } else {
        return <Button style={{backgroundColor: ThemeConfig.color.deepBorder, color: ThemeConfig.color.deepBlue}} >打卡未开始</Button>
      }
    }
  }
}
