import React from 'react'
import {Button} from 'react-weui'
import classNames from 'classnames'
import ToolsUtil from '../../util/tools'
import AxiosUtil from '../../util/axios'
import Radio from '../../components/radio'
import Audio from '../../components/audio'
import Loading from '../../components/loading'
import TimeDown from '../../components/timedown'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      noPrev: true,
      noNext: false,
      answerList: {},
      isSubmit: false,
      canNext: false,
      isRecording: false, // 正在录音
      isPlaying: false, // 正在播放录音
      serverId: ''
    }
  }

  componentDidMount = async () => {
    const url = `/api/interview/getWXConfig?url=${location.href.split('#')[0]}`
    let wxConfig = await AxiosUtil({method: 'get', url: url})
    wxConfig.debug = true
    wxConfig.jsApiList = [
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'downloadVoice'
    ]
    wx.config(wxConfig)
    wx.ready(function () {
      console.log('微信认证成功')
    })
    wx.error(function (res) {
      console.log('微信认证失败')
      console.log(res)
    })
  }

  startRecord () {
    const {isRecording, isPlaying} = this.state
    // 没有录音，且没有播放音频
    if (!isRecording && !isPlaying) {
      wx.startRecord()
      this.setState({isRecording: true})
    }
  }

  stopRecord (id) {
    const {isRecording, isPlaying} = this.state
    const _this = this
    if (isRecording && !isPlaying) {
      wx.stopRecord({
        success: function (res) {
          let localId = res.localId
          _this.setState({isRecording: false}, function () {
            _this.uploadVoice(id, localId)
          })
        }
      })
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          let localId = res.localId
          _this.setState({isRecording: false}, function () {
            _this.uploadVoice(id, localId)
          })
        }
      })
    }
  }

  playVoice (localId) {
    const _this = this
    wx.playVoice({
      localId: localId,
      success: function () {
        _this.setState({isPlaying: true})
      }
    })
    wx.onVoicePlayEnd({
      success: function (res) {
        _this.setState({isPlaying: false})
      }
    })
  }

  stopVoice (localId) {
    const _this = this
    wx.pauseVoice({
      localId: localId,
      success: function () {
        _this.setState({isPlaying: false})
      }
    })
  }

  uploadVoice (id, localId) {
    const _this = this
    this.setState({canNext: true})

    wx.uploadVoice({
      localId: localId,
      isShowProgressTips: 1,
      success: function (res) {
        let serverId = res.serverId
        AxiosUtil({method: 'get', url: '/api/interview/uploadWechatAudio?serverId=' + serverId})
        _this.setState({serverId: serverId}, function () {
          _this.onChange(id, localId, serverId)
        })
      }
    })
  }

  renderRecord (id, isRecording, isPlaying) {
    const {answerList} = this.state

    let localId
    if (answerList[id]) {
      localId = answerList[id].localId
    }

    return (
      <div className='icon'>
        <img src='/static/img/interview/wx_record.png' onClick={() => {
          this.startRecord()
        }}/>
        {localId && !isRecording && this.renderPlay(localId, isPlaying)}
        <style jsx>{`
          .icon {
            text-align: center;
            display: flex;
            margin-left: 50%;
            transform: translateX(-50%);
          }
        `}</style>
      </div>
    )
  }

  renderRecording (id) {
    return (
      <div className='recording'>
        <img src='/static/img/interview/wx_recording.gif' onClick={() => {
          this.stopRecord(id)
        }}/>
        <style jsx>{`
          .recording {
            text-align: center;
            display: flex;
            margin-left: 50%;
            transform: translateX(-50%);
          }
        `}</style>
      </div>
    )
  }

  renderPlay (localId, isPlaying) {
    return (
      <div className='play'>
        {isPlaying
          ? <img src='/static/img/interview/pause.png' onClick={() => {
            this.stopVoice(localId)
          }}/>
          : <img src='/static/img/interview/play.png' onClick={() => {
            this.playVoice(localId)
          }}/>
        }
      </div>
    )
  }

  wxRecord (id) {
    const {isRecording, isPlaying} = this.state
    return (
      <div>
        <div className='record'>
          {isRecording ? this.renderRecording(id) : this.renderRecord(id, isRecording, isPlaying)}
        </div>
      </div>
    )
  }

  renderMaterial (meterial) {
    let meterialArray = eval(meterial)
    return meterialArray.map((item, index) => {
      if (ToolsUtil.isImg(item)) {
        return <div key={index} className='meterial-item'>
          <img src={item}/>
          <style jsx>{`
            img {
              width: 100%;
            }
          `}</style>
        </div>
      } else if (ToolsUtil.isMp3(item)) {
        return <div key={index} className='meterial-item'>
          <Audio src={item}/>
        </div>
      }
    })
  }

  renderAnswerOption (id, DTOList) {
    const {index, answerList} = this.state
    const isVoice = DTOList[index].voice
    if (isVoice) {
      return <div>{this.wxRecord(id)}</div>
    } else {
      const name = `answer_${index}`
      const options = DTOList[index].optionDTOList

      return options.map((item, i) => {
        const {tag, content} = item
        const params = {
          name: name,
          value: tag,
          label: tag + '、' + content,
          defaultValue: answerList[id]
        }
        const key = `answer_${index}_${i}`
        return (
          <Radio key={key} params={params} onChange={(value) => {
            this.onChange(id, '', value)
          }}/>
        )
      })
    }
  }

  renderDTOList () {
    const {questionList} = this.props
    const {interviewTopicDTOList} = questionList
    const {index} = this.state
    const {id, material, question} = interviewTopicDTOList[index]
    const questionLength = question.length
    return (
      <div className='dto-list'>
        <div className='material'>
          <div className='title'>材料<TimeDown limitTime={questionList.limitTime} timeDown={() => {
            this.timeDown()
          }}/></div>
          <div className='content'>{this.renderMaterial(material)}</div>
        </div>
        <div className='pratice'>
          <div className='title'>练习</div>
          <div className='content'>
            <div className='question'>{interviewTopicDTOList[index].no}、{interviewTopicDTOList[index].question}</div>
            <div className='options'>
              {this.renderAnswerOption(id, interviewTopicDTOList)}
            </div>
          </div>
        </div>
        <div className='action'>
          <div className={classNames({prev: true, disabled: this.state.noPrev})}>
            <Button onClick={() => {
              this.prev(questionLength)
            }}>上一题</Button>
          </div>
          <div className='next'>
            {this.state.noNext
              ? <Button onClick={() => {
                this.answerComplete()
              }}>提交</Button>
              : <Button onClick={() => {
                this.next(id, questionLength, interviewTopicDTOList)
              }}>下一题</Button>
            }
          </div>
        </div>
        <style jsx>{`
          .title {
            font-weight: bold;
            margin: 1rem 0;
          }
          .option-item {
            margin-top: 0.5rem;
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

  timeDown () {
    this.answerComplete()
  }

  needRecord (value) {
    this.setState({nextTopic: value})
  }

  prev (questionLength) {
    const {index} = this.state
    const prevIndex = index - 1

    if (prevIndex <= 0) {
      this.setState({index: prevIndex, noNext: false, noPrev: true})
    } else {
      this.setState({index: prevIndex, noNext: false})
    }
  }

  next (id, questionLength, DTOList) {
    const {index} = this.state
    const nextIndex = index + 1
    const isVoice = DTOList[index].voice

    if (isVoice) {
      const {answerList, isRecording, isPlaying} = this.state
      let localId = answerList[id] ? answerList[id].localId : ''
      if (isRecording) {
        alert('正在录音，请结束录音后提交')
        this.setState({canNext: false})
        return
      }
      if (!localId) {
        alert('请先录音')
        this.setState({canNext: false})
        return
      }
      if (isPlaying) {
        this.stopVoice(localId)
      }
      if (nextIndex <= questionLength - 1) {
        this.setState({index: nextIndex, noNext: true, noPrev: false})
      } else {
        this.setState({index: nextIndex, noPrev: false})
      }
    } else {
      if (nextIndex <= questionLength - 1) {
        this.setState({index: nextIndex, noNext: true, noPrev: false})
      } else {
        this.setState({index: nextIndex, noPrev: false})
      }
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

  onChange (id, localId, serverId) {
    let {answerList} = this.state
    answerList[id] = answerList[id] || {}
    answerList[id].localId = localId
    answerList[id].serverId = serverId
    this.setState({
      answerList: answerList
    })
  }

  render () {
    const {isSubmit} = this.state

    return (
      <div className='standard'>
        {isSubmit && <Loading/>}
        {this.renderDTOList()}
      </div>
    )
  }
}
