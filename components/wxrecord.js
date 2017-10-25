import React from 'react'
import AxiosUtil from '../util/axios'

export default class WxRecord extends React.Component {
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
  stopRecord (isRecording, isPlaying) {
    const _this = this

    if (isRecording && !isPlaying) {
      wx.stopRecord({
        success: function (res) {
          let localId = res.localId
          _this.setState({isRecording: false}, function () {
            // 这里需要返回录音的状态------------把localId给上一级----------------------------------------
            _this.props.updateRecording(false)
            _this.props.onChange(localId)
          })
        }
      })
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          let localId = res.localId
          _this.setState({isRecording: false}, function () {
            // 这里需要返回录音的状态------------把localId给上一级----------------------------------------
            _this.props.updateRecording(false)
            _this.props.onChange(localId)
          })
        }
      })
    }
  }
  checkState () {
    const {isPlaying, isRecording} = this.state
    if (isRecording) {
      alert('正在录音，请结束录音后进入下一题')
      return false
    }

    if (isPlaying) {
      alert('正在播放录音，请停止录音后进入下一题')
      return false
    }

    return true
  }

  uploadVoice (localId, callback) {
    callback = callback || function () {}

    if (this.checkState()) {
      callback()
    }

    wx.uploadVoice({
      localId: localId,
      isShowProgressTips: 1,
      success: function (res) {
        let serverId = res.serverId
        AxiosUtil.get('/api/interview/uploadWechatAudio?serverId=' + serverId)
        callback(serverId)
      }
    })
  }
  
  // 正在录音
  renderRecording (isRecording, isPlaying) {
    return (
      <div className='recording'>
        <img src='/static/img/interview/wx_recording.gif' onClick={() => {
          this.stopRecord(isRecording, isPlaying)
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
  // 开始录音
  renderRecord (isRecording, isPlaying) {
    if (isPlaying) {
      alert('正在播放音频，请结束后开始录音')
      return
    } // 正在播放录好的音频时
    const {defaultValue} = this.props // 录好的声音localId或者是serverId
    return (
      <div className='icon'>
        <img src='/static/img/interview/wx_record.png' onClick={() => {
          this.startRecord(isRecording)
        }} />
        {defaultValue && this.renderPlay(defaultValue, isPlaying)}
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
  // 开始录音调用方法
  startRecord (isRecording) {
    // 没有录音，且没有播放音频，防止重复录音
    if (!isRecording) {
      wx.startRecord()
      // 这里需要返回录音的状态----------------------------------------------------
      this.props.updateRecording(true)
    }
  }
  // 播放录好的声音
  renderPlay (defaultValue, isPlaying) {
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
  // 播放录好的声音
  playVoice (localId) {
    const _this = this
    wx.playVoice({
      localId: localId,
      success: function () {
        _this.props.updatePlaying(true)
      }
    })
    wx.onVoicePlayEnd({
      success: function (res) {
        _this.props.updatePlaying(false)
      }
    })
  }
  // 暂停录好的声音
  stopVoice (localId) {
    const _this = this
    wx.pauseVoice({
      localId: localId,
      success: function () {
        _this.props.updatePlaying(false)
      }
    })
  }
  render () {
    const {isRecording, isPlaying} = this.props
    return (
      <div>
        <div className='record'>
          {isRecording ? this.renderRecording(isRecording, isPlaying) : this.renderRecord(isRecording, isPlaying)}
        </div>
      </div>
    )
  }
}
