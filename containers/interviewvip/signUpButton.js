import React from 'react'
import {Button} from 'react-weui'// 组件库

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
    console.log(this.props)
    console.log('!!!!!')
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
          padding: 1rem 2rem;
          box-sizing: border-box;
          background: #F9F9F9;
        }
        `}</style>
      </div>
    )
  }

  renderButtonBar () {
    let arr = []
    arr.push(this.renderFreeTry())
    // 1是否购买
    if (this.props.payStatus) {
      // 2是否开课
      if (!this.props.canEnter) {
        // TODO 也报名但未开课的逻辑
        arr.push(this.renderEnter())
      }
    } else {
      if (this.props.canBuy) {
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
  renderEnter () {
    return (this.renderButton('进入打卡'))
  }

  renderFreeTry () {
    return (<div key={1} onClick={this.onClickButton.bind(this)}>
      {this.renderButton(this.props.buttonContent)}
    </div>)
  }

  renderSignUp () {
    return (<div key={2} onClick={this.goPath.bind(this, '/payment')}>
      {this.renderButton(`立即报名¥${this.props.price}`)}
    </div>)
  }

  renderHaveClosed () {
    return (this.renderButton('报名已截止'))
  }

  renderButton (content) {
    return (<div key={content} >
      <p className='red'>{content}</p>
      <style jsx>{`
        .red{
          border: 1px solid black
          color: red
          margin: 10px
        }
      `}</style>
    </div>)
  }

  // 组件回调父组件
  onClickButton () {
    this.props.onClickButton()
  }

  goPath (goPath) {
    console.log(goPath)
    location.href = goPath
  }
}
