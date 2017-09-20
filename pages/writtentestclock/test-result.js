import React from 'react'
import TestResultPage from '../../containers/writtentestclock/test-result'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <TestResultPage />
      </WrittenTestClock>
    )
  }
}
