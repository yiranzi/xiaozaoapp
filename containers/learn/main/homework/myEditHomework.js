import React from 'react'
import AxiosUtil from '/util/axios'
import Option from '/containers/clock/option'
import ToolsUtil from '/util/tools'
import Button from '/xz-components/button'
import DataUtil from '/util/data'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      myWork: '写上你的答案吧'
    }
  }

  componentDidMount = async () => {
    let {questionInfo} = this.props
    if (questionInfo && questionInfo.answer) {
      this.setState({
        myWork: questionInfo.answer
      })
    }
  }

  uploadHomework = (courseId, workId) => {
    console.log('uploadHomework')
    // 并且为了重新拉取数据 这里需要delete
    AxiosUtil.deleteCache(`/api/work/workList/${courseId}`)
    AxiosUtil.deleteCache(`/api/work/answerList/${courseId}/${workId}/?pn=1`)
    AxiosUtil.deleteCache(`/api/work/${courseId}/${workId}`)
    AxiosUtil.deleteCache(`/api/work/myAnswer/${courseId}/${workId}`)
    // 提交作业。提交作业会让最上层的接口workList发生变化。所以需要传到最上层去更新。
    this.props.updateFunc()
  }


  workChange (value, type) {
    if (ToolsUtil.isUploader(type)) {
      this.setState({myWork: value})
    }
    if (ToolsUtil.isTextarea(type)) {
      this.setState({myWork: value})
    }
    if (ToolsUtil.isRecord(type)) {
      this.setState({myWork: value})
    }
  }

  submitWork = async (type) => {
    const {myWork} = this.state
    let {courseId, workId} = this.props
    try {
      if (ToolsUtil.isUploader(type)) {
        await AxiosUtil.post(`/api/work/workFileComplete/${courseId}/${workId}`, myWork.formdata)
        // this.editMyWork()
        this.uploadHomework(courseId, workId)
      }
      if (ToolsUtil.isTextarea(type)) {
        await AxiosUtil.post(`/api/work/workComplete/${courseId}/${workId}`, myWork)
        // this.editMyWork()
        this.uploadHomework(courseId, workId)
      }
      if (ToolsUtil.isRecord(type)) {
        // const {isPlaying, isRecording} = this.state
        // if (isRecording) {
        //   Alert({content: '正在录音，请先结束录音'})
        //   return false
        // }
        // if (isPlaying) {
        //   Alert({content: '正在播放录音，请先停止录音'})
        //   return false
        // }
        const _this = this
        // eslint-disable-next-line
        wx.uploadVoice({
          localId: myWork,
          isShowProgressTips: 1,
          success: function (res) {
            let serverId = res.serverId
            AxiosUtil.get(`/api/work/workAudioComplete/${courseId}/${workId}?serverId=${serverId}`).then(() => {
              _this.setState({myWork: serverId})
              // _this.editMyWork()
            })
          }
        })
      }
    } catch (err) {
    }
  }

  render () {
    let {questionInfo} = this.props
    return (<div>
      <div>
        <p>请输入答案：</p>
        <Option
          topic={questionInfo}
          onChange={(id, value) => this.workChange(value, questionInfo.type)} />
        <div className='wx-text-center'>
          <Button size='small' onClick={() => { this.submitWork(questionInfo.type) }}>上传作业</Button>
        </div>
      </div>
    </div>)
  }
}





