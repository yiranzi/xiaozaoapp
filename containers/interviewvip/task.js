import React from 'react'
import {Button, Form} from 'react-weui'
import classNames from 'classnames'
import ToolsUtil from '../../util/tools'
import AxiosUtil from '../../util/axios'
import DataUtil from '../../util/data'
import Radio from '../../components/radio'
import CheckBox from '../../components/checkbox'
import Uploader from '../../components/uploader'
import FixFooter from '../../components/fixfooter'
import TextArea from '../../components/textarea'
import Audio from '../../components/audio'
import Video from '../../components/video'
import WxRecord from '../../components/wxrecord'
import Loading from '../../components/loading'
import ThemeConfig from '../../config/theme'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0, // 当前是第几题
      noPrev: true,
      noNext: this.props.questionList.interviewTopicDTOList.length <= 1,
      answerList: {},
      localIdList: {},
      isSubmit: false,
      isRecording: false,
      isPlaying: false,
      isShowResource: true
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
    try {
      // meterial 返回结果有两种，一种是文字材料(字符串)，另一种是“['mp3', 'img', 'mp4']”
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
        <div className='meterial-item'>
          {_this.renderMaterialItem(material)}
        </div>
      )
    }
  }
  renderResourceGroup (resource) {
    const content = (
      <Button className='enter' onClick={() => { this.toTask() }}>答 题</Button>
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
    this.setState({isShowResource: false})
  }
  toMaterial () {
    this.setState({isShowResource: true})
  }
  formatOptions (optionDTOList) {
    return optionDTOList.map((item, index) => {
      const {tag, content} = item
      return {value: tag, label: `${tag}、${content}`}
    })
  }

  renderAnswerOption (id, dtoItem) {
    const {currentIndex, answerList, localIdList} = this.state
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
      return (
        <CheckBox
          key={name}
          name={name}
          defaultValue={defaultValue}
          options={options}
          onChange={(value) => this.onChange(id, value)} />
      )
    } else if (ToolsUtil.isUploader(type)) {
      defaultValue = defaultValue ? [{url: defaultValue}] : []
      return (
        <Uploader
          title='图片上传'
          defaultValue={defaultValue}
          maxCount={1}
          onChange={(value) => this.uploadChange(id, value)} />
      )
    } else if (ToolsUtil.isTextarea(type)) {
      const name = `answer_${currentIndex}`
      return (
        <TextArea
          key={name}
          placeholder='请输入您的答案'
          defaultValue={defaultValue}
          maxLength={200}
          onChange={(value) => { this.onChange(id, value) }}
        />
      )
    } else if (ToolsUtil.isRecord(type)) {
      const {isRecording, isPlaying} = this.state
      defaultValue = localIdList ? localIdList[id] : ''
      const name = `answer_${currentIndex}`
      return (
        <WxRecord
          ref='wxRecord'
          key={name}
          defaultValue={defaultValue}
          isRecording={isRecording}
          isPlaying={isPlaying}
          updateRecording={(state) => this.updateRecording(state)}
          updatePlaying={(state) => this.updatePlaying(state)}
          onChange={(value) => { this.onChange(id, value) }} />
      )
    }
  }

  updatePlaying (state) {
    this.setState({isPlaying: state})
  }

  renderDTOList (dtoList, questionLength) {
    const {currentIndex, noPrev, noNext} = this.state
    const dtoItem = dtoList[currentIndex] // 当前题目详情
    const {id, material} = dtoItem

    return (
      <div className='dto-list'>
        <div className='pratice'>
          <div className='title'><span onClick={() => {this.toMaterial()}}>查看材料</span></div>
          <div className='content'>
            {this.renderMaterial(material)}
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
                this.prev(id, questionLength, dtoItem)
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
            color: ${ThemeConfig.color.blue};
            margin: 1rem 0;
          }
          .title span {
            border: 1px solid ${ThemeConfig.color.blue};
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
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

  prev (id, questionLength, dtoItem) {
    let {type} = dtoItem
    const {currentIndex} = this.state
    if (ToolsUtil.isRecord(type)) {
      if (this.refs.wxRecord.checkState()) {
        this.goToPrevTopic(currentIndex, questionLength)
      }
    } else {
      this.goToPrevTopic(currentIndex, questionLength)
    }
  }
  goToPrevTopic (currentIndex, questionLength) {
    const prevIndex = currentIndex - 1

    if (prevIndex <= 0) {
      this.setState({currentIndex: prevIndex, noNext: false, noPrev: true})
    } else {
      this.setState({currentIndex: prevIndex, noNext: false})
    }
  }

  next = async (id, questionLength, dtoItem) => {
    const {currentIndex, answerList, isRecording, isPlaying} = this.state
    const _this = this

    let {type} = dtoItem

    if (isRecording) {
      alert('正在录音，停止录音后进入下一题')
      return
    }

    if (isPlaying) {
      alert('正在播放音频，停止后进入下一题')
      return
    }

    try {
      // 如果是图片或者是录音题目，点击下一题时提交
      if (ToolsUtil.isUploader(type)) {
        // 图片还没有上传
        if (answerList[id] && answerList[id].indexOf('xiaozaoresource') < 0) {
          this.setState({isSubmit: true})
          let uuid = DataUtil.uuid(11)
          let formdata = DataUtil.imgFormat(answerList[id], uuid, 'jpg')
          await AxiosUtil.post('/api/interview/uploadImage', formdata)
          this.onChange(id, `http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/interview/image/${uuid}.jpg`)
          this.setState({isSubmit: false})
          this.goToNextTopic(currentIndex, questionLength)
        } else {
          this.goToNextTopic(currentIndex, questionLength)
        }
      } else if (ToolsUtil.isRecord(type)) {
        // 如果有录音，而且是localId, 上传
        // 专门处理－－－－－安卓和ios不同情况
        if (answerList[id] && (answerList[id].indexOf('wxLocalResource') >= 0 || answerList[id].indexOf('weixin://resourceid') >= 0)) {
          this.setState({isSubmit: true})
          this.refs.wxRecord.uploadVoice(answerList[id], (localId, serverId) => {
            if (serverId) {
              _this.updateLocalId(id, localId) // 这个是为了保存音频的localId
              _this.onChange(id, serverId)
              _this.setState({isSubmit: false})
              this.goToNextTopic(currentIndex, questionLength)
            }
          })
        } else {
          this.goToNextTopic(currentIndex, questionLength)
        }
      } else {
        this.goToNextTopic(currentIndex, questionLength)
      }
    } catch (e) {
    }
  }

  goToNextTopic (currentIndex, questionLength) {
    const nextIndex = currentIndex + 1

    if (nextIndex >= questionLength - 1) {
      this.setState({currentIndex: nextIndex, noNext: true, noPrev: false})
    } else {
      this.setState({currentIndex: nextIndex, noPrev: false})
    }
  }

  formatAnswerList () {
    const {questionList} = this.props
    const {answerList} = this.state
    return questionList.interviewTopicDTOList.map((item, index) => {
      let id = item.id
      let answer = answerList ? answerList[id] : ''
      return {answer: answer, id: id}
    })
  }

  answerComplete = async () => {
    const {answerList} = this.state
    const {interviewTopicDTOList} = this.props.questionList

    if (Object.keys(answerList).length < interviewTopicDTOList.length) {
      alert('有部分题目未完成，请检查后重新')
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

      await AxiosUtil.post('/api/interview/complete', data)
      alert('提交成功')
      location.href = `/interviewvip/result?topicKey=${topicKey}`
    } catch (e) {
      this.setState({isSubmit: false})
      alert('提交失败，请重新提交')
    }
  }

  uploadChange (id, value) {
    let dataBase = value[0].url
    this.onChange(id, dataBase)
  }

  updateLocalId (id, localId) {
    let {localIdList} = this.state
    localIdList[id] = localIdList[id] || {}
    localIdList[id] = localId
    this.setState({
      localIdList: localIdList
    }, () => {
      console.log(JSON.stringify(localIdList))
    })
  }

  updateRecording (state) {
    this.setState({isRecording: state})
  }

  checkIfIsLast = async (id, value) => {
    const _this = this
    if (value.indexOf('data:image') >= 0) {
      let uuid = DataUtil.uuid(11)
      let formdata = DataUtil.imgFormat(value, uuid, 'jpg')
      await AxiosUtil.post('/api/interview/uploadImage', formdata)

      let {answerList} = this.state
      answerList[id] = answerList[id] || {}
      answerList[id] = `http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/interview/image/${uuid}.jpg`
      this.setState({
        answerList: answerList
      }, () => {
        console.log(JSON.stringify(answerList))
      })
    }else if (value.indexOf('wxLocalResource') >= 0 || value.indexOf('weixin://resourceid') >= 0) {
      this.setState({isRecording: false}, () => {
        this.refs.wxRecord.uploadVoice(value, (localId, serverId) => {
          if (serverId) {
            _this.updateLocalId(id, localId) // 这个是为了保存音频的localId

            let {answerList} = this.state
            answerList[id] = answerList[id] || {}
            answerList[id] = serverId
            this.setState({
              answerList: answerList
            }, () => {
              console.log(JSON.stringify(answerList))
            })
          }
        })
      })
    } else {
      let {answerList} = this.state
      answerList[id] = answerList[id] || {}
      answerList[id] = value
      this.setState({
        answerList: answerList
      }, () => {
        console.log(JSON.stringify(answerList))
      })
    }
  }

  // 如果最后一题是录音或者是上传图片，直接上传
  onChange (id, value) {
    const {noNext} = this.state
    if (noNext) {
      this.checkIfIsLast(id, value)
    } else {
      let {answerList} = this.state
      answerList[id] = answerList[id] || {}
      answerList[id] = value
      // 如果是音频更新localId
      if (value.indexOf('wxLocalResource') >= 0 || value.indexOf('weixin://resourceid') >= 0) {
        this.updateLocalId(id, value)
      }
      this.setState({
        answerList: answerList
      }, () => {
        console.log(JSON.stringify(answerList))
      })
    }
  }

  render () {
    const {isSubmit, isShowResource} = this.state
    const {questionList} = this.props // 所有题目信息
    const {interviewTopicDTOList, resource} = questionList // interviewTopicDTOList 题目内容数组
    let questionLength = interviewTopicDTOList.length // 总共有多少题目

    return (
      <div className='task'>
        {isSubmit && <Loading />}
        {isShowResource && this.renderResourceGroup(resource)}
        {!isShowResource && this.renderDTOList(interviewTopicDTOList, questionLength)}
        <style global jsx>{`
          /* 图片材料样式 */
          .meterial-item img {
            width: 100%;
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
