import React from 'react'
import { Button } from 'react-weui'
import InterviewLayout from '../../containers/interview/layout'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      localId: ''
    }
  }
  componentDidMount = async () => {
    const url = `/api/interview/getWXConfig?url=${location.href.split('#')[0]}`
    console.log(url)
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
    wx.startRecord()
  }

  stopRecord () {
    const _this = this
    wx.stopRecord({
      success: function (res) {
        _this.setState({localId: res.localId})
      }
    })
  }

  playRecord () {
    wx.playVoice({
      localId: this.state.localId
    })
  }

  render () {
    return (
      <InterviewLayout>
        <div>
          <Button type='primary' plain onClick={() => { this.startRecord() }}>开始录音</Button>
          <Button type='primary' plain onClick={() => { this.stopRecord() }}>停止录音</Button>
          <Button type='primary' plain onClick={() => { this.playRecord() }}>播放录音</Button>
        </div>
        <script src='/static/js/jweixin.js'></script>
      </InterviewLayout>
    )
  }
}
