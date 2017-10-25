import React from 'react'
import {Button} from 'react-weui'// 组件库
import Card from '../components/card'// 组件库
import InterviewLayout from '../containers/interviewvip/layout'
import GetPayInfo from '../util/getPayInfo'
import wxPayController from '../util/wxPayController'// 工具类

// 报名付费页

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      canBuy: null,
      payStatus: null,
      isRender: true,
      error: '',
      limitUser: null
    }
  }

  componentDidMount = async () => {
    try {
      // 获取常规数据
      let payInfo = await GetPayInfo.getPayInfo()
      // 设置
      this.setPageInfo(payInfo)
      this.setPayStatus()
      this.setPrice()
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
    this.setState({
      isRender: false
    })
  }

  /*
   设置好友列表
   */
  setPageInfo (payInfo) {
    let {limitUser, interviewInviteesDTOList} = payInfo
    this.setState({
      disCountArray: interviewInviteesDTOList,
      limitUser: limitUser
    })
  }

  /*
   设置报名状态信息
   */
  setPayStatus () {
    // 获取报名信息
    let payStatus = GetPayInfo.getPayStatus()
    let canEnter = GetPayInfo.getCanEnter()
    // TODO 测试 屏蔽掉跳转
    canEnter = false
    if (payStatus) {
      //  && 开课时间到达 跳转
      if (canEnter) {
        this.goPath('list')
      } else {
        // 没开课
        // this.goPath('introPage')
      }
    } else {
      // 未购买
    }
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
    let {price, discountPrice} = GetPayInfo.getPriceInfo()
    this.setState({
      price: price,
      discountPrice: discountPrice
    })
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        {/*<Back text='< 返回介绍页' url='/interviewvip/introPage' />*/}
        {!isRender && <div className='page'>
          {this.renderPriceDiv()}
          {this.renderDiscountList()}
          {this.renderPayButton()}
        </div>}
        <style jsx>{`
        .page{
          padding-bottom: 50px;
          width: 100%;
        }

      `}</style>
      </InterviewLayout>
    )
  }

  renderPriceDiv () {
    return (<div className='price'>
      {this.renderPriceTitle()}
      {this.renderPrice()}
      <style jsx>
        {`
        .price {
          width: 100%;
        }

        `}
      </style>
    </div>)
  }

  renderPriceTitle () {
    return (<div className='my-flex1'>
      <span className='bold left'>商品名</span>
      <span className='bold mid'>原价</span>
      <span className='bold right'>实际价格</span>
      <style>{`
        .left {
          width: 110px;
          text-align: left;
        }
        .mid {
          width: 80px;
        }
        .right {
          width: 80px;
          text-align: right;
        }
        .bold {
          font-weight: 900;
          font-size: 20px;
        }
        .my-flex1 {
          display: flex;
          justify-content: space-between;
          margin: 10px
        }
      `}</style>
    </div>)
  }

  renderPrice () {
    let style = {
      backgroundColor: 'red'
    }
    return (<Card style={style} content={
      <div className='my-flex2'>
        <span className='name'>第二期群面模拟</span>
        <span className='price'>{this.state.price}</span>
        <span className='offerPrice'>{this.state.discountPrice}</span>
        <style>{`
        .card {
          padding: 10px !important
        }
        .my-flex2 {
          display: flex;
          justify-content: space-between;
        }
        .name {
          width: 110px;
          text-align: left;
          font-size: 15px;
        }
        .price {
          font-weight: 900;
          width: 80px;
          text-align: left;
          font-size: 20px;
        }
        .offerPrice {
          font-weight: 900;
          color: #117ee9;
          width: 80px;
          text-align: center;
          font-size: 20px;
        }
      `}</style>
      </div>
    } />)
  }

  renderDiscountList () {
    let {disCountArray} = this.state
    if (disCountArray.length > 0) {
      let result = disCountArray.map((ele, index) => {
        let {nickname, offerPrice} = ele
        if (index > this.state.limitUser - 1) {
          return (<div key={index}>{this.renderLine(nickname, offerPrice, false)}</div>)
        } else {
          return (<div key={index}>{this.renderLine(nickname, offerPrice, true)}</div>)
        }

      })
      return (<div className='list'>
        <p className='tip'>
          本次活动最多获得{this.state.limitUser}次优惠~
        </p>

        {result}
        <style jsx>
          {`
          .tip {
            margin-bottom: 10px;
          }
          .list{
            margin: 10px auto 40px auto;
          }`}
        </style>
      </div>)
    }
  }

  renderLine (name, discountPrice, isShow) {
    let insert
    let style = {
      backgroundColor: '#F9F9F9',
      position: 'relative',
      zIndex: '10',
      padding: '0 5px 0 5px',
      textAlign: 'center',
      display: 'inline'
    }
    if (isShow) {
      insert = <span style={style}>{` ${name} 帮你砍了一刀,恭喜你获得了 ${discountPrice} 元优惠哦`}</span>
    } else {
      insert = <span style={style}>{` ${name} 帮你砍了一刀,但你已经获得最大的折扣优惠啦！`}</span>
    }
    return (<div className='line'>
      <p>
        {insert}
      </p>
      <div className='space' />
      <style jsx>
        {`
        .line {
        text-align: center
          position: relative;
        }
        .txt {
          background-color: #F9F9F9;
          position: relative;
          z-index: 10;
          padding: 0 5px 0 5px;
          text-align: center;
          display: inline;
        }
        .space {
          top: -10px;
          left: 0;
          position: relative;
          border-bottom: 1px solid #e5e5e5;
          z-index: 5
        }
      `}
      </style>
    </div>)
  }

  renderPayButton () {
    let style = {
      backgroundColor: '#117ee9'
    }
    return (<div onClick={this.payController}>
      <Button style={style}>立即支付</Button>
    </div>)
  }

  payController = () => {
    wxPayController.payInit()
  }
}
