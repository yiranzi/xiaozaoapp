import React from 'react'
import TimeUp from '../../xz-components/timeup'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>TimeUp：</div>
        <div><TimeUp /></div>
      </div>
    )
  }
}
