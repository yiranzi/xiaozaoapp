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
      isEditMyWork: false,
      myWork: '' // 我的答案,
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
        evaluate: evaluate
      })
    }
  }
  submitWork = async (type) => {
    const {query} = this.props
    const {myWork} = this.state
    this.editMyWork()
    try {
      if (ToolsUtil.isUploader(type)) {
        let uuid = DataUtil.uuid(11)
        let formdata = DataUtil.imgFormat(myWork, uuid, 'jpg')
        await AxiosUtil.post(`/api/work/workFileComplete/${query.courseId}/${query.workId}`, formdata)
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
    } catch (err) {
    }
  }
  workChange (value, type) {
    if (ToolsUtil.isUploader(type)) {
      this.setState({myWork: value[0].url})
    }
    if (ToolsUtil.isTextarea(type)) {
      this.setState({myWork: value})
    }
  }
  updateRecording (res) {
    this.setState({isRecording: res})
  }
  editMyWork () {
    this.setState({isEditMyWork: !this.state.isEditMyWork})
  }
  /**
   * 已经答过题
   * @param {*} workDetail 
   * @param {*} myAnswer 
   * @param {*} evaluate 
   */
  renderAnswer (workDetail, myAnswer, evaluate) {
    const {isEditMyWork} = this.state
    return (
      <div>
        <Option
          isPlaying={this.state.isPlaying}
          isRecording={this.state.isRecording}
          topic={workDetail}
          defaultValue={this.state.myWork}
          onChange={(id, value) => this.workChange(value, workDetail.type)}
          updateRecording={(res) => this.updateRecording(res)}
          disabled={!isEditMyWork}
        />
        {!DataUtil.isEmpty(workDetail) && this.renderAction(workDetail, myAnswer, evaluate, isEditMyWork)}
      </div>
    )
  }
  renderAction (workDetail, myAnswer, evaluate, isEditMyWork) {
    if (DataUtil.isEmpty(myAnswer)) {
      return this.renderUploadWork(workDetail, myAnswer, evaluate)
    } else {
      if (isEditMyWork) {
        return this.renderUploadWork(workDetail, myAnswer, evaluate)
      } else {
        return this.renderEditWork(workDetail, myAnswer, evaluate)
      }
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
    const {query, currentCourseDetail} = this.props
    let questionListAfterFix = 'courseId=' + query.courseId + '&' +
                               'sectionId=' + query.sectionId + '&' +
                               'title=' + encodeURI(encodeURI(currentCourseDetail.courseName)) + '&' +
                               'totalSize=' + currentCourseDetail.pageCount + '&' +
                               'pageNumber=' + query.pageNumber
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
        <Link
          href={`/learn/course/questionList?${questionListAfterFix}`}>
          <Button
            style={{marginTop: '2rem', backgroundColor: ThemeConfig.color.red, position: 'fixed', bottom: '58px'}}
          >对学习内容有疑问？点击查看导师答疑</Button>
        </Link>
      </div>
    )
  }
  render () {
    const {workDetail, myAnswer, evaluate} = this.state
    return (
      <div className='my-work'>
        {!DataUtil.isEmpty(workDetail) && this.renderAnswer(workDetail, myAnswer, evaluate)}
      </div>
    )
  }
}
