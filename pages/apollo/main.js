import React from 'react'// 库
import Button from '../../xz-components/button'
import {ModalPop} from '../../xz-components/ModalBox'
import {Alert} from '../../xz-components/alert'
import DateSelector from '../../containers/apollo/DateSelector'// 自定义组件
import Layout from '../../components/layout'// container
import ThemeConfig from '../../config/theme'
import { Confirm } from '../../xz-components/confirm'
import WxShare from '../../xz-components/WxShare'
import AxiosUtil from '../../util/axios'

// 介绍页

export default class extends React.Component {
  todayDayKey
  todayWeekKey
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
      this.todayWeekKey = week // 设置今天的日期标识常量
      this.setToday(apolloWeekDayDTOList[currentDay])
    } catch (e) {
      this.setState({
        error: e.message
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

  // 设置分享
  setShare () {
    let prop = {
      title: '我正在参加 - 找实习有投必反馈的【阿波罗实习计划】...',
      desc: '立即申请加入阿波罗实习计划',
      link: 'http://rcwx.review.xiaozao.org/apollo/entry',
      imgUrl: 'http://wx.xiaozao.org/static/img/apollo/share-icon.jpg'
    }
    return (<WxShare {...prop} />)
  }

  // 发起打卡
  signUp = async function () {
    try {
      await AxiosUtil.get('/api/apollo/complete')
      this.onSignSuccess()
    } catch (e) {
      Alert({content: e.message, okText: '确认'})
    }
    // 刷新
    this.getDetail()
  }

  // 成功弹窗弹窗
  onSignSuccess () {
    Confirm({
      title: '恭喜你完成打卡',
      content: '恭喜你完成打卡，快分享给你的朋友吧',
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
      inner: dom,
      style: defaultStyle
    }
    ModalPop({...prop})
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



  goRouter (goRouter) {
    location.href = goRouter
  }

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
        return <img style={style} key={item + index} src={item} />
      })
    } else {
      let emptyArr = []
      let style2 = {
        backgroundColor: `${ThemeConfig.color.deepBorder}`
      }
      style = Object.assign(style, style2)
      for (let i = 0; i < 8; i++) {
        emptyArr.push('')
      }
      return emptyArr.map((item, index) => {
        return <img style={style} key={index} />
      })
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
          font-size: 18px;
        }
        .count {
          font-size: 22px;
        }
      `}</style>
    </div>)
  }

  // 跳转链接
  renderButtonList () {
    return (<div className='column'>
      <div className='colume-inner has-border-div' onClick={() => { this.goRouter('https://shimo.im/doc/WpXxL5ZVRkUusykC?r=J5P19Z/') }}>
        <span>点击获取实习干货</span>
        <span>{'>'}</span>
      </div>
      {this.todayDayKey > 318 && <div className='colume-inner' onClick={() => { this.goRouter('/apollo/finish') }}>
        <span>我已找到实习，结束打卡</span>
        <span>{'>'}</span>
      </div>}
      <style>{
        `
        .column {
          font-size: 18px;
          margin: -1rem auto -1rem auto;
        }
        .colume-inner {
          line-height: 60px;
          height: 60px;
          display: flex;
          justify-content: space-between;
        }
        .has-border-div {
          border-bottom: 1px solid ${ThemeConfig.color.deepBorder};
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
      <p>*一周至少打卡3次即可完成本周打卡任务。*</p>
      <style jsx>{`
      .help-info {
        text-align: center;
      }
      .title {
        margin: 20px auto 10px auto;
        font-size: 18px;
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
        return <Button half text={'今日已完成'} color={ThemeConfig.color.deepBlue} bg={ThemeConfig.color.yellow} onClick={this.onSignSuccess} />
      } else {
        return <Button half text={'完成今日打卡'} color={ThemeConfig.color.deepBlue} bg={ThemeConfig.color.yellow} onClick={this.signUp} />
      }
    } else {
      if (day.start) {
        if (day.over) {
          return <Button half text={'已完成打卡'} color={ThemeConfig.color.deepBlue} bg={ThemeConfig.color.yellow} onClick={this.onSignSuccess} />
        } else {
          return <Button half text={'未完成打卡'} color={ThemeConfig.color.deepBlue} bg={ThemeConfig.color.deepBorder} />
        }
      } else {
        return <Button half text={'打卡未开始'} color={ThemeConfig.color.deepBlue} bg={ThemeConfig.color.deepBorder} />
      }
    }
  }

  render () {
    const {error} = this.state
    if (this.state.allWeek.length > 0) {
      let week = this.state.allWeek[this.state.currentSelectWeek].apolloWeekDayDTOList
      let day = week[this.state.currentSelectDay]
      return (
        <Layout error={error}>
          {this.setShare()}
          <div className='out'>
            <div className='page'>
              <div className='top'>
                <img className='top-bg' src='/static/img/apollo/bg1.jpg' />
                <div className='top-content'>
                  <div className='header'>
                    <p>您已成功打卡 {this.state.signTotalDay} 天</p>
                  </div>
                  <DateSelector
                    todayIndex={0}
                    weekInfo={week}
                    onChange={this.onChangeWeek}
                    onChoose={this.onChooseDay}
                    currentSelect={this.state.currentSelectDay}>
                  </DateSelector>
                  <div className='finish-button'>
                    {this.renderSignUpButton()}
                  </div>
                  <div className='top-help-info'>打卡满三天即可完成本周任务</div>
                </div>
              </div>
              <div className='container'>{this.renderSignReview()}</div>
              <div className='container'>{this.renderButtonList()}</div>
              {this.renderActivityInfo()}
            </div>
          </div>
          <style jsx>{`
          .out {
            padding: 1rem;
          }
          .page{
            width: 100%;
            color: ${ThemeConfig.color.deepBlue};
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
            font-size: 18px;
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
        `}</style>
        </Layout>
      )
    } else {
      return (
        <Layout error={error} />
      )
    }
  }
}
