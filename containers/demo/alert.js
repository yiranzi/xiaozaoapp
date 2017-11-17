import React from 'react'
import Button from '../../xz-components/button'
import {Alert} from '../../xz-components/alert'

export default class extends React.Component {
  openAlert () {
    Alert({
      content: 'alert内容？alert内容？',
      okText: '确定',
      ok: () => console.log('回调')
    })
  }
  render () {
    return (
      <div className='up'>
        <div className='title'>Alert弹框：</div>
        <Button onClick={() => { this.openAlert() }}>Alert弹框</Button>
      </div>
    )
  }
}
