import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='audio-wrapper'>
        <audio src={this.props.src} controls='controls'></audio>
      </div>
    )
  }
}
