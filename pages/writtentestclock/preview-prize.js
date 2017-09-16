import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
import PrizePreview from '../../containers/writtentestclock/preview-prize'
=======
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
import PrizePreview from '../../src/page/writtentestclock/preview-prize'
>>>>>>> update: eslinit code style

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <PrizePreview />
      </WrittenTestClock>
    )
  }
}
