import React from 'react'
import {Button} from 'react-weui'

export default class MyCheckbox extends React.Component {
  render () {
    const {text, bg, color, half, onClick, style} = this.props
    let styleParams = style || {}
    styleParams = Object.assign(styleParams, {
      color: color || '#fff',
      backgroundColor: bg || '#117ee9',
      width: half ? '50%' : '100%',
      fontSize: '14px'
    })
    return (
      <div>
        {onClick &&
          <Button style={styleParams} onClick={() => { onClick() }}>{text}</Button>}
        {!onClick && <Button style={styleParams} >{text}</Button>}
      </div>
    )
  }
}
