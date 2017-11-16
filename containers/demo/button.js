import React from 'react'
import Button from '../../xz-components/button'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>按钮：</div>
        <Button>默认type primary</Button>
        <Button disabled>默认disable</Button>
        <Button type='normal'>type normal</Button>
        <Button type='normal' disabled>type normal disabled</Button>
      </div>
    )
  }
}