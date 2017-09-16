import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import TestResultPage from '../../containers/writtentestclock/test-result'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
=======
import TestResultPage from '../../src/page/writtentestclock/test-result'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
>>>>>>> update: eslinit code style

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <TestResultPage />
      </WrittenTestClock>
    )
  }
}
