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
      canBuy: null,
      payStatus: null,
      isRender: true,
      error: ''
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
   设置页面的总人数/头像
   */
  setPageInfo (payInfo) {
    let {interviewInviteesDTOList} = payInfo
    this.setState({
      disCountArray: interviewInviteesDTOList
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
