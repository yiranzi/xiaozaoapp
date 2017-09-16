import React from 'react'
import TestResultPage from '../../page/writtentestclock/test-result'
import WrittenTestClock from '../../page/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <TestResultPage />
      </WrittenTestClock>
    )
  }
}
