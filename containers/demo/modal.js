import React from 'react'
import Button from '../../xz-components/button'
import Modal from '../../xz-components/modalbox'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>Modal：</div>
        <Button>Modal弹框</Button>
      </div>
    )
  }
}
