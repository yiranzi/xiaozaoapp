import React from 'react'
import TestEntry from '../../page/writtentestclock/test-entry'
import WrittenTestClock from '../../page/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <TestEntry />
      </WrittenTestClock>
    )
  }
}
