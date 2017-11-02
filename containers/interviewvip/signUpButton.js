import React from 'react'
import Button from '../../xz-components/button'
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
  constructor () {
    super()
    this.state = {
      seeButton: false
    }
  }
  render () {
    return (
      <div >
        <div className='fixfooter-container'>
          {<div className='button'>{this.renderButtonBar()}</div>}
        </div>
        {this.renderButtonList()}
        <style jsx>{`
          .fixfooter-container {
            background-color: #F9F9F9;
            border-top: 1px solid #e5e5e5;
            position: fixed;
            width: 100%;
            {/*padding: 10px;*/}
            height: 60px;
            line-height: 60px;
            box-sizing: border-box;
            z-index: 100;
            bottom: 0;
            left: 0;
          }
          .button {
            height: 100%
            display: flex;
            justify-content: space-between;
            width: 100%;
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
        `}</style>
      </div>
    )
  }

  renderButtonBar () {
    let arr = []
    let style = {
      width: '100%',
      margin: 'auto 5px auto 5px'
    }
    // 1是否购买
    if (this.props.payStatus) {
      // 2是否开课, 根据不同的状态判断
      arr.push(<div key={1} style={style}>{this.renderAskInfo(true)}</div>)
      arr.push(<div key={6} style={style}>{this.renderEnter(this.props.canEnter)}</div>)
    } else {
      arr.push(<div key={2} style={style}>{this.renderAskInfo()}</div>)
      arr.push(<div key={3} style={style}>{this.renderFreeTry()}</div>)
      if (this.props.canBuy) {
        arr.push(<div key={4} style={style}>{this.renderBuyButtonGroup()}</div>)
      } else {
        arr.push(<div key={5} style={style}>{this.renderHaveClosed()}</div>)
      }
    }
    return arr
  }

  renderButtonList () {
    let style = {
      margin: '5px'
    }
    let style2 = {}
    if (this.state.seeButton) {
      style2 = {
        bottom: '60px'
      }
    } else {
      style2 = {
        bottom: '-100px'
      }
    }
    return <div style={style2}className='fix-button-list'>
      <div style={style}>{this.renderCut1()}</div>
      <div style={style}>{this.renderCut2()}</div>
      <div style={style}>{this.renderCut3()}</div>
      <style jsx>{
        ` .fix-button-list {
            position: fixed;
            right: 0;
            width: 33%;
            background-color: white;
            transition: bottom 0.5s;
            overflow: hidden;
          }`
      }</style>
    </div>
  }

  //arr列表

  /*
  没有开课的进入打卡按钮
   */
  renderEnter (state) {
    if (state) {
      return <Button bg={`${ThemeConfig.color.yellow}`} text={'进入群面'} onClick={() => { this.goPath('/interviewvip/list') }} />
    } else {
      return <Button text={'未开始'} type='default' disabled />
    }
  }

  /*
   没有开课的进入打卡按钮
   */

  renderFreeTry () {
    return (
      <Button className='price-button1' onClick={() => { this.goPath('/interviewvip/experience/intro') }} text={'抢先体验'} />
    )
  }

  renderAskInfo (state) {
    return (
      <Button
        className={classNames('experience', {'pay': state})}
        text={'立即咨询'}
        onClick={() => { this.goPath('https://shimo.im/doc/hMWImuwPj4Q1ZEYj?r=NZOD95') }}
      />
    )
  }

  clickBuyGroupButton () {
    console.log('clickBuyGroupButton')
    let bool = !this.state.seeButton
    this.setState({
      seeButton: bool
    })
  }

  renderBuyButtonGroup () {
    let content
    if (this.state.seeButton) {
      content = '优惠报名↓'
    } else {
      content = '优惠报名↑'
    }
    return (
      <Button bg={'rgb(255, 93, 93)'} onClick={this.clickBuyGroupButton.bind(this)} text={content} />
    )
  }
  renderCut3 () {
    let content = <div>3人团299<img src='https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f525.png' style={{width: '20px', height: '20px'}} /></div>
    // content = <div>299拼团</div>
    return (
      <Button bg={'#fe0000'} onClick={() => { this.goPath('https://kdt.im/Rqyg0h') }} text={content} />
    )
  }
  renderCut2 () {
    return (
      <Button bg={'#ff5d5d'} onClick={() => { this.goPath('https://kdt.im/p8yg0h') }} text='2人团349' />
    )
  }
  renderCut1 () {
    return (
      <Button bg={`${ThemeConfig.color.blue}`} onClick={() => { this.goPath('https://kdt.im/r1Ig0h') }} text='单人399' />
    )
  }

  renderHaveClosed () {
    return <Button title='报名已截止' />
  }

  // 组件回调父组件
  onClickButton () {
    this.props.onClickButton()
  }

  goPath (goPath) {
    location.href = goPath
  }
}
