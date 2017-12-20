import React from 'react'
import DataUtil from '../../util/data'
import ToolsUtil from '../../util/tools'
import UploaderFile from '../../xz-components/uploaderFile'
import TextArea from '../../xz-components/textarea'
import WxRecord from '../../xz-components/newWxRecord'
import Audio from '../../xz-components/audio'

export default class extends React.Component {
  renderAnswerOption (topic, disabled) {
    const {id, type, answer} = topic

    const name = `answer_${id}`

    if (ToolsUtil.isTextarea(type)) {
      return (
        <TextArea
          key={name}
          placeholder='请输入您的答案'
          maxLength={200}
          defaultValue={answer}
          onChange={(value) => { this.props.onChange(id, value) }}
          disabled={disabled}
        />
      )
    } else if (ToolsUtil.isUploader(type)) {
      if (disabled) {
        let {defaultValue} = this.props
        let _answer
        if (defaultValue) {
          _answer = defaultValue.get('file').name
        }

        if (_answer) {
          return <div>{_answer}</div>
        } else {
          return <div>{answer}</div>
        }
      } else {
        return (
          <UploaderFile
            defaultValue={answer}
            onChange={(value) => { this.props.onChange(id, value) }}
            disabled={disabled}
          />
        )
      }
    } else if (ToolsUtil.isRecord(type)) {
      let {defaultValue} = this.props

      if (disabled) {
        return <Audio idTag={'audio_' + DataUtil.uuid(5)} audioUrl={defaultValue} />
      } else {
        return (
          <WxRecord
            isRecording={this.props.isRecording}
            isPlaying={this.props.isPlaying}
            ref='wxRecord'
            key={name}
            defaultValue={defaultValue}
            updateRecording={(res) => this.props.updateRecording(res)}
            onChange={(value) => { this.props.onChange(id, value) }} />
        )
      }
    }
  }
  render () {
    const {topic, disabled} = this.props
    return (
      <div className='topic'>
        <div className='options'>
          <div>{this.renderAnswerOption(topic, disabled)}</div>
        </div>
        <style jsx>{`
          .topic {
            padding: 1.5rem 1rem;
          }
        `}</style>
      </div>
    )
  }
}
