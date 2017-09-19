import React from 'react'
import MoreTest from '../../containers/writtentestclock/more-test'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <MoreTest />
      </WrittenTestClock>
    )
  }
}
