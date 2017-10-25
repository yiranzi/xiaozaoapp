import React from 'react'// 库
import Card from '../../components/card'
import More from '../../components/more'
import SignUpButton from '../../containers/interviewvip/signUpButton'// 自定义组件
import InterviewLayout from '../../containers/interviewvip/layout'// container
import GetPayInfo from '../../util/getPayInfo'// 工具类
import ThemeConfig from '../../config/theme'

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
        <div className='page'>
          <div className='header'>
            <img src='/static/img/interview/interview.png' />
          </div>
          <div className='title'>群面模拟 第二期</div>
          <div className='content'>
            <div className='join'>
              <div className='avatar'>{this.renderAvatar()}</div>
              <div className='count'>{this.state.totalUserCount}人已经报名,名额有限...</div>
            </div>
            <div className='intro'>
              <More
                title='模拟打卡介绍'
                content='模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍模拟打卡介绍'
                line={4}
              />
            </div>
            <div className='how-join'>
              <Card
                title='参与方式'
                content='参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式'
              />
            </div>
            <div className='plan'>
              <Card
                title='学习计划'
                content='参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式参与方式'
              />
            </div>
            {this.renderStartTime()}
            {this.renderButton()}
          </div>
        </div>
        <style jsx>{`
          .page{
            padding-bottom: 50px;
            width: 100%;
          }
          .header img{
            width: 100%;
          }
          .title {
            padding: 0 1rem;
            color: ${ThemeConfig.color.dark_black};
            font-size: 26px;
          }
          .content {
            padding: 1rem 1rem 5rem 1rem;
            color: ${ThemeConfig.color.content};
          }
          .content .join {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .content .join .count {
            margin-left: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .interviewvip {
            padding: 0 !important;
          }
        `}</style>
      </InterviewLayout>
    )
  }

  renderAvatar () {
    let style = {
      width: '30px',
      height: '30px',
      borderRadius: '30px'
    }
    let headArray = this.state.headimgList
    if (headArray && headArray.length > 0) {
      return headArray.map((item, index) => {
        return <img style={style} key={index} src={item} />
      })
    }
  }

  renderStartTime () {
    if (this.state.payStatus && !this.state.canEnter) {
      return (
        <div className='bg'>
          <p>正式打卡将于2017年11月1日开始</p>
          <style>{`
            .bg {
              background-color: ${ThemeConfig.color.yellow};
              color: #fff;
              text-align: center;
              padding: 0.25rem 0;
            }
          `}</style>
        </div>
      )
    }
  }

  // 根据条件渲染按钮
  renderButton () {
    return (
      <SignUpButton
        canBuy={this.state.canBuy}
        payStatus={this.state.payStatus}
        canEnter={this.state.canEnter}
        buttonContent={'体验一下↑'}
        price={this.state.price}
        onClickButton={this.onShowTryTask}
      />
    )
  }

  onShowTryTask () {
    console.log('onShowTryTask')
  }

  goPath (goPath) {
    console.log(goPath)
    location.href = goPath
  }
}
