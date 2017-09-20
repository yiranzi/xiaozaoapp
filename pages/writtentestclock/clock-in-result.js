import React from 'react'
import ClockInResult from '../../containers/writtentestclock/clock-in-result'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <ClockInResult />
      </WrittenTestClock>
    )
  }
}
