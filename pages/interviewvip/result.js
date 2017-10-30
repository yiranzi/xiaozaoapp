import React from 'react'// 库
import Button from '../../components/button'// 组件库
import Back from '../../components/back'
import resultContent from '../../containers/interviewvip/result/resultContent'
import ReadMore from '../../containers/interviewvip/result/ReadMore'
import InterviewLayout from '../../containers/interviewvip/layout'// container
import ToolsUtil from '../../util/tools'
import ThemeConfig from '../../config/theme'

import CourseInfo from '../../util/getCourseInfo'

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
      buttonWord: '',
      groupIndex: -1 // 当前组号
    }
  }

  componentDidMount = async () => {
    let topicKey = ToolsUtil.getQueryString('topicKey')
    try {
      let list = await CourseInfo.getList('list')
      let groupIndex = list.findIndex((groups, index) => {
        let a = groups.group.findIndex((eleTopic, index) => {
          return (eleTopic.topicKey === topicKey)
        })
        if (a !== -1) {
          return true
        }
      })
      this.setState({
        groupIndex: groupIndex,
        list: list
      })
    } catch (e) {
      // 未付费 渲染报错信息.不渲染列表
      this.setState({
        error: e.message
      })
    }
    this.setState({
      isRender: false
    })
    // 设置

    let result = CourseInfo.isLast(topicKey)
    let {taskUrl, show, word} = result
    this.setState({
      topicKey: topicKey,
      isShowNextButton: show,
      buttonWord: word,
      nextTaskUrl: taskUrl
    })
  }

  /*
   根据下一课的状态 显示按钮
   下一课 没做 就有按钮.
   */
  renderButtonState () {
    if (this.state.isShowNextButton) {
      return (<div className='next' onClick={this.goRouter.bind(this, this.state.nextTaskUrl)}>
        <Button half={true} text={this.state.buttonWord}></Button>
        <style jsx>
          {`.next{
            margin-top: 30px;
            width: 100%
          }`}
        </style>
      </div>)
    } else {
      return null
    }
  }

  goRouter (topicKey) {
    // 进入下一节的介绍页
    location.href = `/interviewvip/intro?topicKey=${topicKey}`
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <a href='/interviewvip/list'><Back direct='left' text='返回主页' /></a>
        {this.renderResultContent()}
        <ReadMore topicKey={this.state.topicKey} />
        {this.renderButtonState()}
        <style jsx>{`
          a {
            color: ${ThemeConfig.color.blue};
          }
        `}</style>
      </InterviewLayout>
    )
  }

  renderResultContent () {
    let style = {
      width: '70%',
      margin: '0 auto 20px auto'
    }
    let content = resultContent[this.state.groupIndex + 1]
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
          <Button onClick={() => { location.href = `/interviewvip/review?topicKey=${this.state.topicKey}` }}
            bg={ThemeConfig.color.yellow}
            color={'white'}
            text={'查看答案及解析'} />
        </div>
        <style jsx>
          {`
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
          `}
        </style>
      </div>
    )
  }
}
