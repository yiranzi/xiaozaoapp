import React from 'react'
import AxiosUtil from '../util/axios'

export default class WxRecord extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false, // 正在录音
      isPlaying: false, // 正在播放录音
      defaultValue: this.props.defaultValue
    }
  }

  componentDidMount = async () => {
    const url = `/api/interview/getWXConfig?url=${location.href.split('#')[0]}`
    let wxConfig = await AxiosUtil.get(url)
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
      // 这里需要返回录音的状态----------------------------------------------------
      this.setState({isRecording: true})
    }
  }
  stopRecord () {
    const {isRecording, isPlaying} = this.state
    const _this = this

    if (isRecording && !isPlaying) {
      wx.stopRecord({
        success: function (res) {
          let localId = res.localId
          _this.setState({isRecording: false, defaultValue: localId}, function () {
            // 这里需要返回录音的状态------------把localId给上一级----------------------------------------
            _this.props.onChange(localId)
          })
        }
      })
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          let localId = res.localId
          _this.setState({isRecording: false, defaultValue: localId}, function () {
            _this.props.onChange(localId)
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
    callback = callback || function () {}
    const _this = this
    wx.pauseVoice({
      localId: localId,
      success: function () {
        _this.setState({isPlaying: false})
        callback()
      }
    })
  }
  uploadVoice (localId, callback) {
    callback = callback || function () {}
    const _this = this
    console.log('component uploadVoice')
    const {isPlaying, isRecording} = this.state

    if (isRecording) {
      alert('正在录音，请结束录音后进入下一题')
      return
    }

    if (isPlaying) {
      alert('正在播放录音，请停止录音后进入下一题')
      return
    }

    wx.uploadVoice({
      localId: localId,
      isShowProgressTips: 1,
      success: function (res) {
        let serverId = res.serverId
        AxiosUtil({method: 'get', url: '/api/interview/uploadWechatAudio?serverId=' + serverId})
        callback(serverId)
      }
    })
  }
  renderRecord (id, isRecording, isPlaying) {
    const {defaultValue} = this.state
    return (
      <div className='icon'>
        <img src='/static/img/interview/wx_record.png' onClick={() => {
          this.startRecord()
        }} />
        {defaultValue && this.renderPlay()}
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

  renderPlay () {
    const {defaultValue, isPlaying} = this.state
    return (
      <div className='play'>
        {isPlaying
          ? <img src='/static/img/interview/pause.png' onClick={() => {
            this.stopVoice(defaultValue)
          }} />
          : <img src='/static/img/interview/play.png' onClick={() => {
            this.playVoice(defaultValue)
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
          {isRecording ? this.renderRecording() : this.renderRecord()}
        </div>
      </div>
    )
  }
}
