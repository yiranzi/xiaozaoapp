import React from 'react'
import WrittenTestClock from '../../page/writtentestclock/components/layout'
import PrizePreview from '../../page/writtentestclock/preview-prize'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <PrizePreview />
      </WrittenTestClock>
    )
  }
}
