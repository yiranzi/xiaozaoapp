import React from 'react'
import TextArea from '../../xz-components/textarea'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textarea: ''
    }
  }
  render () {
    return (
      <div className='up'>
        <div className='title'>TextArea：</div>
        <TextArea
          placeholder='请输入文字'
          maxLength={200}
          onChange={(e) => { this.changeTextArea(e) }}
        />
        {this.state.textArea && <p>输入文字：{this.state.textArea}</p>}
        <br />
        <TextArea
          defaultValue='默认文字默认文字默认文字默认文字默认文字'
          disabled
        />
      </div>
    )
  }
}
