import React from 'react'
import SwipeView from '../../xz-components/SwipeView'

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
      direction = 'left'
    } else {
      direction = 'right'
    }
    this.moving = false
    this.props.onChange(direction)
  }

  onChooseOnDay (index) {
    this.props.onChoose(index)
  }

  // onTap = {this.cbfPress}
  render () {
    console.log(this.props)
    return (
      <div >
        <div className='fixfooter-container'>
          <SwipeView className='banner-container' onSwiping={this.cbfMoving} onSwiped={this.cbfPutOn} >
            <div>{this.props.dayType}</div>
          </SwipeView>
        </div>
        <style jsx>{`

        `}</style>
      </div>
    )
  }
}
