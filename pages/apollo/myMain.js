import React from 'react'// 库
import Button from '../../xz-components/button'
import DateSelector from '../../containers/apollo/DateSelector'// 自定义组件
import InterviewLayout from '../../containers/interviewvip/layout'// container
import GetPayInfo from '../../util/getPayInfo'// 工具类
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
      isRender: false,
      error: ''
    }
    this.signUp = this.signUp.bind(this)
    this.onChangeWeek = this.onChangeWeek.bind(this)
    this.onChooseDay = this.onChooseDay.bind(this)
    this.setShare = this.setShare.bind(this)
  }

  componentDidMount = async () => {
    try {
      //
      let getDetail = await AxiosUtil.get('/api/apollo/getDetail')
      let {week, dayOfYear, apolloWeekDTOList} = getDetail
      let apolloWeekDayDTOList = apolloWeekDTOList[week].apolloWeekDayDTOList
      let currentDay = apolloWeekDayDTOList.findIndex((ele, index) => {
        return (ele.dayOfYear === dayOfYear)
      })

      this.setState({
        allWeek: apolloWeekDTOList, // 总日期

        currentSelectDay: currentDay, // 当前选中日
        currentSelectWeek: week, // 当前选中周
        isRender: false
      })
      this.todayDayKey = dayOfYear // 设置今天的日期标识常量
      this.todayWeekKey = week // 设置今天的日期标识常量
      this.setToday(apolloWeekDayDTOList[currentDay])
    } catch (e) {
      this.setState({
        error: e.message,
        isRender: false
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

  paddingDay () {
    let result

    if (this.todayWeekKey > this.state.currentSelectWeek) {
      result = 'after'
    } else if (this.todayWeekKey < this.state.currentSelectWeek) {
      result = 'before'
    } else {
      if (this.todayDayKey > this.state.currentSelectDay) {
        result = 'after'
      } else if (this.todayDayKey < this.state.currentSelectDay) {
        result = 'before'
      } else {
        result = 'today'
      }
    }
    return result
  }

  getCurrentWeek () {
    return (this.state.allWeek)
  }

  setShare () {
    let prop = {
      title: '标题',
      desc: '描述',
      link: 'http://rcwx.review.xiaozao.org/interviewvip/list',
      imgUrl: 'https://www.baidu.com/img/bd_logo1.png'
    }
  }


  signUp () {
    // this.onSignSuccess()
  }

  // 弹窗1
  onSignSuccess () {
    const _this = this
    Confirm({
      title: '不能打卡群',
      content: '对不起,....',
      okText: '确定',
      cancelText: '取消',
      ok: () => console.log('123'),
      cancel: () => console.log('456')
    })
  }

  onSignFailed () {

  }

  renderHelpInfo () {
    return (
      <div>
        <p className='title'>常见问题</p>
        <p>请点击左下角的【在线咨询】，可以查看常见问题哦！若有更多问题，请添加小灶求职顾问-Ted（微信：xiaozao025)，进行咨询。</p>
        <style>
          {`
          .title{
            color: ${ThemeConfig.color.dark_black};
            font-size: 26px;
          }
          .card {
            margin: 30px 0 30px 0 !important;
          }
          `}
        </style>
      </div>
    )
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
      let day = week[index]
      this.setToday(day)
    })
    // 查看当日完成人数
  }

  renderAvatar () {
    let style = {
      fontSize: '0',
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      margin: '0px'
    }
    let headArray = this.state.headimgList
    if (headArray && headArray.length > 0) {
      return headArray.map((item, index) => {
        return <img style={style} key={item} src={item} />
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

  goRouter (goRouter) {
    location.href = goRouter
  }

  // 今日review
  renderSignReview () {
    return (<div>
      <h1 className='content'>今日有<span className='count'> {this.state.todayFinishCount} </span>人完成打卡</h1>
      <div className='flex'>
        {this.renderAvatar()}
        <div className='content' onClick={() => { this.goRouter('123') }}>查看总排行榜 ></div>
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
      <div className='colume-inner has-border-div' onClick={() => { this.goRouter('2') }}>
        <span>点击前往</span>
        <span>{'>'}</span>
      </div>
      <div className='colume-inner' onClick={() => { this.goRouter('3') }}>
        <span>我已找到</span>
        <span>{'>'}</span>
      </div>
      <style>{
        `
        .column {
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
  renderactivityInfo () {
    return (<div className='help-info'>
      <h1 className='title'>活动注意事项</h1>
      <p>活动注意事项</p>
      <p>活动注意事项</p>
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
    if (day.start) {
      return <Button half text={'完成今日打卡'} color={ThemeConfig.color.deepBlue} bg={ThemeConfig.color.yellow} onClick={this.signUp} />
    } else {
      return <Button half text={'打卡未开始'} color={ThemeConfig.color.deepBlue} bg={ThemeConfig.color.deepBorder} />
    }
  }

  render () {
    const {isRender, error} = this.state
    if (this.state.allWeek.length > 0) {
      let week = this.state.allWeek[this.state.currentSelectWeek].apolloWeekDayDTOList
      let day = week[this.state.currentSelectDay]
      return (
        <InterviewLayout isRender={isRender} error={error}>
          <div className='page'>
            <div className='top'>
              <img className='top-bg' src='/static/img/apollo/bg1.jpg' />
              <div className='top-content'>
                <div className='header'>
                  <p>您已成功打卡{this.state.signTotalDay}天</p>
                </div>
                <DateSelector
                  todayIndex={0}
                  dayType={this.paddingDay()}
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
            {this.renderactivityInfo()}
          </div>
          <style jsx>{`
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
            font-size: 20px;
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
        </InterviewLayout>
      )
    } else {
      return (
        <InterviewLayout isRender={isRender} error={error} />
      )
    }
  }
}
