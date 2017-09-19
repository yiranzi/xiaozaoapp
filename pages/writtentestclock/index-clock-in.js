import React from 'react'
import IndexClockIn from '../../containers/writtentestclock/index-clock-in'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <IndexClockIn />
      </WrittenTestClock>
    )
  }
}
