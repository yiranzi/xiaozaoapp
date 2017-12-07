import React from 'react'
import AxiosUtil from '../../../util/axios'
import {
  Cell,
  CellHeader,
  CellBody,
  CellFooter,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription
} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textValue: '写上你的答案吧'
    }
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
      // 提交作业。
      this.props.updataFunc()
    } catch (e) {

    }
  }

  onChange (value) {
    this.setState({
      textValue: value
    })
  }

  render () {
    return (<MediaBox>
      <div>
        <input value={this.state.textValue} onChange={this.onChange} />
        my edit
        <div onClick={this.uploadHomework}>提交作业</div>
      </div>
    </MediaBox>)
  }
}





