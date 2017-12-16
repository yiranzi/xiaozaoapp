import React from 'react'
import Link from 'next/link'
import ThemeConfig from '../../../config/theme'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import Option from '../../../containers/clock/option'
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
      let evaluate = await AxiosUtil.get(`/api/work/workAnswerEvaluate/${myAnswerRes.id}`)
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
  renderUnAnswer (workDetail, myAnswer, evaluate) {
    return (
      <div>
        <Option
          isPlaying={this.state.isPlaying}
          isRecording={this.state.isRecording}
          topic={workDetail}
          defaultValue={this.state.myWork}
          onChange={(id, value) => this.workChange(value, workDetail.type)}
          updateRecording={(res) => this.updateRecording(res)}
        />
        <div className='wx-text-center'>
          <Button size='small' onClick={() => { this.submitWork(workDetail.type) }}>上传作业</Button>
        </div>
      </div>
    )
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
    const {query} = this.props
    return (
      <div>
        <Option topic={workDetail} defaultValue={this.state.myWork} disabled />
        <div>
          <div className='wx-space-center'>
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
          <Link href={`/learn/course/questionList?courseId=${query.courseId}&sectionId=${query.sectionId}&pageNumber=${query.pageNumber}`}>
            <Button style={{marginTop: '2rem', backgroundColor: ThemeConfig.color.red}} >对学习内容有疑问？点击查看导师答疑</Button>
          </Link>
        </div>
      </div>
    )
  }
  renderWork (workDetail, myAnswer, evaluate) {
    if (DataUtil.isEmpty(myAnswer)) {
      return this.renderUnAnswer(workDetail, myAnswer, evaluate)
    } else {
      return this.renderAnswer(workDetail, myAnswer, evaluate)
    }
  }
  render () {
    const {workDetail, myAnswer, evaluate, isEditMyWork} = this.state
    return (
      <div>
        {(isEditMyWork && !DataUtil.isEmpty(workDetail)) && this.renderUnAnswer(workDetail, myAnswer, evaluate)}
        {!isEditMyWork && this.renderWork(workDetail, myAnswer, evaluate)}
      </div>
    )
  }
}
