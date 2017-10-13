import React from 'react'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import InterviewLayout from '../../containers/interview/layout'
import StandardTask from '../../containers/interview/standard'
import Day1Task from '../../containers/interview/day1task'
import Day5Task from '../../containers/interview/day5task'

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
    let questionList

    try {
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
      if (e.status === 10004) {
        location.href = '/interview/list'
      } else {
        this.setState({
          isRender: false,
          error: e.message
        })
      }
    }
  }

  renderTask () {
    const {day, questionList} = this.state
    if (standard.indexOf(day) >= 0) {
      return <StandardTask questionList={questionList}/>
    } else if (day === 1) {
      return <Day1Task questionList={questionList}/>
    } else if (day === 5) {
      return <Day5Task questionList={questionList}/>
    }
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div>{this.renderTask()}</div>
        <style global jsx>{`
          .timedown {
            color: #fdc23e;
            font-weight: normal;
            background-color: white;
            border: 1px solid #d9d9d9;
            border-radius: 1rem;
            padding: 0 1rem;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
