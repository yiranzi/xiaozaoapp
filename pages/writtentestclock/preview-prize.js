import React from 'react'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
import PrizePreview from '../../src/page/writtentestclock/preview-prize'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <PrizePreview />
      </WrittenTestClock>
    )
  }
}
