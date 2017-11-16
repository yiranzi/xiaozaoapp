import React from 'react'
import Back from '../../xz-components/back'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>返回：</div>
        <Back direct='left'>向左</Back>
        <br />
        <Back direct='right'>向右</Back>
      </div>
    )
  }
}