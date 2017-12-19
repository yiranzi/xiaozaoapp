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
    AxiosUtil.deleteCache(`/api/work/answerList/${courseId}/${workId}/?pn=1`)
    AxiosUtil.deleteCache(`/api/work/${courseId}/${workId}`)
    AxiosUtil.deleteCache(`/api/work/myAnswer/${courseId}/${workId}`)
    // 提交作业。提交作业会让最上层的接口workList发生变化。所以需要传到最上层去更新。
    this.props.updateFunc()
  }


  workChange (value, type) {
    if (ToolsUtil.isUploader(type)) {
      this.setState({myWork: value[0].url})
    }
    if (ToolsUtil.isTextarea(type)) {
      this.setState({myWork: value})
    }
  }

  submitWork = async (type) => {
    let {courseId, workId} = this.props
    let {myWork} = this.state
    console.log('post')
    try {
      if (ToolsUtil.isUploader(type)) {
        let uuid = DataUtil.uuid(11)
        let formdata = DataUtil.imgFormat(myWork, uuid, 'jpg')
        await AxiosUtil.post(`/api/work/workFileComplete/${courseId}/${workId}`, formdata)
        this.uploadHomework(courseId, workId)
      }
      if (ToolsUtil.isTextarea(type)) {
        await AxiosUtil.post(`/api/work/workComplete/${courseId}/${workId}`, myWork)
        this.uploadHomework(courseId, workId)
      }
    } catch (err) {

    }
  }

  render () {
    let {questionInfo} = this.props
    return (<div>
      <div>
        <p>请输入答案：</p>
        <Option topic={questionInfo} onChange={(id, value) => this.workChange(value, questionInfo.type)} />
        <div className='wx-text-center'>
          <Button size='small' onClick={() => { this.submitWork(questionInfo.type) }}>上传作业</Button>
        </div>
      </div>
    </div>)
  }
}





