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
      this.setToday(dayOfYear)

    } catch (e) {
      this.setState({
        error: e.message,
        isRender: false
      })
    }
  }

  setToday = async function (dayOfYear) {
    let getByDay = await AxiosUtil.get(`/api/apollo/getByDay/?day=${dayOfYear}`)
    let {totalCount, headimgUrlList} = getByDay
    this.setState({
      todayFinishCount: totalCount,
      headimgList: headimgUrlList
    })
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

  /*
   设置页面的总人数/头像
   */
  setPageInfo (payInfo) {
    let {totalUserCount, headimgList} = payInfo
    this.setState({
      totalUserCount: totalUserCount,
      headimgList: headimgList
    })
  }

  /*
   设置报名状态信息
   */
  setPayStatus () {
    // 获取报名信息
    let payStatus = GetPayInfo.getPayStatus()
    let canEnter = GetPayInfo.getCanEnter()
    this.setState({
      payStatus: payStatus,
      canBuy: GetPayInfo.getCanBuy(),
      canEnter: canEnter
    })
  }

  /*
   设置价格
   */
  setPrice () {
    // 设置价格
    let {discountPrice} = GetPayInfo.getPriceInfo()
    this.setState({
      price: discountPrice
    })
  }

  signUp () {
    this.onSignSuccess()
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
    if (type === 'next') {

    } else {

    }
  }

  // 选中某一天
  onChooseDay (index) {
    this.setState({
      currentSelect: index
    })
  }

  renderSignReview () {
    return (<div>
      <h1>今日有{this.state.todayFinishCount}人完成打卡</h1>
      <div className='flex'>
        {this.renderAvatar()}
        <div onClick={() => { this.goRouter('123') }}>查看总排行榜</div>
      </div>
      <style jsx>{`
        .flex{
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>)
  }

  goRouter (goRouter) {
    console.log(goRouter)
    location.href = goRouter
  }

  renderAvatar () {
    let style = {
      width: '30px',
      height: '30px',
      borderRadius: '30px'
    }
    let headArray = this.state.headimgList
    if (headArray && headArray.length > 0) {
      return headArray.map((item, index) => {
        return <img style={style} key={index} src={item} />
      })
    }
  }

  renderButtonList () {
    return (<div>
      <div className='' onClick={() => { this.goRouter('2') }}>点击前往</div>
      <div onClick={() => { this.goRouter('3') }}>我已找到</div>
      <style>{
        `{
        .
        }`
      }</style>
    </div>)
  }

  // 活动信息
  renderactivityInfo () {
    return (<div>
      <h1>活动注意事项</h1>
      <p>活动注意事项</p>
      <p>活动注意事项</p>
    </div>)
  }

  render () {
    const {isRender, error} = this.state
    if (this.state.allWeek.length > 0) {
      let week = this.state.allWeek[this.state.currentSelectWeek].apolloWeekDayDTOList
      let day = week[this.state.currentSelectDay]
      return (
        <InterviewLayout isRender={isRender} error={error}>
          <div className='page'>
            <div className='header'>
              <p>您已成功打卡{this.state.signTotalDay}天</p>
            </div>
            <DateSelector
              dayType={this.paddingDay()}
              weekInfo={week}
              onChange={this.onChangeWeek}
              onClick={this.onChooseDay}
              currentSelect={this.state.currentSelectDay}>
            </DateSelector>
            <Button text={'完成今日打卡'} color={'red'} bg={'blue'} onClick={this.signUp}/>
            <div className='title'>打卡满三天即可完成本周任务</div>
            <div className='container'>{this.renderSignReview()}</div>
            <div className='container'>{this.renderButtonList()}</div>
            <div className='container'>{this.renderactivityInfo()}</div>
          </div>
          <style jsx>{`
          .page{
            width: 100%;
          }
          .header img{
            width: 100%;
          }
          .title {
            padding: 0 1rem;
            color: ${ThemeConfig.color.dark_black};
            font-size: 26px;
          }
          .content {
            padding: 1rem 1rem 4rem 1rem;
            color: ${ThemeConfig.color.content};
          }
          .content .join {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .content .join .count {
            margin-left: 1rem;
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
