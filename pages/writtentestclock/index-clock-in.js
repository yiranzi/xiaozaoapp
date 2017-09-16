import React from 'react'
import IndexClockIn from '../../page/writtentestclock/index-clock-in'
import WrittenTestClock from '../../page/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <IndexClockIn />
      </WrittenTestClock>
    )
  }
}
