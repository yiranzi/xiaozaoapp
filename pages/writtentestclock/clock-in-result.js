import React from 'react'
import ClockInResult from '../../src/page/writtentestclock/clock-in-result'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <ClockInResult />
      </WrittenTestClock>
    )
  }
}
