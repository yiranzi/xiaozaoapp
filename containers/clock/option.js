import React from 'react'
import ThemeConfig from '../../config/theme'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Uploader from '../../xz-components/uploader'
import TextArea from '../../xz-components/textarea'
import WxRecord from '../../xz-components/wxrecord'

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
      return (
        <WxRecord
          ref='wxRecord'
          key={name}
          onChange={(value) => { this.props.onChange(id, value) }} />
      )
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
