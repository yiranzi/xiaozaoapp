import React from 'react'
import Link from 'next/link'
import ThemeConfig from '../../../config/theme'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import Option from '../../../containers/clock/option'
import Material from '../../../containers/clock/material'
import Button from '../../../xz-components/button'
import { Alert } from '../../../xz-components/alert'
import { Toast } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      isPlaying: false,
      workDetail: {},
      myAnswer: {},
      evaluate: {},
      disabled: true,
      showToast: false,
      showLoading: false
    }
  }
  componentDidMount = async (nextProps, nextState) => {
    let {courseId, workId} = this.props
    if (courseId && workId && DataUtil.isEmpty(this.state.workDetail)) {
      let workDetail = AxiosUtil.get(`/api/work/${courseId}/${workId}`)
      let myAnswer = AxiosUtil.get(`/api/work/myAnswer/${courseId}/${workId}`)
      let [workAnsweRes, myAnswerRes] = await Promise.all([workDetail, myAnswer])
      let evaluate
      if (!DataUtil.isEmpty(myAnswerRes)) {
        evaluate = await AxiosUtil.get(`/api/work/workAnswerEvaluate/${myAnswerRes.id}`)
      }
      this.setState({
        workDetail: workAnsweRes,
        myAnswer: myAnswerRes,
        evaluate: evaluate,
        disabled: !DataUtil.isEmpty(myAnswerRes)
      })
    }
  }
  submitWork = async (type) => {
    const {courseId, workId} = this.props
    const {myWork} = this.state
    if (DataUtil.isEmpty(myWork)) { Alert({content: '请先完成作业然后提交'}); return false }
    this.showLoading()
    try {
      if (ToolsUtil.isUploader(type)) {
        await AxiosUtil.post(`/api/work/workFileComplete/${courseId}/${workId}`, myWork.formdata)
        this.editMyWork()
        this.showToast()
      }
      if (ToolsUtil.isTextarea(type)) {
        await AxiosUtil.post(`/api/work/workComplete/${courseId}/${workId}`, myWork)
        this.editMyWork()
        this.showToast()
      }
      if (ToolsUtil.isRecord(type)) {
        const {isPlaying, isRecording} = this.state
        if (isRecording) {
          Alert({content: '正在录音，请先结束录音'})
          return false
        }
        if (isPlaying) {
          Alert({content: '正在播放录音，请先停止录音'})
          return false
        }
        const _this = this
        // eslint-disable-next-line
        wx.uploadVoice({
          localId: myWork,
          isShowProgressTips: 1,
          success: function (res) {
            let serverId = res.serverId
            AxiosUtil.get(`/api/work/workAudioComplete/${courseId}/${workId}?serverId=${serverId}`).then(() => {
              _this.setState({myWork: serverId})
              _this.editMyWork()
              _this.showToast()
            })
          }
        })
      }
      // 并且为了重新拉取数据 这里需要清空axios缓存
      AxiosUtil.deleteCache(`/api/work/workList/${courseId}`)
      AxiosUtil.deleteCache(`/api/work/answerList/${courseId}/${workId}/?pn=1`)
      AxiosUtil.deleteCache(`/api/work/${courseId}/${workId}`)
      AxiosUtil.deleteCache(`/api/work/myAnswer/${courseId}/${workId}`)
    } catch (err) {
    }
  }
  showLoading () {
    this.setState({showLoading: true})
  }
  showToast () {
    this.setState({showToast: true, showLoading: false})

    this.state.loadingTimer = setTimeout(() => {
      this.setState({showToast: false})
    }, 1500)
  }
  workChange (value, type) {
    // let { myAnswer } = this.state
    // myAnswer.answer = value
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
  updateRecording (res) {
    this.setState({isRecording: res})
  }
  updatePlaying (res) {
    this.setState({isPlaying: res})
  }
  editMyWork () {
    this.setState({disabled: !this.state.disabled})
  }

  renderAnswer (workDetail, myAnswer, evaluate) {
    const {disabled} = this.state
    return (
      <div style={{paddingBottom: '2rem'}}>
        <div className='material'><strong style={{color: '#3E84E0'}}>课间思考作业：</strong><Material content={workDetail.question} /></div>
        <Option
          isPlaying={this.state.isPlaying}
          isRecording={this.state.isRecording}
          topic={workDetail}
          defaultValue={this.state.myWork}
          onChange={(id, value) => this.workChange(value, workDetail.type)}
          updateRecording={(res) => this.updateRecording(res)}
          disabled={disabled}
        />
        {!DataUtil.isEmpty(workDetail) && this.renderAction(workDetail, myAnswer, evaluate, disabled)}
        <style jsx>{`
          .material {
            padding: 1rem;
          }
        `}</style>
      </div>
    )
  }
  renderAction (workDetail, myAnswer, evaluate, disabled) {
    if (disabled) {
      return this.renderEditWork(workDetail, myAnswer, evaluate)
    } else {
      return this.renderUploadWork(workDetail, myAnswer, evaluate)
    }
  }
  renderUploadWork (workDetail, myAnswer, evaluate, flag) {
    return (
      <div className='wx-text-center'>
        <Button size='small' onClick={() => { this.submitWork(workDetail.type) }}>提交作业</Button>
      </div>
    )
  }
  renderEvaluate (workDetail, myAnswer, evaluate, flag) {
    let {workId} = this.props
    return (
      <div style={{padding: '0 1rem'}}>
        <div className='wx-space-center' style={{paddingBottom: '2rem'}}>
          <Button
            type='normal' size='small'
            style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}}
            onClick={() => { this.jumpTo() }}
          >查看其他同学答案</Button>
          <Button style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}} type='normal' size='small'>
            <Link href={`/learn/course/otherAnswer${location.search}&workId=${workId}&type=1`}><a>查看导师点评</a></Link>
          </Button>
          <Button
            type='normal'
            size='small'
            disabled
          >修改答案</Button>
        </div>
      </div>
    )
  }
  jumpTo () {
    let {workId} = this.props
    location.href = `/learn/course/otherAnswer${location.search}&workId=${workId}`
  }
  renderNoEvaluate (workDetail, myAnswer, evaluate, flag) {
    return (
      <div style={{padding: '0 1rem'}}>
        <div className='wx-space-center' style={{paddingBottom: '2rem'}}>
          <Button
            type='normal' size='small'
            style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}}
            onClick={() => { this.jumpTo() }}
          >查看其他同学答案</Button>
          <Button type='normal' size='small' disabled>查看导师点评</Button>
          <Button
            style={{borderColor: ThemeConfig.color.red, color: ThemeConfig.color.red}}
            type='normal'
            size='small'
            onClick={() => { this.editMyWork() }}
          >修改答案</Button>
        </div>
      </div>
    )
  }
  renderEditWork (workDetail, myAnswer, evaluate, flag) {
    if (DataUtil.isEmpty(evaluate)) {
      // 导师没有点评
      return this.renderNoEvaluate(workDetail, myAnswer, evaluate, flag)
    } else {
      // 导师点评后
      return this.renderEvaluate(workDetail, myAnswer, evaluate, flag)
    }
  }
  render () {
    const {workDetail, evaluate} = this.state
    return (
      <div className='my-work'>
        <Toast icon='success-no-circle' show={this.state.showToast}>Done</Toast>
        <Toast icon='loading' show={this.state.showLoading}>Loading...</Toast>
        {!DataUtil.isEmpty(workDetail) && this.renderAnswer(workDetail, this.state.myAnswer, evaluate)}
      </div>
    )
  }
}
