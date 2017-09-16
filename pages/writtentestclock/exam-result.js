import React from 'react'
import ExamResult from '../../page/writtentestclock/exam-result'
import WrittenTestClock from '../../page/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <ExamResult />
      </WrittenTestClock>
    )
  }
}
