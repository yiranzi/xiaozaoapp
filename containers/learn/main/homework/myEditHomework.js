import React from 'react'
import AxiosUtil from '/util/axios'
import {
  MediaBox
} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textValue: '写上你的答案吧'
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount = async () => {
    console.log('componentDidMount seemywork')
    let {myAnswer} = this.props
    if (myAnswer && myAnswer.answer) {
      this.setState({
        textValue: myAnswer.answer
      })
    }
  }

  uploadHomework = async () => {
    let {courseId, workId} = this.props
    try {
      await AxiosUtil.post(`/api/work/workComplete/${courseId}/${workId}`, this.state.textValue)
      // 并且为了重新拉取数据 这里需要delete
      AxiosUtil.deleteCache(`/api/work/answerList/${courseId}/${workId}/?pn=1`)
      AxiosUtil.deleteCache(`/api/work/${courseId}/${workId}`)
      AxiosUtil.deleteCache(`/api/work/myAnswer/${courseId}/${workId}`)
      // 提交作业。提交作业会让最上层的接口workList发生变化。所以需要传到最上层去更新。
      this.props.updataFunc()
    } catch (e) {

    }
  }

  onChange (event) {
    this.setState({
      textValue: event.target.value
    })
  }

  render () {
    return (<MediaBox>
      <div>
        my edit
        <input value={this.state.textValue} onChange={this.onChange} />
        <div onClick={this.uploadHomework}>提交作业</div>
      </div>
    </MediaBox>)
  }
}





