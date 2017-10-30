import React from 'react'// 库
import Button from '../../components/button'// 组件库
import Back from '../../containers/interviewvip/back'
import resultContent from '../../containers/interviewvip/resultContent'
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
      console.log(list)
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
      return (<div onClick={this.goRouter.bind(this, this.state.nextTaskUrl)}>
        <Button>{this.state.buttonWord} + {this.state.nextTaskUrl}</Button>
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
        <Back text='< 返回' url='/interviewvip/list' />
        {this.renderResultContent()}
        <ReadMore topicKey={this.state.topicKey} />
        {this.renderButtonState()}
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
          <img className='bg'src='/static/img/interviewvip/resultBg.png' />
          <div className='inner'
            dangerouslySetInnerHTML={{__html: content}} />
        </div>
        <div style={style}>
          <Button onClick={() => { location.href = '/interviewvip/list' }}
            bg={ThemeConfig.color.yellow}
            color={'white'}
            text={'查看答案及解析'} />
        </div>
        <style jsx>
          {`
          .out {
            position: relative;
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
          }
          .inner {
            margin-top: 20px;
            text-align: center;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 10px;
            width: 100%;
            color: white;
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
