import React from 'react'
import {Button} from 'react-weui'
import InterviewLayout from '../../containers/interview/layout'
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
      wx.startRecord()
    }
  }

  stopRecord () {
    const {isRecording, isPlaying} = this.state
    const _this = this
    // if (isRecording && !isPlaying){
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
    // }
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
      }
    })
  }

  render () {
    return (
      <InterviewLayout>
        <div>
          <Button type='primary' plain onClick={() => {
            this.startRecord()
          }}>开始录音</Button>
          <Button type='primary' plain onClick={() => {
            this.stopRecord()
          }}>停止录音</Button>
          <Button type='primary' plain onClick={() => {
            this.playRecord()
          }}>播放录音</Button>
          <div>{this.state.serverId}</div>
        </div>
        <script src='/static/js/jweixin.js'></script>
      </InterviewLayout>
    )
  }
}
