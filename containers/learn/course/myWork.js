import React from 'react'
import Link from 'next/link'
import ThemeConfig from '../../../config/theme'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import Option from '../../../containers/clock/option'
import Alert from '../../../xz-components/alert'
import Button from '../../../xz-components/button'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      isPlaying: false,
      workDetail: {},
      myAnswer: {},
      evaluate: {},
      disabled: true
    }
  }
  componentWillUpdate = async (nextProps, nextState) => {
    let {courseId, workId} = nextProps.query
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
    const {query} = this.props
    const {myWork} = this.state
    this.editMyWork()
    try {
      if (ToolsUtil.isUploader(type)) {
        await AxiosUtil.post(`/api/work/workFileComplete/${query.courseId}/${query.workId}`, myWork)
      }
      if (ToolsUtil.isTextarea(type)) {
        await AxiosUtil.post(`/api/work/workComplete/${query.courseId}/${query.workId}`, myWork)
      }
      if (ToolsUtil.isRecord(type)) {
        const {isPlaying, isRecording} = this.props
        if (isRecording) {
          Alert({content: '正在录音，请先结束录音'})
          return false
        }
        if (isPlaying) {
          alert({content: '正在播放录音，请先停止录音'})
          return false
        }
        new Promise((resolve, reject) => {
          // eslint-disable-next-line
          wx.uploadVoice({
            localId: myWork,
            isShowProgressTips: 1,
            success: function (res) {
              let serverId = res.serverId
              resolve(serverId)
            }
          })
        }).then((severId) => {
          AxiosUtil.post(`/api/work/workAudioComplete/${query.courseId}/${query.workId}`, myWork)
        })
      }
      const {courseId, workId} = this.props.query
      let myAnswer = AxiosUtil.get(`/api/work/myAnswer/${courseId}/${workId}`)
      this.setState({myAnswer: myAnswer, disabled: true})
    } catch (err) {
    }
  }
  workChange (value, type) {
    let { myAnswer } = this.state
    myAnswer.answer = value
    if (ToolsUtil.isUploader(type)) {
      this.setState({myWork: value, myAnswer: myAnswer})
    }
    if (ToolsUtil.isTextarea(type)) {
      this.setState({myWork: value, myAnswer: myAnswer})
    }
  }
  updateRecording (res) {
    this.setState({isRecording: res})
  }
  editMyWork () {
    this.setState({disabled: !this.state.disabled})
  }

  renderAnswer (workDetail, myAnswer, evaluate) {
    const {disabled} = this.state
    return (
      <div style={{paddingBottom: '2rem'}}>
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
        <Button size='small' onClick={() => { this.submitWork(workDetail.type) }}>上传作业</Button>
      </div>
    )
  }
  renderEditWork (workDetail, myAnswer, evaluate, flag) {
    const {query} = this.props
    return (
      <div>
        <div className='wx-space-center' style={{paddingBottom: '2rem'}}>
          <Button style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}} type='normal' size='small'>
            <Link href={`/learn/course/otherAnswer${location.search}&workId=${query.workId}`}><a>查看其他同学答案</a></Link>
          </Button>
          <Button onClick={() => { this.setState({showWorkAnser: !this.state.showWorkAnser}) }} style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}} type='normal' size='small'>查看导师点评</Button>
          {DataUtil.isEmpty(this.state.workAnswer) && (
            <Button
              style={{borderColor: ThemeConfig.color.red, color: ThemeConfig.color.red}}
              type='normal'
              size='small'
              onClick={() => { this.editMyWork() }}
            >修改答案</Button>
          )}
        </div>
        {this.state.showWorkAnser && (
          <div>导师点评：{this.state.workAnswer}</div>
        )}
      </div>
    )
  }
  render () {
    const {workDetail, evaluate} = this.state
    const {query, currentCourseDetail} = this.props
    let questionListAfterFix = 'courseId=' + query.courseId + '&' +
                               'sectionId=' + query.sectionId + '&' +
                               'title=' + encodeURI(encodeURI(currentCourseDetail.courseName)) + '&' +
                               'totalSize=' + currentCourseDetail.pageCount + '&' +
                               'pageNumber=' + query.pageNumber
    return (
      <div className='my-work'>
        {!DataUtil.isEmpty(workDetail) && this.renderAnswer(workDetail, this.state.myAnswer, evaluate)}
        <Link
          href={`/learn/course/questionList?${questionListAfterFix}`}>
          <Button
            style={{marginTop: '2rem', backgroundColor: ThemeConfig.color.red, position: 'fixed', bottom: '58px'}}
          >对学习内容有疑问？点击查看导师答疑</Button>
        </Link>
      </div>
    )
  }
}
