import React from 'react'// 库
import {Button} from 'react-weui'// 组件库
import Back from '../../containers/interviewvip/back'
import InterviewLayout from '../../containers/interviewvip/layout'// container
import ToolsUtil from '../../util/tools'

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
      buttonWord: ''
    }
  }

  componentDidMount = async () => {
    let topicKey = ToolsUtil.getQueryString('topicKey')
    try {
      let list = await CourseInfo.getList('list')
      this.setState({
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
      // 如果异常.在这里处理
      <InterviewLayout isRender={isRender} error={error}>
        <Back text='< 返回' url='/interviewvip/list' />
        {this.renderButtonState()}
      </InterviewLayout>
    )
  }
}
