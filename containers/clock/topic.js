import React from 'react'
import {Form} from 'react-weui'
import ThemeConfig from '../../config/theme'
import ToolsUtil from '../../util/tools'
import Radio from '../../xz-components/radio'
import CheckBox from '../../xz-components/checkbox'
import Uploader from '../../xz-components/uploader'
import TextArea from '../../xz-components/textarea'
import WxRecord from '../../xz-components/wxrecord'

export default class extends React.Component {
  formatOptions (optionDTOList) {
    return optionDTOList.map((item, index) => {
      const {tag, content} = item
      return {value: tag, label: `${tag}、${content}`}
    })
  }
  renderAnswerOption (topic, disabled) {
    const {id, no, type, optionDTOList} = topic
    if (ToolsUtil.isRadio(type)) {
      const name = `answer_${no}`
      let RadioGroup = optionDTOList.map((item, i) => {
        const {tag, content} = item
        const params = {
          name: name,
          value: tag,
          label: tag + '、' + content
        }
        const key = `answer_${no}_${i}`
        return (
          <Radio key={key} params={params} onChange={(value) => {
            this.props.onChange(id, value)
          }} />
        )
      })
      return <Form radio> {RadioGroup}</Form>
    } else if (ToolsUtil.isTextarea(type)) {
      const name = `answer_${no}`
      return (
        <TextArea
          key={name}
          placeholder='请输入您的答案'
          maxLength={200}
          onChange={(value) => { this.props.onChange(id, value) }}
        />
      )
    } else if (ToolsUtil.isUploader(type)) {
      let defaultValue = []
      return (
        <Uploader
          title='图片上传'
          defaultValue={defaultValue}
          maxCount={1}
          onChange={(value) => this.props.onChange(id, value[0].url)} />
      )
    } else if (ToolsUtil.isCheckBox(type)) {
      const name = `answer_${no}`
      let options = this.formatOptions(optionDTOList)
      return (
        <CheckBox
          key={name}
          name={name}
          options={options}
          onChange={(value) => this.props.onChange(id, value)} />
      )
    } else if (ToolsUtil.isRecord(type)) {
      const {isRecording, isPlaying} = this.state
      const name = `answer_${no}`
      return (
        <WxRecord
          ref='wxRecord'
          key={name}
          isRecording={isRecording}
          isPlaying={isPlaying}
          updateRecording={(state) => this.updateRecording(state)}
          updatePlaying={(state) => this.updatePlaying(state)}
          onChange={(value) => { this.props.onChange(id, value) }} />
      )
    }
  }
  render () {
    const {topic} = this.props
    return (
      <div className='topic'>
        <div className='question'>{topic.no}、{topic.question} （{topic.score}分）</div>
        <div className='options'>
          <div>{this.renderAnswerOption(topic)}</div>
        </div>
        <style jsx>{`
          .topic {
            padding: 1.5rem 1rem;
            border-bottom: 1px solid ${ThemeConfig.color.border};
          }
        `}</style>
      </div>
    )
  }
}
