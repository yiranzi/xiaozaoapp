import React from 'react'
import Audio from '../../xz-components/audio'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>音频：</div>
        <Audio idTag='audio-id' audioUrl='http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/interview/mp3/S1-3-m.mp3' />
      </div>
    )
  }
}