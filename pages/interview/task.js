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
    let wxConfig = await AxiosUtil({method: 'get', url: url})
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
  }

  startRecord () {
    wx.startRecord()
  }

  stopRecord () {
    wx.stopRecord({
      success: function (res) {
        this.setState({localId: res.localId})
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
          <Button type='primary' plain onClick={() => { this.stopRecord() }}>开始录音</Button>
          <Button type='primary' plain onClick={() => { this.playRecord() }}>播放录音</Button>
        </div>
        <script src='/static/js/jweixin.js'></script>
      </InterviewLayout>
    )
  }
}
