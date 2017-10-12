import React from 'react'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false, // 正在录音
      isPlaying: false, // 正在播放录音
      localId: '',
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
      // wx.startRecord()
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
          _this.uploadVoice()
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

  playRecord () {
    const {isRecording, isPlaying, localId} = this.state
    if (!isRecording) {
      if (isPlaying) {
        wx.pauseVoice({
          localId: localId
        });
      }
      wx.playVoice({
        localId: localId
      })
    }
  }

  uploadVoice () {
    const {localId} = this.state
    const _this = this
    wx.uploadVoice({
      localId: localId,
      isShowProgressTips: 1,
      success: function (res) {
        _this.setState({serverId: res.serverId})
        console.log(res.serverId)
        _this.props.onChange(res.serverId)
      }
    })
  }

  renderRecord () {
    const {localId} = this.state
    return (
      <div className='record'>
        <img src='/static/img/interview/record.png' onClick={() => {
          this.startRecord()
        }}/>
        {localId && <div>播放</div>}
        <style jsx>{`
          .record {
            text-align: center;
          }
        `}</style>
      </div>
    )
  }

  renderRecording () {
    return (
      <div className='recording'>
        <img src='/static/img/interview/recording.gif' onClick={() => {
          this.stopRecord()
        }}/>
        <style jsx>{`
          .recording {
            text-align: center;
          }
        `}</style>
      </div>
    )
  }

  render () {
    const {isRecording} = this.state
    return (
      <div>
        <div className='record'>
          {isRecording ? this.renderRecording() : this.renderRecord()}
        </div>
      </div>
    )
  }
}
