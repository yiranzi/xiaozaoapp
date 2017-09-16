import React from 'react'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
import PastAnswerPage from '../../src/page/writtentestclock/pastanswer'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <PastAnswerPage />
      </WrittenTestClock>
    )
  }
}
