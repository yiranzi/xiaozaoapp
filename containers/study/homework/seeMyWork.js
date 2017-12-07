import React from 'react'
import EditHomework from '/containers/study/homework/myEditHomework'
import ViewHomework from '/containers/study/homework/myViewHomework'
import {
  Panel
} from 'react-weui'

/**
 * 准备渲染我的作业（编辑 or 查看）
 */
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editStatus: false
    }
  }

  componentDidMount = async () => {
    console.log('componentDidMount seemywork')
    this.setEditStatus(this.props)
  }

  // 在更新的时候，判定是否拉取。
  componentWillReceiveProps = async (nextProps) => {
    console.log('componentWillReceiveProps!!!!!')
    this.setEditStatus(nextProps)
  }

  setEditStatus (nextProps) {
    let {questionInfo, myAnswer} = nextProps
    if (myAnswer) {
      this.setState({
        editStatus: false
      })
    } else if (questionInfo) {
      this.setState({
        editStatus: true
      })
    }
  }

  getVisibleStyle (index) {
    let {editStatus} = this.state
    let seeKey
    if (editStatus) {
      seeKey = 'edit'
    } else {
      seeKey = 'view'
    }
    if (seeKey === index) {
      return {
        display: 'block'
      }
    } else {
      return {
        display: 'none'
      }
    }
  }

  render () {
    console.log('render mywork')
    let {courseId, workId, questionInfo, myAnswer} = this.props
    if (questionInfo) {
      return (<div>
        <p>{courseId}</p>
        <p>{workId}</p>
        <p>{123123}</p>
        <p>{this.state.editStatus}</p>
        <Panel style={this.getVisibleStyle('edit')}>
          <EditHomework {...this.props} />
        </Panel>
        <Panel style={this.getVisibleStyle('view')}>
          <ViewHomework {...this.props} />
        </Panel>
      </div>)
    } else {
      return (<div>
        Loading...
      </div>)
    }
  }
}

