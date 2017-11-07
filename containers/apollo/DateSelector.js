import React from 'react'
import SwipeView from '../../xz-components/SwipeView'
import ThemeConfig from '../../config/theme'

/*
  week数组
  1)打卡情况.对应的日期
  2)
  onChange // next before
  onChoose // index 选中其中某一天
  currentSelect // index
 */

export default class extends React.Component {
  moving = false
  constructor (props) {
    super(props)
    this.cbfMoving = this.cbfMoving.bind(this)
    this.cbfPutOn = this.cbfPutOn.bind(this)
    this.onChooseOnDay = this.onChooseOnDay.bind(this)
    this.styleByStatus = this.styleByStatus.bind(this)
    this.onChangeWeek = this.onChangeWeek.bind(this)
  }

  cbfMoving (e, deltaX, deltaY, absX, absY, velocity) {
    if (!this.moving) {
      this.moving = true
    }
  }

  cbfPutOn (e, deltaX, deltaY, absX, absY, velocity) {
    let direction
    if (!this.moving) {
      return
    }
    if (deltaX > 0) {
      direction = 'right'
    } else {
      direction = 'left'
    }
    this.moving = false
    this.onChangeWeek(direction)
  }

  onChangeWeek (direction) {
    this.props.onChange(direction)
  }
  onChooseOnDay (index) {
    this.props.onChoose(index)
  }

  // onTap = {this.cbfPress}
  render () {
    return (
      <div >
        <div className='fixfooter-container'>
          <SwipeView className='banner-container' onSwiping={this.cbfMoving} onSwiped={this.cbfPutOn} >
            <div className='calendar'>
              <div onClick={() => { this.onChangeWeek('left') }}>
                <img src='/static/img/apollo/prev.png' />
              </div>
              {this.renderCalendarItem()}
              <div onClick={() => { this.onChangeWeek('right') }}>
                <img src='/static/img/apollo/next.png' />
              </div>
              </div>
          </SwipeView>
        </div>
        <style jsx>{`
          .calendar {
            display: flex;
            justify-content: space-between;
            padding: 10px;
          }
          .calendar img {
            margin-top: 12px;
            width: 12px;
            height: 12px;
          }
        `}</style>
      </div>
    )
  }

  IndexToDay (index) {
    let date = {
      '1': '一',
      '2': '二',
      '3': '三',
      '4': '四',
      '5': '五',
      '6': '六',
      '7': '日'
    }
    return date[index]
  }
  
  renderCalendarItem () {
    let weekInfo = this.props.weekInfo
    return weekInfo.map((ele, index) => {
      let dayName = this.IndexToDay(ele.dayOfWeek)
      return (<div onClick={() => { this.onChooseOnDay(index) }} className='calendar-item' key={ele.dayOfYear}>
        <span className='dayName'>{dayName}</span>
        <div className='date-container'>
          <span className='date' style={this.styleByStatus(ele)}>{ele.dayOfMonth}</span>
          {ele.today && <img className='today-tag' src='/static/img/apollo/current.png' />}
        </div>
        {this.props.currentSelect === index && <span className='current-tag'></span>}
        <style jsx>
          {`
          .calendar-item {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 30px;

          }
          .dayName {
            color: white;
            font-size: 22px;
          }
          .date-container {
            position: relative;
            width: 30px;
            height: 30px;
          }
          .date {
            position:absolute;
            left:0; right:0; top:0; bottom:0;
            margin:auto;
          }
          .today-tag {
            position:absolute;
            left:0; right:0; top:0; bottom:0;
            width: 26px;
            height: 26px;
            margin:auto;
          }
          .current-tag {
            position: absolute;
            bottom: -5px;
            width:0;
            height:0;
            border-left:4px solid transparent;
            border-right:4px solid transparent;
            border-bottom:4px solid red;
          }
          `
          }
        </style>
      </div>)
    })
  }

  styleByStatus (item) {
    let style = {
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      lineHeight: '20px',
      textAlign: 'center',
      display: 'inline-block'
    }
    let styleFinish = {
      color: `${ThemeConfig.color.deepBlue}`,
      backgroundColor: `${ThemeConfig.color.yellow}`,
      borderRadius: '50%'
    }
    let styleUnFinish = {
      color: `white`,
      backgroundColor: `#e1e4f0`,
      borderRadius: '50%'
    }
    let unReach = {
      color: `white`
    }
    // 之后的
    if (item.start) {
      if (item.over) {
        style = Object.assign(style, styleFinish)
      } else {
        style = Object.assign(style, styleUnFinish)
      }
    } else {
      style = Object.assign(style, unReach)
    }
    return style
  }
}
