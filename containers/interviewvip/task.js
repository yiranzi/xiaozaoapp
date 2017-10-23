import React from 'react'
import {Button, Form} from 'react-weui'
import classNames from 'classnames'
import ToolsUtil from '../../util/tools'
import AxiosUtil from '../../util/axios'
import DataUtil from '../../util/data'
import Radio from '../../components/radio'
import CheckBox from '../../components/checkbox'
import Uploader from '../../components/uploader'
import TextArea from '../../components/textarea'
import Audio from '../../components/audio'
import Video from '../../components/video'
import WxRecord from '../../components/wxrecord'
import Loading from '../../components/loading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0, // 当前是第几题
      noPrev: true,
      noNext: this.props.questionList.interviewTopicDTOList.length <= 1,
      answerList: {},
      isSubmit: false,
      canNext: false
    }
  }
  renderMaterialItem (item) {
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
      return item
    }
  }

  // render不同类型的材料
  renderMaterial (material) {
    const _this = this

    // meterial 返回结果有两种，一种是文字材料(字符串)，另一种是“['mp3', 'img', 'mp4']”
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
  }

  formatOptions (optionDTOList) {
    return optionDTOList.map((item, index) => {
      const {tag, content} = item
      return {value: tag, label: `${tag}、${content}`}
    })
  }

  renderAnswerOption (id, dtoItem) {
    const {currentIndex, answerList} = this.state
    const {type, optionDTOList} = dtoItem
    let defaultValue = answerList ? answerList[id] : ''

    if (ToolsUtil.isRadio(type)) {
      const name = `answer_${currentIndex}`
      let RadioGroup = optionDTOList.map((item, i) => {
        const {tag, content} = item
        const params = {
          name: name,
          value: tag,
          label: tag + '、' + content,
          defaultValue: defaultValue
        }
        const key = `answer_${currentIndex}_${i}`
        return (
          <Radio key={key} params={params} onChange={(value) => {
            this.onChange(id, value)
          }} />
        )
      })
      return <Form radio> {RadioGroup}</Form>
    } else if (ToolsUtil.isCheckBox(type)) {
      const name = `answer_${currentIndex}`
      let options = this.formatOptions(optionDTOList)
      return <CheckBox key={name} name={name} defaultValue={defaultValue} options={options} onChange={(value) => this.onChange(id, value)} />
    } else if (ToolsUtil.isUploader(type)) {
      return <Uploader title='请上传您的答案' defaultValue={defaultValue} maxCount={1} onChange={(value) => this.uploadChange(id, value)} />
    } else if (ToolsUtil.isTextarea(type)) {
      return <TextArea placeholder='请输入您的答案' defaultValue={defaultValue} maxLength={1000} onChange={(value) => { this.onChange(id, value) }} />
    } else if (ToolsUtil.isRecord(type)) {
      return <WxRecord ref='wxRecord' defaultValue={defaultValue} onChange={(value) => { this.onChange(id, value) }} />
    }
  }

  renderDTOList (dtoList, questionLength) {
    const {currentIndex, noPrev, noNext} = this.state
    const dtoItem = dtoList[currentIndex] // 当前题目详情
    const {id, material} = dtoItem

    return (
      <div className='dto-list'>
        <div className='material'>
          <div className='title'>材料</div>
          {/* <div className='content'>{this.renderMaterial(material)}</div> */}
        </div>
        <div className='pratice'>
          <div className='title'>练习</div>
          <div className='content'>
            <div className='question'>{dtoItem.no}、{dtoItem.question}</div>
            <div className='options'>
              {this.renderAnswerOption(id, dtoItem)}
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
            {noNext && <Button onClick={() => {
              this.answerComplete()
            }}>提交</Button>}
            {!noNext && <Button onClick={() => {
              this.next(id, questionLength, dtoItem)
            }}>下一题</Button>}
          </div>
        </div>
        <style jsx>{`
          .title {
            font-weight: bold;
            margin: 1rem 0;
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
          }
          .prev, .next {
            flex: 1;
          }
          .next {
            margin-left: 1rem;
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
    const {currentIndex, answerList} = this.state
    const _this = this

    let {type} = dtoItem

    try {
      // 如果是图片或者是录音题目，点击下一题时提交
      if (ToolsUtil.isUploader(type)) {
        let uuid = DataUtil.uuid(6)
        let formdata = DataUtil.imgFormat(answerList[id], uuid, 'jpg')
        console.log('上传图片')
        await AxiosUtil.post('/api/interview/uploadImage', formdata)
        this.onChange(id, `http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/interview/audio/${uuid}`)
      }

      if (ToolsUtil.isRecord(type)) {
        console.log('上传音频')
        this.refs.wxRecord.uploadVoice(answerList[id], (serverId) => {
          _this.onChange(id, serverId)
        })
      }

      const nextIndex = currentIndex + 1

      if (nextIndex >= questionLength - 1) {
        this.setState({currentIndex: nextIndex, noNext: true, noPrev: false})
      } else {
        this.setState({currentIndex: nextIndex, noPrev: false})
      }
    } catch (e) {

    }
  }

  formatAnswerList () {
    const {questionList} = this.props
    const {answerList} = this.state
    return questionList.interviewTopicDTOList.map((item, index) => {
      let id = item.id
      let answer = answerList[id].serverId ? answerList[id].serverId : ''
      return {answer: answer, id: id}
    })
  }

  answerComplete = async () => {
    const {isRecording, isPlaying} = this.state
    if (isRecording) {
      alert('正在录音，请结束录音后提交')
      return
    }
    if (isPlaying) {
      alert('正在播放录音，请结束音频后提交')
      return
    }
    const {answerList} = this.state
    const {interviewTopicDTOList} = this.props.questionList

    if (Object.keys(answerList).length < interviewTopicDTOList.length) {
      alert('当前题目未录音')
      return
    }

    const {topicKey} = this.props.questionList
    let answerListArray = this.formatAnswerList()

    try {
      this.setState({isSubmit: true})
      const data = JSON.stringify({
        answerDTOList: answerListArray,
        time: 30,
        topicKey: topicKey
      })
      this.setState({isSubmit: true})
      await AxiosUtil({
        method: 'post',
        url: '/api/interview/complete',
        data: data
      })
      location.href = `/interview/result?topicKey=${topicKey}`
    } catch (e) {
      this.setState({isSubmit: false})
      alert('提交失败，请重新提交')
    }
  }

  uploadChange (id, value) {
    let dataBase = value[0].url
    this.onChange(id, dataBase)
  }

  onChange = async (id, value) => {
    let {answerList} = this.state
    answerList[id] = answerList[id] || {}
    answerList[id] = value
    this.setState({
      answerList: answerList
    }, () => {
      console.log(JSON.stringify(answerList))
    })
  }

  render () {
    const {isSubmit} = this.state
    const {questionList} = this.props // 题目详情
    const {interviewTopicDTOList} = questionList // interviewTopicDTOList 题目内容数组
    let questionLength = interviewTopicDTOList.length

    return (
      <div className='task'>
        {isSubmit && <Loading />}
        {this.renderDTOList(interviewTopicDTOList, questionLength)}
        <style global jsx>{`
          /* 图片材料样式 */
          .meterial-item img {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}
