import React from 'react'
import {Button} from 'react-weui'// 组件库
import ThemeConfig from '../../config/theme'
import classNames from 'classnames'

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
            padding: 5px;
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
            margin-left: 5px !important;
          }
          .experience.weui-btn_primary {
            background-color: ${ThemeConfig.color.blue} !important;
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
          .weui-btn_primary.pay {
            width: 50%;
          }
          .price-button1 {
            background-color: ${ThemeConfig.color.blue} !important;
          }
          .price-button2 {
            background-color: #ff5d5d !important;
          }
          .price-button3 {
            background-color: #fe0000 !important;
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
      arr.push(this.renderFreeTry(true))
      arr.push(this.renderEnter(this.props.canEnter))
    } else {
      arr.push(this.renderFreeTry())
      if (this.props.canBuy) {
        arr.push(this.renderCut1())
        arr.push(this.renderCut2())
        arr.push(this.renderCut3())
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

  renderFreeTry (state) {
    return (
      <Button
        className={classNames('experience', {'pay': state})}
        onClick={() => { this.goPath('https://shimo.im/doc/hMWImuwPj4Q1ZEYj?r=NZOD95') }}
      >{this.props.buttonContent}</Button>
    )
  }
  renderCut1 () {
    return (
      <Button className='price-button1' onClick={() => { this.goPath('https://h5.youzan.com/v2/goods/2frl13591n7m9') }}>299拼团</Button>
    )
  }
  renderCut2 () {
    return (
      <Button className='price-button2' onClick={() => { this.goPath('https://h5.youzan.com/v2/goods/361kw3i92xaup') }}>349拼团</Button>
    )
  }
  renderCut3 () {
    return (
      <Button className='price-button3' onClick={() => { this.goPath('https://h5.youzan.com/v2/goods/2g07fyj39ndwx') }}>399原价</Button>
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
