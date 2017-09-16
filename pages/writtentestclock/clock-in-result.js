import React from 'react'
import ClockInResult from '../../page/writtentestclock/clock-in-result'
import WrittenTestClock from '../../page/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <ClockInResult />
      </WrittenTestClock>
    )
  }
}
