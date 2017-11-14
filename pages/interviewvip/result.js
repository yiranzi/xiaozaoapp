import React from 'react'// 库
import Button from '../../xz-components/button'// 组件库
import Back from '../../xz-components/back'
import Fixfooter from '../../xz-components/fixfooter'
import resultContent from '../../containers/interviewvip/result/resultContent'
import ReadMore from '../../containers/interviewvip/result/ReadMore'
import InterviewLayout from '../../containers/interviewvip/layout'// container
import ToolsUtil from '../../util/tools'
import ThemeConfig from '../../config/theme'

import CourseInfo from '../../util/getCourseInfo'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topicKey: null,
      isRender: true,
      error: '',
      interviewResult: null,
      todayDoing: false,
      isShowNextButton: false,
      nextTaskUrl: '',
      buttonWord: ''
    }
    this.seeReview = this.seeReview.bind(this)
  }

  componentDidMount = async () => {
    let topicKey = ToolsUtil.getQueryString('topicKey')
    let payStatus
    try {
      // 先判定购买情况
      let payInfo = await AxiosUtil.get('/api/interview/buyInfo')
      payStatus = payInfo.buyed
      // 体验 or 购买
      if (payStatus) {
        try {
          let list = await CourseInfo.getList()
          this.setState({
            list: list
          })
        } catch (e) {
          // 未付费 渲染报错信息.不渲染列表
          this.setState({
            error: e.message
          })
        }
        let result = CourseInfo.isLast(topicKey)
        let {taskUrl, show, word} = result
        this.setState({
          topicKey: topicKey,
          isShowNextButton: show,
          buttonWord: word,
          nextTaskUrl: taskUrl,
          isRender: false,
          payStatus: payStatus
        })
      } else {
        this.setState({
          topicKey: 'demo',
          payStatus: payStatus,
          isRender: false
        })
      }
    } catch (e) {
      this.setState({
        error: e.message,
        payStatus: false
      })
    }
  }

  /*
   根据下一课的状态 显示按钮
   下一课 没做 就有按钮.
   */
  renderButtonState () {
    if (!this.state.payStatus) {
      let payButton = <Button bg={'rgb(255, 93, 93)'} key={1} half
        onClick={() => { location.href = '/interviewvip/introPage' }}
        text={'优惠报名'} />
      return (<Fixfooter content={payButton} />)
    } else {
      let ele = <Button key={1}
        half
        onClick={() => { this.goRouter(this.state.nextTaskUrl) }}
        text={this.state.buttonWord} />
      if (this.state.isShowNextButton) {
        return (<Fixfooter content={ele} />)
      } else {
        return null
      }
    }
  }

  goRouter (topicKey) {
    // 进入下一节的介绍页
    if (topicKey) {
      location.href = `/interviewvip/intro?topicKey=${topicKey}`
    }
  }

  renderBackButton () {
    let url
    if (this.state.payStatus) {
      url = '/interviewvip/list'
    } else {
      url = '/interviewvip/introPage'
    }
    return (<a href={url}><Back direct='left' text='返回主页' /></a>)
  }

  seeReview () {
    if (this.state.payStatus) {
      location.href = `/interviewvip/review?topicKey=${this.state.topicKey}`
    } else {
      location.href = `/interviewvip/experience/review`
    }
  }

  renderResultContent () {
    let style = {
      width: '70%',
      margin: '0 auto 20px auto'
    }
    let content = resultContent[this.state.topicKey]
    return (
      <div className='main'>
        <div className='out'>
          <img className='bg'src='/static/img/interviewvip/result/resultBg-bg.png' />
          <div className='inner'>
            <h1 className='title'>恭喜你完成本章学习</h1>
            <div dangerouslySetInnerHTML={{__html: content}} />
          </div>
        </div>
        <div style={style}>
          <Button onClick={this.seeReview}
            bg={ThemeConfig.color.yellow}
            color={'white'}
            text={'查看答案及解析'} />
        </div>
        <style jsx>{`
          .out {
            position: relative;
          }
          .title {
            font-size: 1.1rem;
            margin: 20px 0 10px 0;
          }
          .main {
            margin: 10px auto 20px auto;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            font-size: 0;
            text-align: center;
          }
          .bg {
            position: relative;
            margin: 15px auto 20px auto;
            width: 100%;
            height: 175px;
          }
          .inner {
            {/*margin: 10px auto 0 auto;*/}
            text-align: center;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            position: absolute;
            top: 0;
            left: 15px;
            width: 90%;
            color: white;
            font-size: 0.9rem;
            text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
          }
          .inner p {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div className='result-page'>
          {this.renderBackButton()}
          {this.renderResultContent()}
          <ReadMore topicKey={this.state.topicKey} />
          {this.renderButtonState()}
        </div>
        <style jsx>{`
          a {
            color: ${ThemeConfig.color.blue};
          }
          .result-page {
            padding-bottom: 200px;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
