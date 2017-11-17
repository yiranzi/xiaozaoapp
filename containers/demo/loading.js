import React from 'react'
import Button from '../../xz-components/button'
import Loading from '../../xz-components/loading'

const {action} = Loading

export default class extends React.Component {
  loading () {
    action()
  }
  render () {
    return (
      <div className='up'>
        <div className='title'>Loading：</div>
        <Button onClick={() => { this.loading() }} >Loading</Button>
      </div>
    )
  }
}
