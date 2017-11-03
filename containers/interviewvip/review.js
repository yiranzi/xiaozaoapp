import React from 'react'
import {Button, Form} from 'react-weui'
import classNames from 'classnames'
import ToolsUtil from '../../util/tools'
import Radio from '../../components/radio'
import CheckBox from '../../components/checkbox'
import FixFooter from '../../components/fixfooter'
import TextArea from '../../components/textarea'
import Audio from '../../components/audio'
import Video from '../../components/video'
import Loading from '../../components/loading'
import Back from '../../components/back'
import ThemeConfig from '../../config/theme'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0, // 当前是第几题
      noPrev: true,
      noNext: this.props.questionList.interviewTopicDTOList.length <= 1,
      answerList: {},
      isShowResource: true,
      scrollTop: 0
    }
  }
  renderMaterialItem (item) {
    if (!item) { return item }
    // 图片材料
    if (ToolsUtil.isImg(item)) {
      return <img src={item} />
    } else if (ToolsUtil.isMp3(item)) {
      // 音频材料
      let idTag = `audio-${Math.random().toString(36).substr(2)}`
      return <Audio idTag={idTag} audioUrl={item} />
    } else if (ToolsUtil.isMp4(item)) {
      // 视频材料
      return <Video videoUrl={item} />
    } else if (ToolsUtil.isString(item)) {
      // 文字材料
      return <div dangerouslySetInnerHTML={{__html: item}} />
    }
  }

  // render不同类型的材料
  renderMaterial (material) {
    const _this = this

    // meterial 返回结果有两种，一种是文字材料(字符串)，另一种是“['mp3', 'img', 'mp4']”
    try {
      // eslint-disable-next-line
      let meterialArray = eval(material)
      if (meterialArray) {
        // 是一个数组
        return meterialArray.map((item, index) => {
          return (
            <div key={index} className='meterial-item'>
              {_this.renderMaterialItem(item)}
            </div>
          )
        })
      } else {
        // 字符串
        return (
          <div className='meterial-item'>
            {_this.renderMaterialItem(material)}
          </div>
        )
      }
    } catch (e) {
      return (
        <div className='meterial-item'>{this.renderMaterialItem(material)}</div>
      )
    }
    
  }
  renderResourceGroup (resource) {
    const content = (
      <Button className='enter' onClick={() => { this.toTask() }}>查看题目</Button>
    )
    return (
      <div className='resource'>
        <div className='title'>阅读材料</div>
        <div className='content'>{this.renderMaterial(resource)}</div>
        <FixFooter content={content} />
        <style jsx>{`
          .title {
            font-weight: bold;
            margin-top: 1rem;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 0.5rem;
          }
          .content {
            margin-bottom: 5rem;
          }
        `}</style>
      </div>
    )
  }
  toTask () {
    this.setState({isShowResource: false, scrollTop: window.scrollY})
  }
  toMaterial () {
    const { scrollTop } = this.state
    this.setState({isShowResource: true}, () => {
      window.scrollTo(0, scrollTop)
    })
  }
  formatOptions (optionDTOList) {
    return optionDTOList.map((item, index) => {
      const {tag, content} = item
      return {value: tag, label: `${tag}、${content}`}
    })
  }
  getAnswerList (answerDTOList) {
    let json = {}
    answerDTOList.map((item, index) => {
      json[item.id] = item.answer
    })
    return json
  }

  renderAnswerOption (id, answerDTOList, dtoItem) {
    const {currentIndex} = this.state
    const {type, optionDTOList} = dtoItem
    let answerList = this.getAnswerList(answerDTOList)
    let defaultValue = answerList[id]

    if (ToolsUtil.isRadio(type)) {
      const name = `answer_${currentIndex}`
      let RadioGroup = optionDTOList.map((item, i) => {
        const {tag, content} = item
        const params = {
          name: name,
          value: tag,
          label: tag + '、' + content,
          defaultValue: defaultValue,
          disabled: true
        }
        const key = `answer_${currentIndex}_${i}`
        return (
          <Radio key={key} params={params} />
        )
      })
      return <Form radio> {RadioGroup}</Form>
    } else if (ToolsUtil.isCheckBox(type)) {
      const name = `answer_${currentIndex}`
      let options = this.formatOptions(optionDTOList)
      return (
        <CheckBox
          key={name}
          name={name}
          defaultValue={defaultValue}
          options={options}
          disabled
        />
      )
    } else if (ToolsUtil.isUploader(type)) {
      return <img src={defaultValue} style={{width: '100%'}} />
    } else if (ToolsUtil.isTextarea(type)) {
      const name = `answer_${currentIndex}`
      return (
        <TextArea
          key={name}
          placeholder='请输入您的答案'
          defaultValue={defaultValue}
          maxLength={200}
          disabled
        />
      )
    } else if (ToolsUtil.isRecord(type)) {
      const name = `answer_${currentIndex}`
      let audioUrl = `http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/interview/audio/${defaultValue}.mp3`
      return (
        <Audio key={name} idTag={name} audioUrl={audioUrl} />
      )
    }
  }
  renderAnalysis (dtoItem) {
    const {answer, analysis, accuracy} = dtoItem
    return (
      <div className='detail'>
        {answer && <span className='answer'><strong>参考答案：</strong>{answer}</span>}
        <div>
          {answer && (
            <span className='rate'>
              <strong>本题难度：</strong>内测获得400+回答，正确率为{accuracy}%</span>)
          }
        </div>
        {analysis && (
          <div className='analysis'>
            <div><strong>参考解析：</strong></div>
            <div>{this.renderMaterial(analysis)}</div>
          </div>
        )}
      </div>
    )
  }

  renderDTOList (dtoList, answerDTOList, questionLength) {
    const {currentIndex, noPrev, noNext} = this.state
    const dtoItem = dtoList[currentIndex] // 当前题目详情
    const {id, material} = dtoItem

    return (
      <div className='dto-list'>
        <div className='pratice'>
          <div className='title'>
            <div onClick={() => { this.toMaterial() }}><Back direct='left' text='查看材料' /></div>
            <a href={`/interviewvip/result?topicKey=${this.props.questionList.topicKey}`}><Back direct='right' text='推荐阅读' /></a>
          </div>
          <div className='content'>
            {this.renderMaterial(material)}
            <div className='question'>{dtoItem.no}、{dtoItem.question}</div>
            <div className='options'>
              {this.renderAnswerOption(id, answerDTOList, dtoItem)}
            </div>
            <div className='analysis'>
              {this.renderAnalysis(dtoItem)}
            </div>
          </div>
        </div>
        <div className='action'>
          {noPrev && (<div className='prev disabled'><Button>上一题</Button></div>)}
          {!noPrev && (
            <div className={classNames({prev: true, disabled: this.state.noPrev})}>
              <Button onClick={() => {
                this.prev(id, questionLength)
              }}>上一题</Button>
            </div>
          )}
          <div className='next'>
            {noNext && (<div className='next disabled'><Button>下一题</Button></div>)}
            {!noNext && <Button onClick={() => {
              this.next(id, questionLength, dtoItem)
            }}>下一题</Button>}
          </div>
        </div>
        <style jsx>{`
          .title {
            color: ${ThemeConfig.color.blue};
            margin: 1rem 0;
            display: flex;
            justify-content: space-between;
          }
          .title span {
            border: 1px solid ${ThemeConfig.color.blue};
            padding: 0.1rem 0.5rem;
            border-radius: 1rem;
            display: inline-block;
          }
          .title a {
            color: ${ThemeConfig.color.blue};
            display: inline-block;
          }
          .material .title {
            display: flex;
            justify-content: space-between;
          }
          .option-item {
            margin-top: 0.5rem;
          }
          .pratice {
            margin-bottom: 5rem;
          }
          .action {
            display: flex;
            justify-content: center;
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            padding: 1rem 2rem;
            box-sizing: border-box;
            background: #F9F9F9;
            z-index: 99;
          }
          .prev, .next {
            flex: 1;
          }
          .next {
            margin-left: 1rem;
          }
          .content {
            border-top: 1px solid ${ThemeConfig.color.border};
            padding-top: 1rem;
          }
          .content .question {
            font-weight: bold;
          }
          .content .analysis {
            border-top: 1px solid ${ThemeConfig.color.border};
            padding-top: 1rem;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    )
  }

  prev (id, questionLength) {
    const {currentIndex} = this.state
    const prevIndex = currentIndex - 1

    if (prevIndex <= 0) {
      this.setState({currentIndex: prevIndex, noNext: false, noPrev: true})
    } else {
      this.setState({currentIndex: prevIndex, noNext: false})
    }
  }

  next = async (id, questionLength, dtoItem) => {
    const {currentIndex} = this.state

    const nextIndex = currentIndex + 1

    if (nextIndex >= questionLength - 1) {
      this.setState({currentIndex: nextIndex, noNext: true, noPrev: false})
    } else {
      this.setState({currentIndex: nextIndex, noPrev: false})
    }
  }
  render () {
    const {isSubmit, isShowResource} = this.state
    const {questionList} = this.props // 所有题目信息
    const {resource, interviewTopicDTOList, answerDTOList} = questionList // interviewTopicDTOList 题目内容数组
    let questionLength = interviewTopicDTOList.length // 总共有多少题目

    return (
      <div className='task'>
        {isSubmit && <Loading />}
        {isShowResource && this.renderResourceGroup(resource)}
        {!isShowResource && this.renderDTOList(interviewTopicDTOList, answerDTOList, questionLength)}
        <style global jsx>{`
          .meterial-item {
            margin-bottom: 1rem;
          }
          /* 图片材料样式 */
          .meterial-item img {
            width: 100% !important;
          }
          .meterial-item span {
            width: 100% !important;
          }
          .weui-btn_primary.enter,
          .weui-btn_primary.enter:not(.weui-btn_disabled):active {
            width: 50%;
            background-color: ${ThemeConfig.color.blue};
          }
        `}</style>
      </div>
    )
  }
}
