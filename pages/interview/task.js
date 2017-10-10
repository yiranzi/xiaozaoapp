import React from 'react'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import InterviewLayout from '../../containers/interview/layout'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRender: true,
      questionList: {},
      isSubmit: false,
      error: ''
    }
  }

  componentDidMount = async () => {
    const day = ToolsUtil.getQueryString('day')
    try {
      let questionList = await AxiosUtil({
        method: 'get',
        url: `/api/interview/getByDay/${day}`
      })
      questionList = questionList.response
      this.setState({
        questionList: questionList,
        isRender: false
      })
    } catch (e) {
      console.log(e)
      this.setState({
        isRender: false,
        error: e
      })
    }
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div>asdfasdfasdf</div>
      </InterviewLayout>
    )
  }
}
