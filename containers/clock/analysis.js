import React from 'react'
import {Form} from 'react-weui'
import Material from '../../containers/clock/material'
import ThemeConfig from '../../config/theme'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Radio from '../../xz-components/radio'
import CheckBox from '../../xz-components/checkbox'
import Uploader from '../../xz-components/uploader'
import TextArea from '../../xz-components/textarea'
import Audio from '../../xz-components/audio'

export default class extends React.Component {
  formatOptions (optionDTOList) {
    return optionDTOList.map((item, index) => {
      const {tag, content} = item
      return {value: tag, label: `${tag}、${content}`}
    })
  }
  renderAnswerOption (topic, myAnswer) {
    const {id, no, type, optionDTOList} = topic
    if (ToolsUtil.isRadio(type)) {
      const name = `answer_${no}`
      let RadioGroup = optionDTOList.map((item, i) => {
        const {tag, content} = item
        const params = {
          name: name,
          value: tag,
          label: tag + '、' + content,
          defaultValue: myAnswer,
          disabled: true
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
          defaultValue={myAnswer}
          disabled
        />
      )
    } else if (ToolsUtil.isUploader(type)) {
      let defaultValue = [{url: `http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/learning/testFile/${myAnswer}`}]
      return (
        <Uploader
          title='图片上传'
          defaultValue={defaultValue}
          maxCount={1}
          disabled
        />
      )
    } else if (ToolsUtil.isCheckBox(type)) {
      const name = `answer_${no}`
      let options = this.formatOptions(optionDTOList)
      return (
        <CheckBox
          key={name}
          name={name}
          options={options}
          defaultValue={myAnswer}
          disabled
        />
      )
    } else if (ToolsUtil.isRecord(type)) {
      let audioUrl = `http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/learning/testAudio/${myAnswer}.mp3`
      return <Audio idTag={'audio_' + DataUtil.uuid(5)} audioUrl={audioUrl} />
    }
  }
  render () {
    const {topic, myAnswer} = this.props
    return (
      <div className='topic'>
        {!DataUtil.isEmpty(topic.material) && <div className='material'><strong>材料：</strong><Material content={topic.material} /></div>}
        <div className='question'>{topic.no}、{topic.question} （{topic.score}分）</div>
        <div className='options'>
          <div>{this.renderAnswerOption(topic, myAnswer.answer)}</div>
          <div className='analysis'>
            <div className='answer'>
              <span>参考答案：{topic.answer}</span>
            </div>
            <div className='content'>
              <Material content={topic.analysis} />
            </div>
            {!DataUtil.isEmpty(myAnswer.evaluate) && (
              <div className='evaluate'>
              导师点评： {myAnswer.evaluate}
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .topic {
            padding: 1.5rem 1rem;
            border-bottom: 1px solid ${ThemeConfig.color.border};
          }
          .analysis {
            margin-top: 1rem;
            background-color: #efeff4;
            padding: 1rem;
            position: relative;
          }
          .analysis::before {
            content: '';
            position: absolute;
            width: 1rem;
            height: 1rem;
            top: -0.6rem;
            left: 1rem;
            background: #efeff4;
            transform: rotate(-45deg);
          }
          .content {
            margin-top: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .material img {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}
