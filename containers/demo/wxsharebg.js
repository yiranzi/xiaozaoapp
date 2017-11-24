import React from 'react'
import {showShareBg} from '../../xz-components/wxshareBg'
import Button from '../../xz-components/button'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>WxShareBg</div>
        <Button onClick={() => { showShareBg(<div>分享右上角<br />现在就分享</div>) }}>弹出分享右上角</Button>
      </div>
    )
  }
}
