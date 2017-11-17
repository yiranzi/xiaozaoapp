import React from 'react'
import Video from '../../xz-components/video'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>Video：</div>
        <p>video 使用HTML5原生，如果有需要在改components, <strong style={{color: 'red'}}>只有一个参数src</strong></p>
      </div>
    )
  }
}
