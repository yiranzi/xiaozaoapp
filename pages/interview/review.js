import React from 'react'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import InterviewLayout from '../../containers/interview/layout'
import StandardReview from '../../containers/interview/standardreview'
import UnStandardReview from '../../containers/interview/unstandardview'

const standard = [2, 3, 4, 6]

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRender: true,
      day: '',
      topicKey: '',
      questionList: {},
      isSubmit: false,
      error: ''
    }
  }

  componentDidMount = async () => {
    let topicKey = ToolsUtil.getQueryString('topicKey')
    let today = ToolsUtil.getQueryString('today')
    let questionList

    try {
      if (today) {
        questionList = await AxiosUtil({
          method: 'get',
          url: `/api/interview/getTodayByTopicKey/${topicKey}`
        })
      } else {
        questionList = await AxiosUtil({
          method: 'get',
          url: `/api/interview/getHistoryByTopicKey/${topicKey}`
        })
      }

      if (topicKey) {
        questionList = await AxiosUtil({
          method: 'get',
          url: `/api/interview/getTodayByTopicKey/${topicKey}`
        })
      } else {
        questionList = await AxiosUtil({
          method: 'get',
          url: '/api/interview/getToday'
        })
      }

      this.setState({
        day: questionList.day,
        topicKey: topicKey,
        questionList: questionList,
        isRender: false
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e
      })
    }
  }

  renderTask () {
    const {day, questionList} = this.state
    if (standard.indexOf(day) >= 0) {
      return <StandardReview questionList={questionList}/>
    } else {
      return <UnStandardReview questionList={questionList}/>
    }
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div>{this.renderTask()}</div>
      </InterviewLayout>
    )
  }
}
