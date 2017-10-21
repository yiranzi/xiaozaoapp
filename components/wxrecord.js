import React from 'react'
import AxiosUtil from '../util/axios'

export default class WxRecord extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false, // 正在录音
      isPlaying: false // 正在播放录音
    }
  }

  componentDidMount = async () => {
    const url = `/api/interview/getWXConfig?url=${location.href.split('#')[0]}`
    let wxConfig = await AxiosUtil.get(url)
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
      // 这里需要返回录音的状态----------------------------------------------------
    }
  }
  stopRecord () {
    const {isRecording, isPlaying} = this.state
    const _this = this

    if (isRecording && !isPlaying) {
      wx.stopRecord({
        success: function (res) {
          let localId = res.localId
          _this.setState({isRecording: false}, function () {
            // 这里需要返回录音的状态------------把localId给上一级----------------------------------------
          })
        }
      })
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          _this.setState({isRecording: false}, function () {
            // 这里需要返回录音的状态------------把localId给上一级----------------------------------------
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
  stopVoice (localId, callback) {
    callback = callback || function () {
    }
    const _this = this
    wx.pauseVoice({
      localId: localId,
      success: function () {
        _this.setState({isPlaying: false})
        callback()
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
        _this.onChange(id, localId, serverId)
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
        }} />
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

  renderPlay (localId, isPlaying) {
    return (
      <div className='play'>
        {isPlaying
          ? <img src='/static/img/interview/pause.png' onClick={() => {
            this.stopVoice(localId)
          }} />
          : <img src='/static/img/interview/play.png' onClick={() => {
            this.playVoice(localId)
          }} />
        }
      </div>
    )
  }

  renderRecording (id) {
    return (
      <div className='recording'>
        <img src='/static/img/interview/wx_recording.gif' onClick={() => {
          this.stopRecord(id)
        }} />
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
  render () {
    const {isRecording, isPlaying} = this.state
    return (
      <div>
        <div className='record'>
          {isRecording ? this.renderRecording(id) : this.renderRecord(id, isRecording, isPlaying)}
        </div>
      </div>
    )
  }
}
