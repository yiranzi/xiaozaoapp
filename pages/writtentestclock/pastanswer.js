import React from 'react'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
import PastAnswerPage from '../../containers/writtentestclock/pastanswer'

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <PastAnswerPage />
      </WrittenTestClock>
    )
  }
}
