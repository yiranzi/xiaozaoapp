import React from 'react'
import AxiosUtil from '/util/axios'
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
      // 提交作业。
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





