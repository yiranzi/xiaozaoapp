import React from 'react'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
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
        console.log('这里')
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

      console.log(questionList)

      this.setState({
        day: questionList.day,
        topicKey: topicKey,
        questionList: questionList,
        isRender: false
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  renderTask () {
    const {day, questionList} = this.state

    if (!DataUtil.isEmpty(questionList)) {
      if (day === 5) {
        return <UnStandardReview questionList={questionList}/>
      } else {
        return <StandardReview questionList={questionList}/>
      }
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
