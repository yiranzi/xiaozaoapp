import React from 'react'
import WrittenTestClock from '../../page/writtentestclock/components/layout'
import PastAnswerPage from '../../page/writtentestclock/pastanswer'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <PastAnswerPage />
      </WrittenTestClock>
    )
  }
}
