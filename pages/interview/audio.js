import React from 'react'
import Audio from '../../components/audio'
import InterviewLayout from '../../containers/interview/layout'

export default class extends React.Component {
  render () {
    return (
      <InterviewLayout>
        <Audio src='/static/demo.mp3'></Audio>
      </InterviewLayout>
    )
  }
}
