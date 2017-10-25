import React from 'react'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false, // 正在录音
      isPlaying: false, // 正在播放录音
      localId: this.props.defaultValue,
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

  stopRecord () {
    const {isRecording, isPlaying} = this.state
    const _this = this
    if (isRecording && !isPlaying) {
      wx.stopRecord({
        success: function (res) {
          _this.setState({localId: res.localId})
        }
      })
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          _this.setState({localId: res.localId})
        }
      })
      this.setState({isRecording: false})
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
        _this.setState({isPlaying: true})
      }
    })
  }

  stopVoice (localId) {
    wx.pauseVoice({
      localId: localId
    })
  }

  uploadVoice () {
    const {localId, isRecording, isPlaying} = this.state
    const _this = this
    if (isRecording) {
      alert('正在录音，请结束录音后提交')
      return
    }
    if (!localId) {
      alert('请先录音')
      return
    }
    if (isPlaying) {
      this.playRecord()
    }
    wx.uploadVoice({
      localId: localId,
      isShowProgressTips: 1,
      success: function (res) {
        _this.setState({localId: localId, serverId: res.serverId})
        console.log(res.serverId)
        _this.props.onChange(res.serverId)
      }
    })
  }

  renderRecord (localId, isRecording, isPlaying) {
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

  renderRecording () {
    return (
      <div className='recording'>
        <img src='/static/img/interview/wx_recording.gif' onClick={() => {
          this.stopRecord()
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

  render () {
    const {localId, isRecording, isPlaying} = this.state
    return (
      <div>
        <div className='record'>
          {isRecording ? this.renderRecording() : this.renderRecord(localId, isRecording, isPlaying)}
        </div>
      </div>
    )
  }
}
