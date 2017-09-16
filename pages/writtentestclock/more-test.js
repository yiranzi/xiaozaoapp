import React from 'react'
import MoreTest from '../../src/page/writtentestclock/more-test'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <MoreTest />
      </WrittenTestClock>
    )
  }
}
