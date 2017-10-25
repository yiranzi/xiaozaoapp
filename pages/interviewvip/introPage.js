import React from 'react'// 库
import taskCard from '../../containers/interviewvip/taskCard'// 自定义组件
import SignUpButton from '../../containers/interviewvip/signUpButton'// 自定义组件
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
      canEnter: null,
      isRender: true,
      error: '',
      totalUserCount: null,
      headimgList: null,
      price: null
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
    let {totalUserCount, headimgList} = payInfo
    this.setState({
      totalUserCount: totalUserCount,
      headimgList: headimgList
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
    let {price} = GetPayInfo.getPriceInfo()
    this.setState({
      price: price
    })
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        {!isRender && <div className='page'>
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
            <taskCard>
              <div>
                <p>这是介绍</p>
              </div>
            </taskCard>
            <taskCard
              title='参与方式'
              content={'12'} />
            <taskCard
              title='学习计划'
              content={'13'} />
          </div>
          {this.renderStartTime()}
          <div>
            {this.renderButton()}
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
      `}</style>
      </InterviewLayout>
    )
  }

  renderNumber () {
    return (
      <p>{this.state.totalUserCount}人已经报名,名额有限...</p>
    )
  }

  renderAvatar () {
    let style = {
      width: '30px',
      height: '30px'
    }
    let headArray = this.state.headimgList
    if (headArray && headArray.length > 0) {
      return headArray.map((item, index) => {
        return <img style={style} key={index} src={item} />
      })
    }
  }

  renderStartTime () {
    if (this.state.payStatus) {
      return (<div className='bg'>
        <p>正式打卡将于2017年11月1日开始</p>
        <style>
          {`
            .bg {
            background-color: yellow
            }
          `}
        </style>
      </div>)
    }
  }

  // 根据条件渲染按钮
  renderButton () {
    return (<SignUpButton
      canBuy={this.state.canBuy}
      payStatus={this.state.payStatus}
      canEnter={this.state.canEnter}
      buttonContent={'体验一下↑'}
      price={this.state.price}
      onClickButton={this.onShowTryTask}
    />)
  }

  onShowTryTask () {
    console.log('onShowTryTask')
  }

  goPath (goPath) {
    console.log(goPath)
    location.href = goPath
  }
}
