import React from 'react'
import ExamResult from '../../containers/writtentestclock/exam-result'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <ExamResult />
      </WrittenTestClock>
    )
  }
}
