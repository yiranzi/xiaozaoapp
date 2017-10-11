import React from 'react'
import AxiosUtil from '../../util/axios'
import Audio from '../../components/audio'
import InterviewLayout from '../../containers/interview/layout'
import StandardTask from './standard'

const standard = [2, 3, 4, 6]

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRender: true,
      day: '',
      questionList: {},
      isSubmit: false,
      error: ''
    }
  }

  componentDidMount = async () => {
    try {
      let questionList = await AxiosUtil({
        method: 'get',
        url: '/api/interview/getToday'
      })
      this.setState({
        day: questionList.day,
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
      return <StandardTask questionList={questionList} />
    } else {
      // 非标准
      return <div>非标准</div>
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
