import React from 'react'
import DataUtil from '../../util/data'
import ThemeConfig from '../../config/theme'
import ToolsUtil from '../../util/tools'
import Uploader from '../../xz-components/uploader'
import TextArea from '../../xz-components/textarea'
import WxRecord from '../../xz-components/wxrecord'
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
      let defaultValue
      if (DataUtil.isEmpty(answer)) {
        defaultValue = []
      } else {
        defaultValue = [{'url': `http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/learning/workFile/${answer}`}] // 图片默认值是数组
      }

      return (
        <Uploader
          title='图片上传'
          defaultValue={defaultValue}
          maxCount={1}
          onChange={(value) => this.props.onChange(id, value)}
          disabled={disabled}
        />
      )
    } else if (ToolsUtil.isRecord(type)) {
      if (disabled) {
        return <Audio idTag={'audio_' + DataUtil.uuid(5)} audioUrl={answer} />
      } else {
        return (
          <WxRecord
            isRecording={this.props.isRecording}
            isPlaying={this.props.isPlaying}
            ref='wxRecord'
            key={name}
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
