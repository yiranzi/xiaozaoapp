import React from 'react'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import InterviewLayout from '../../containers/interview/layout'
import Review from '../../containers/interviewvip/review'

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
    let topicKey = ToolsUtil.getQueryString('topicKey')
    let questionList

    try {
      questionList = await AxiosUtil.get(`/api/interview/getByTopicKey/${topicKey}`)

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

  renderTask () {
    const {questionList} = this.state
    return <Review questionList={questionList} />
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
