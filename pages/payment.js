import React from 'react'
import {Button} from 'react-weui'// 组件库
import InterviewLayout from '../containers/interviewvip/layout'
import GetPayInfo from '../util/getPayInfo'
import wxPayController from '../util/wxPayController'// 工具类

// 报名付费页

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      payInfo: null,
      canBuy: null,
      payStatus: null,
      isRender: true,
      error: ''
    }
  }

  componentDidMount = async () => {
    try {
      // 获取付费价格
      let payInfo = await GetPayInfo.getPayInfo()
      this.setState({
        payInfo: payInfo
      })
      // 获取常规数据
      let {interviewInviteesDTOList} = payInfo
      // 获取价格
      let {price, discountPrice} = GetPayInfo.getPriceInfo()
      let payStatus = GetPayInfo.getPayStatus()
      // 如果已经付费

      // TODO 补充接口
      let startTime = false
      // 是否购买
      if (payStatus) {
        // this.goPath('list')
        if (startTime) {
          // 开课时间到达
        } else {
          // 没开课
        }
      } else {
        // 未购买
      }
      this.setState({
        payStatus: payStatus,
        canBuy: GetPayInfo.getCanBuy(),
        startTime: startTime
      })
      this.setState({
        price: price,
        discountPrice: discountPrice,
        disCountArray: interviewInviteesDTOList,
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
    this.setState({
      isRender: false
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
          color: red;
          width: 100%;
        }

        `}
      </style>
    </div>)
  }

  renderPriceTitle () {
    return (<div className='my-flex'>
      <span className='bold'>商品名</span>
      <span className='bold'>原价</span>
      <span className='bold'>实际价格</span>
      <style>{`
        .bold {
          font-weight: 900;
          font-size: 10px;
          text-align: right;
        }
        .my-flex {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>)
  }

  renderPrice () {
    return (<div className='my-flex'>
      <span className='name'>第二期群面模拟</span>
      <span className='price'>{this.state.price}</span>
      <span className='offerPrice'>{this.state.discountPrice}</span>
      <style>{`
        .name {
          width: 100px;
          text-align: left
        }
        .price {
          font-weight: 900;
          width: 80px;
          text-align: left
        }
        .offerPrice {
          font-weight: 900;
          color: blue;
          width: 70px;
          text-align: right
        }
      `}</style>
    </div>)
  }

  renderDiscountList () {
    let {disCountArray} = this.state
    if (disCountArray.length > 0) {
      let result = disCountArray.map((ele, index) => {
        console.log(ele)
        let {nickname: name, offerPrice: discountPrice} = ele
        return (<div key={index}>{name}帮你扫码,你获得了{discountPrice}元优惠</div>)
      })
      return result
    }
  }

  renderPayButton () {
    return (<div onClick={this.payController}>
      <Button>立即支付</Button>
    </div>)
  }

  payController = async () => {
    wxPayController.payInit()
  }
}
