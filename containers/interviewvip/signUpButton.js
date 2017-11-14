import React from 'react'
import Button from '../../xz-components/button'
import ThemeConfig from '../../config/theme'

/*
props
  根据状态渲染内容
 canBuy
 payStatus
 canEnter
 内容
 */

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      seeButton: false
    }
    this.clickBuyGroupButton = this.clickBuyGroupButton.bind(this)
  }

  renderButtonBar () {
    let styleClassName = <style jsx>{`
    .out {
      height: 100%;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      background: #F9F9F9;
    }
    .out > div {
      width: 100%;
      margin: auto 5px auto 5px;
    }
    `}</style>
    // 已购买
    if (this.props.payStatus) {
      return (<div className='out'>
        <div>{this.renderAskInfo()}</div>
        <div>{this.renderEnter()}</div>
        {styleClassName}
      </div>)
    } else {
      // 未购买 继续判断 能否购买
      return (<div className='out'>
        <div>{this.renderAskInfo()}</div>
        <div>{this.renderFreeTry()}</div>
        <div>
          {this.props.canBuy ? this.renderBuyButtonGroup() : this.renderHaveClosed()}
        </div>
        {styleClassName}
      </div>)
    }
  }

  renderButtonList () {
    let style = {}
    if (this.state.seeButton) {
      style = {
        bottom: '60px'
      }
    } else {
      style = {
        bottom: '-100px'
      }
    }
    return <div style={style} className='fix-button-list'>
      <div>{this.renderCut1()}</div>
      <div>{this.renderCut2()}</div>
      <div>{this.renderCut3()}</div>
      <style jsx>{`
        .fix-button-list {
          position: fixed;
          right: 0;
          width: 33%;
          background-color: white;
          transition: bottom 0.5s;
          overflow: hidden;
        }
        .fix-button-list > div {
          margin: 5px;
        }
      `}</style>
    </div>
  }

  // arr列表

  /*
  没有开课的进入打卡按钮
   */
  renderEnter () {
    let state = this.props.canEnter
    if (state) {
      return <Button bg={`${ThemeConfig.color.yellow}`}
        text={'进入群面'}
        onClick={() => { this.goPath('/interviewvip/list') }} />
    } else {
      return <Button text={'未开始'} type='default' disabled />
    }
  }

  /*
   没有开课的进入打卡按钮
   */

  renderFreeTry () {
    return (
      <Button className='price-button1'
        onClick={() => { this.goPath('/interviewvip/experience/intro') }}
        text={'体验5分钟'} />
    )
  }

  renderAskInfo () {
    return (
      <Button
        text={'立即咨询'}
        onClick={() => { this.goPath('https://shimo.im/doc/hMWImuwPj4Q1ZEYj?r=NZOD95') }} />
    )
  }

  clickBuyGroupButton () {
    let bool = !this.state.seeButton
    this.setState({
      seeButton: bool
    })
  }

  renderBuyButtonGroup () {
    let content = this.state.seeButton ? '优惠报名↓' : '优惠报名↑'
    return (
      <Button bg={'rgb(255, 93, 93)'} onClick={this.clickBuyGroupButton} text={content} />
    )
  }
  renderCut3 () {
    let content = <div>3人团299
      <img src='https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f525.png'
        style={{width: '20px', height: '20px'}} />
    </div>
    return (
      <Button bg={'#fe0000'}
        onClick={() => { this.goPath('https://kdt.im/Rqyg0h') }} text={content} />
    )
  }
  renderCut2 () {
    return (
      <Button bg={'#ff5d5d'}
        onClick={() => { this.goPath('https://kdt.im/p8yg0h') }} text='2人团349' />
    )
  }
  renderCut1 () {
    return (
      <Button bg={`${ThemeConfig.color.blue}`}
        onClick={() => { this.goPath('https://kdt.im/r1Ig0h') }} text='单人399' />
    )
  }

  renderHaveClosed () {
    return <Button text='报名已截止' />
  }

  goPath (goPath) {
    location.href = goPath
  }

  render () {
    return (
      <div >
        <div className='fixfooter-container'>
          {this.renderButtonBar()}
        </div>
        {this.renderButtonList()}
        <style jsx>{`
          .fixfooter-container {
            background-color: #F9F9F9;
            border-top: 1px solid #e5e5e5;
            position: fixed;
            width: 100%;
            height: 60px;
            line-height: 60px;
            box-sizing: border-box;
            z-index: 100;
            bottom: 0;
            left: 0;
          }
        `}</style>
      </div>
    )
  }
}
