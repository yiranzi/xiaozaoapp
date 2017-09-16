import React from 'react'
import TestEntry from '../../containers/writtentestclock/test-entry'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <TestEntry />
      </WrittenTestClock>
    )
  }
}
