import React from 'react'
import TimeDown from '../../xz-components/timedown'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>TimeDown：</div>
        <p>回调方法：timeDown</p>
        <p>参数limitTime<strong style={{color: 'red'}}>只支持分钟</strong>，没做小时</p>
        <TimeDown limitTime='60' timeDown={() => { alert('时间到') }} />
      </div>
    )
  }
}
