import React from 'react'
import AxiosUtil from '../../../util/axios'
import InterviewLayout from '../../../containers/interview/layout'
import Task from '../../../containers/interviewvip/task'
import Review from '../../../containers/interviewvip/review'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      questionList: {},
      isRender: true,
      error: ''
    }
  }

  componentDidMount = async () => {
    let questionList

    try {
      questionList = await AxiosUtil.get(`/api/interview/demoDetail`)

      this.setState({
        questionList: questionList,
        isRender: false
      })
    } catch (e) {
      // 这里需要处理已经做过题的情况
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  render () {
    const {isRender, questionList, error} = this.state
    const {answerDTOList} = questionList
    return (
      <InterviewLayout isRender={isRender} error={error}>
        {answerDTOList && answerDTOList.length > 0 && <Review questionList={questionList} />}
        {answerDTOList && answerDTOList.length === 0 && <Task questionList={questionList} />}
      </InterviewLayout>
    )
  }
}
