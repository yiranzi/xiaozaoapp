import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
import PastAnswerPage from '../../containers/writtentestclock/pastanswer'
=======
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
import PastAnswerPage from '../../src/page/writtentestclock/pastanswer'
>>>>>>> update: eslinit code style

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <PastAnswerPage />
      </WrittenTestClock>
    )
  }
}
