import React from 'react'
import PropTypes from 'prop-types'
import {ChooseBar, ChooseItem} from '../../xz-components/choosebar'
import Triangle from '../../containers/buygether/poptag'

export default class extends React.Component {
  newGroupDiscount = 1000 // 开团立减
  coupon = 0.9 // 折扣
  static propTypes = {
    dataInfo: PropTypes.array,
    defaultSelect: PropTypes.number,
    buyButtonCallBack: PropTypes.func,
    joinInfo: PropTypes.object,
    cancelCallBack: PropTypes.func
  }

  static defaultProps = {
    dataInfo: [], // 购买回调
    defaultSelect: 0, // 初始选中
    buyButtonCallBack: function () {}, // 购买回调
    cancelCallBack: function () {}, // 取消购买回调
    joinInfo: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      currentSelect: 0,
      render: false
    }
    this.onChange = this.onChange.bind(this)
    this.buyButtonClick = this.buyButtonClick.bind(this)
  }

  componentDidMount () {
    this.setState({
      currentSelect: this.props.defaultActiveKey,
      render: true
    })
  }

  renderTitle () {
    if (this.props.joinInfo && this.props.joinInfo.groupId) {
      let {headimgurl, nickname} = this.props.joinInfo
      return (<div className='title'>
        <div className='content title-font'>
          <span>正在参加</span>
          <div><img className='head-img' src={headimgurl} /></div>
          <span>{nickname}的团</span>
        </div>
        <p className='title-font'>
          选择你想参团的能力卡套餐
        </p>
        <style jsx>{`
          .title {
            text-align: center;
            padding: 10px 10px 30px 10px;
          }
          .title-font {
            font-size: 20px;
            font-weight: bold;
          }
          .content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin: 10px auto;
          }
          .head-img {
            margin: 0 10px;
            vertical-align: middle;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='title'>
        <p style={{textAlign: 'center'}} className='title-font'>拼团流程</p>
        <div className='content'>
          <span className='content-color'>1.选择能力卡</span>
          <span className='line-color'>——</span>
          <span className='content-color'>2.邀请好友</span>
          <span className='line-color'>——</span>
          <span className='content-color'>3.人满成团</span>
        </div>
        <span style={{textAlign: 'left'}}>选择套餐</span>
        <style jsx>{`
          .title {
            text-align: left;
            padding: 10px 10px 10px 10px;
          }
          .title-font {
            font-size: 20px;
            font-weight: bold;
          }
          .content {
            margin: 20px 10px;
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items; center;
            justify-content: center;
            height: 20px;
            line-height: 20px;

          }
          .content-color {
            border-radius: 20px;
            background-color: #f0f2f6;
          }
          .line-color {
            margin: 0 2px;
            color: #e5e5e5;
          }
        `}</style>
      </div>)
    }
  }

  renderList () {
    let {dataInfo} = this.props
    let chooseBar = {
      border: 'none',
      paddingTop: '0',
      margin: '-20px auto -20px auto'
    }
    let chooseStyle = {
      color: 'white',
      backgroundColor: '#c41616',
      borderColor: '#c41616'
    }
    let barStyle = {
      padding: '10px',
      boxSizing: 'border-box'
    }
    return (
      <ChooseBar style={chooseBar}
        defaultActiveKey={this.state.currentSelect}
        onChange={this.onChange}
        chooseStyle={chooseStyle}>
        {dataInfo.map((ele, index) => {
          return (<ChooseItem key={index} style={barStyle}>
            <div className='line'>
              <img className='left' src={'/static/img/buygether/card_icon.png'} />
              <span className='mid'>{`能力卡${ele.buyCount}张`}</span>
              <span className='right'>{`立省￥${this.calcPrice(ele, 'discount')}`}</span>
            </div>
            <style jsx>{`
              .line {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
              }
              .left {
                margin-right: 10px;
                flex: 1；
                width: 30px;
              }
              .mid {
                flex: 4
              }
              .right {
                flex: 2
              }
            `}</style>
          </ChooseItem>)
        })}
      </ChooseBar>
    )
  }

  calcPrice (priceInfo, type) {
    let value = 1000
    let isNewGroup
    if (this.props.joinInfo && this.props.joinInfo.groupId) {
      isNewGroup = false
    } else {
      isNewGroup = true
    }
    let isCoupon = this.props.couponInfo
    let {showPrice, price} = priceInfo
    if (isCoupon) {
      price = price * this.coupon
      if (isNewGroup) {
        price -= this.newGroupDiscount
      }
    }
    let calcPrice
    switch (type) {
      case 'origin':
        calcPrice = showPrice
        break
      case 'now':
        calcPrice = price
        break
      case 'discount':
        calcPrice = (showPrice - price)
        break
    }
    return (parseInt(calcPrice / value))
  }

  renderBottom () {
    if (this.props.dataInfo && this.props.dataInfo.length > 0) {
      let priceInfo = this.props.dataInfo[this.state.currentSelect]
      return (
        <div className='bottom-line'>
          <div className='button left-button'>{`原价￥${this.calcPrice(priceInfo, 'origin')}`}</div>
          <div onClick={this.buyButtonClick} className='button rigth-button'>{`参团￥${this.calcPrice(priceInfo, 'now')}`}</div>
          {!this.props.joinInfo.groupId &&
          <Triangle style={{right: '60px', bottom: '40px'}}>团长开团立减10元</Triangle>}
          <style jsx>{`
          .bottom-line{
            position: relative;
            border-top: 1px solid #c41616;
            display: flex;
            height: 50px;
            line-height: 50px;
          }
          .bottom-line > div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tag {
            position: absolute;
            right: 100px;
            top: -30px;
            width: 80px;
            height: 40px;
          }
          .button {
            height: 100%;
          }
          .left-button {
            background-color: white;
            color: #c41616;
            flex: 1;
          }
          .rigth-button {
            background-color: #c41616;
            color: white;
            flex: 1;
          }
        `}</style>
        </div>
      )
    }
  }

  buyButtonClick () {
    let typeId = this.props.dataInfo[this.state.currentSelect].id
    let groupId = this.props.joinInfo.groupId
    this.props.buyButtonCallBack(typeId, groupId)
  }

  renderCoupon () {
    if (this.props.couponInfo) {
      let {nickname} = this.props.couponInfo
      return (<div className='coupon-div'>
        <p> • 使用{nickname}赠送的优惠券，享9折</p>
        <p>报名后你的好友{nickname}将免费获得一张能力卡</p>
        <style jsx>{`
        .coupon-div {
          margin-bottom: 40px;
          padding: 0px 10px;
        }
      `}</style>
      </div>)
    }
  }

  render () {
    if (this.state.render) {
      return (
        <div className='buy-pop-bg' onClick={() => { this.props.cancelCallBack() }}>
          <div className='buy-pop-div' onClick={(e) => { e.stopPropagation() }}>
            {this.renderTitle()}
            {this.renderList()}
            {this.renderCoupon()}
            {this.renderBottom()}
          </div>
          <style jsx>{`
          .buy-pop-bg {
            background-color: rgba(35,24,21,0.5);
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            font-size: 14px;
            z-index: 100;
          }
          .buy-pop-div {
            background-color: white;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            font-size: 14px;
          }
        `}</style>
        </div>
      )
    } else {
      return null
    }
  }

  // change
  onChange (index) {
    this.setState({
      currentSelect: index
    })
  }
}
