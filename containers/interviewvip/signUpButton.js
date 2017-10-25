import React from 'react'
import {Button} from 'react-weui'// 组件库
import ThemeConfig from '../../config/theme'

/*
props
  状态
 canBuy
 payStatus
 canEnter
 内容
 buttonContent 体验一下按钮文字
 price // 价格
 点击体验一下的回调
 onClickButton(其余按钮,已报名/未开始上课/立即报名的链接写死在组件中)
 */

export default class extends React.Component {
  render () {
    return (
      <div className='button'>
        {this.renderButtonBar()}
        <style jsx>{`
          .button {
            display: flex;
            justify-content: space-between;
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            padding: 1rem;
            box-sizing: border-box;
            background: #F9F9F9;
          }
        `}</style>
        <style global jsx>{`
          .weui-btn {
            font-size: 14px !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .weui-btn+.weui-btn {
            margin-top: 0px !important;
            margin-left: 1rem !important;
          }
          .experience.weui-btn_primary {
            background-color: ${ThemeConfig.color.yellow} !important;
          }
          .join-right-now.weui-btn_primary {
            background-color: ${ThemeConfig.color.blue} !important;
          }
          /* default disable button  */
          .weui-btn_disabled.weui-btn_default {
            background-color: ${ThemeConfig.color.content} !important;
            color: #fff !important;
            width: 50% !important;
            margin: auto !important;
            margin-left: 1rem !important;
          }
          .weui-btn_primary.enter {
            background-color: ${ThemeConfig.color.yellow} !important;
            width: 50%;
          }
          .weui-btn_primary.invite {
            background-color: ${ThemeConfig.color.red} !important;
          }
          .weui-btn_primary.experience {
            width: 50%;
          }
        `}</style>
      </div>
    )
  }

  renderButtonBar () {
    let arr = []
    // 1是否购买
    if (this.props.payStatus) {
      // 2是否开课, 根据不同的状态判断
      console.log('canEnter:', this.props.canEnter)
      arr.push(this.renderFreeTry())
      arr.push(this.renderEnter(this.props.canEnter))
    } else {
      arr.push(this.renderFreeTry())
      if (this.props.canBuy) {
        arr.push(this.renderCut())
        arr.push(this.renderSignUp())
      } else {
        arr.push(this.renderHaveClosed())
      }
    }
    return arr
  }

  /*
  没有开课的进入打卡按钮
   */
  renderEnter (state) {
    if (state) {
      return <Button className='enter' onClick={() => { this.goPath('/interviewvip/list') }}>进入打卡</Button>
    } else {
      return <Button type='default' disabled>进入打卡</Button>
    }
  }

  renderFreeTry () {
    return (
      <Button
        className='experience'
        onClick={() => { this.goPath('https://shimo.im/doc/hMWImuwPj4Q1ZEYj?r=NZOD95') }}
      >{this.props.buttonContent}</Button>
    )
  }
  renderCut () {
    return (
      <Button className='invite' onClick={() => {this.onClickButton()}}>邀请砍价</Button>
    )
  }
  renderSignUp () {
    return (
      <Button className='join-right-now' onClick={this.goPath.bind(this, '/payment')}>{`报名¥${this.props.price}`}</Button>
    )
  }

  renderHaveClosed () {
    return <Button>报名已截止</Button>
  }

  // 组件回调父组件
  onClickButton () {
    console.log('click')
    this.props.onClickButton()
  }

  goPath (goPath) {
    console.log(goPath)
    location.href = goPath
  }
}
