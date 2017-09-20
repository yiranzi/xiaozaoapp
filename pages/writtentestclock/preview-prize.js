import React from 'react'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
import PrizePreview from '../../containers/writtentestclock/preview-prize'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <PrizePreview />
      </WrittenTestClock>
    )
  }
}
