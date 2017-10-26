import React from 'react'
import {Button} from 'react-weui'

export default class MyCheckbox extends React.Component {
  render () {
    const {text, bg, color, half, onClick} = this.props
    let style = {
      color: color || '#fff',
      backgroundColor: bg || '#117ee9',
      width: half ? '50%' : '100%'
    }
    return (
      <div>
        {onClick && <Button style={style} onClick={() => { onClick() }}>{text}</Button>}
        {!onClick && <Button style={style} >{text}</Button>}
      </div>
    )
  }
}
