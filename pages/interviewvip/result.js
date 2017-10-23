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
    console.log('是!!!!!')
    console.log(show)
    this.setState({
      topicKey: topicKey,
      isShowNextButton: show,
      buttonWord: word,
      nextTaskUrl: taskUrl,
    })
  }

  // componentDidMount () {
  //   const topicKey = ToolsUtil.getQueryString('topicKey');
  //   this.setState({
  //     topicKey: topicKey,
  //   });
  //   this.queryResultData(topicKey);
  //   this.getIsFinishToday(topicKey);
  // }

  // 是否正在查看 今天没完成的题目的 结果.
  getIsFinishToday = async (topicKey) => {
    try {
      let interviewResult = await AxiosUtil(
        {
          method: 'get',
          url: '/api/interview/getHistoryByTopicKey/' + topicKey
        }
      );
    } catch (e) {
      if (e.status === 10003) {
        this.setState({
          todayDoing: true
        })
      } else {
        this.setState({
          todayDoing: false
        })
      }
    }
  }

  queryResultData = async (topicKey) => {
    try {
      let interviewResult = await AxiosUtil({
        method: 'get',
        url: '/api/interview/getCompleteByTopicKey/' + topicKey
      });
      if (DataUtil.isEmpty(interviewResult)) {
        this.setState({isRender: false,error: '未完成打卡'})
      } else {
        this.setState({
          interviewResult: interviewResult,
          isRender: false,
        });
      }
    } catch (e) {
      this.setState({
        isRender: false,
        error: e
      })
    }
  }


  /*
   根据来源 区分后续
   */
  renderByState () {
    if (this.state.isShowNextButton) {
      return (<div onClick={this.goRouter.bind(this, this.state.nextTaskUrl)}>
        <Button>{this.state.buttonWord} + {this.state.nextTaskUrl}</Button>
      </div>)
    } else {
      return null
    }
  }

  goRouter (topicKey) {
    console.log(topicKey)
    location.href = `/interviewvip/intro?topicKey=${topicKey}`
  }

  render () {
    const {isRender, error} = this.state
    return (
      // 如果异常.在这里处理
      <InterviewLayout isRender={isRender} error={error}>
        <Back text='< 返回' url='/interview/list' />
        <div>123123</div>
        {this.renderByState()}
      </InterviewLayout>
    )
  }
}


