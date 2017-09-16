import React from 'react'
import TestEntry from '../../src/page/writtentestclock/test-entry'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <TestEntry />
      </WrittenTestClock>
    )
  }
}
