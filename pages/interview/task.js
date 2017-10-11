import React from 'react'
import AxiosUtil from '../../util/axios'
import InterviewLayout from '../../containers/interview/layout'
import StandardTask from '../../containers/interview/standard'

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
