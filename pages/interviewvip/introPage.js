import React from 'react'// 库
import {Button} from 'react-weui'// 组件库
import Card from '../../components/card'// 自定义组件
import InterviewLayout from '../../containers/interviewvip/layout'// container
import GetPayInfo from '../../util/getPayInfo'// 工具类

// 介绍页

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      payInfo: null,
      canBuy: null,
      payStatus: null,
      startTime: null,
      isRender: true,
      error: '',
      totalUserCount: null,
      headimgList: null,
      price: null,
    }
  }

  componentDidMount = async () => {
    try {
      // 获取付费价格
      let payInfo = await GetPayInfo.getPayInfo()
      this.setState({
        payInfo: payInfo,
      })
      // 获取常规数据
      let {totalUserCount, headimgList, price} = payInfo
      let payStatus = GetPayInfo.getPayStatus()
      // 如果已经付费

      //TODO 补充接口
      let startTime = false
      if (payStatus) {
        //  && 开课时间到达 跳转
        if (startTime) {
          this.goPath('list')
        } else {
          // 没开课
        }
      } else {
        // 未购买
      }
      this.setState({
        isRender: false,
        payStatus: payStatus,
        canBuy: GetPayInfo.getCanBuy(),
        startTime: startTime
      })

      this.setState({
        totalUserCount: totalUserCount,
        headimgList: headimgList,
        price: price,
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        {!isRender && <div className="page">
          <div className='header'>
            <img src='/static/img/interview/interview.png' />
          </div>
          <div className='title'>
            <h1>群面模拟第二期</h1>
          </div>
          <div className='head-image'>
            {this.renderNumber()}
            <div className='avatar'>{this.renderAvatar()}</div>
          </div>
          <div className='static-data'>
            <Card
              title='计划介绍'
              content={'11'} />
            <Card
              title='参与方式'
              content={'12'} />
            <Card
              title='学习计划'
              content={'13'} />
          </div>
          <div className='action'>
            {this.renderButtonBar()}
          </div>
        </div>}

        <style jsx>{`
        .page{
          padding-bottom: 50px;
          width: 100%;
        }
        .header img{
          width: 100%;
        }
        .action {
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
      </InterviewLayout>
    )
  }

  renderNumber () {
    return (
      <p>{this.state.totalUserCount}人已经报名,名额有限...</p>
    )
  }

  renderButtonBar () {
    let arr = []
    arr.push(this.renderFreeTry())

    if (this.state.canBuy) {
      arr.push(this.renderSignUp())
    } else {
      arr.push(this.renderHaveClosed())
    }
    return arr
  }

  renderFreeTry () {
    return (this.renderButton('体验一下', 'free'))
  }

  renderSignUp () {
    return (this.renderButton(`立即报名¥${this.state.price}`, 'payment'))
  }

  renderHaveClosed () {
    return (this.renderButton('报名已截止', 'close'))
  }

  renderButton (content, goPath) {
    return (<div key={goPath} onClick={this.goPath.bind(this, goPath)}>
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

  goPath (goPath) {
    console.log(goPath)
    location.href = `/interviewvip/${goPath}`
  }

  renderAvatar () {
    let headArray = this.state.headimgList
    return headArray.map((item, index) => {
      return <img key={index} src={item} />
    })
  }
}
