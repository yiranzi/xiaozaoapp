import React from 'react'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      summaryJson: []
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    let courseId = nextProps.courseId
    if (courseId) {
      if (this.props.courseId !== courseId) {
        this.getSummart(courseId)
      }
    }
  }

  componentDidMount = async () => {
    let courseId = this.props.courseId
    if (courseId) {
      this.getSummart(courseId)
    }
  }

  getSummart = async (courseId) => {
    let courseSummaryJson = await AxiosUtil.get(`/api/private/learning/courseSummary/${courseId}`)
    this.setState({
      summaryJson: courseSummaryJson
    })
  }

  render () {
    let {summaryJson} = this.state
    if (summaryJson.length > 0) {
      return (<div className='introduce'>
        课程id{this.props.courseId}
        {summaryJson.map((ele, index) => {
          return (<div key={index}>
            <h1>{ele.title}</h1>
            <p>{ele.content}</p>
          </div>)
        })}
        <style jsx>{`
        .{
        }
      `}</style>
      </div>)
    } else {
      return null
    }
  }
}
