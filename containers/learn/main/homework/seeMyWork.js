import React from 'react'
import EditHomework from '/containers/learn/main/homework/myEditHomework'
import ViewHomework from '/containers/learn/main/homework/myViewHomework'
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
    this.onEditButtonClick = this.onEditButtonClick.bind(this)
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

  // 重新编辑的回调
  onEditButtonClick () {
    console.log(this)
    this.setState({
      editStatus: true
    })
  }

  render () {
    console.log('render mywork')
    let {courseId, workId, questionInfo, myAnswer} = this.props
    if (questionInfo) {
      return (<div>
        <p>courseId :{courseId}</p>
        <p>workId :{workId}</p>
        <p>type :{questionInfo.type}</p>
        <p>editStatus :{this.state.editStatus ? 'true' : 'false'}</p>
        <Panel style={this.getVisibleStyle('edit')}>
          <EditHomework {...this.props} updataFunc={this.props.updataFunc} />
        </Panel>
        <Panel style={this.getVisibleStyle('view')}>
          <ViewHomework {...this.props} onEditButtonClick={() => { this.onEditButtonClick() }} />
        </Panel>
      </div>)
    } else {
      return (<div>
        Loading...
      </div>)
    }
  }
}

