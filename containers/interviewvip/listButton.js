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
          .buttonStyle {
            font-size: 14px !important;
            background-color: ${ThemeConfig.color.blue} !important;
            width: 30%; !important;
          }
          .midButton {
            minWidth: 10px; !important;
          }
        `}</style>
      </div>
    )
  }

  renderButtonBar () {
    let buttonStyle = {
      backgroundColor: `${ThemeConfig.color.blue} !important`,
      width: '30%',
      fontSize: `14px !important`
    }
    let midButton = {
      backgroundColor: `${ThemeConfig.color.blue} !important`,
      width: '30%',
      minWidth: '10px',
      fontSize: `14px !important`
    }
    let arr = []
    arr.push(this.renderLeftSign(buttonStyle))
    arr.push(this.renderMidChoose(midButton))
    arr.push(this.renderRightGrade(buttonStyle))
    return arr
  }

  renderLeftSign (state) {
    return (
      <Button
        onClick={() => { this.goPath('1') }}
      >练习规则</Button>
    )
  }
  renderMidChoose () {
    return (
      <Button
        onClick={() => { this.goPath('interview') }}
      >选择模拟面试</Button>
    )
  }
  renderRightGrade () {
    return (
      <Button
        onClick={() => { this.goPath('3') }}
      >查看成绩</Button>
    )
  }


  // 组件回调父组件
  onClickButton () {
    this.props.onClickButton()
  }

  goPath (goPath) {
    location.href = `/interviewvip/${goPath}`
  }
}
