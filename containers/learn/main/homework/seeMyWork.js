import React from 'react'
import EditHomework from '/containers/learn/main/homework/myEditHomework'
import LoadingIcon from '/xz-components/loadingicon'
import {
  Panel,
  MediaBox,
  MediaBoxInfo
} from 'react-weui'
import MoreLine from '/xz-components/moreLine'
import TeacherComment from '/containers/learn/main/homework/teacherComment'
import Description from '/containers/learn/main/homework/commentBox/description'
import Title from '/containers/learn/main/homework/commentBox/title'

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
    this.setEditStatus(this.props)
  }

  // 在更新的时候，判定是否拉取。
  componentWillReceiveProps = async (nextProps) => {
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
    this.setState({
      editStatus: true
    })
  }

  /**
   * 描述学生答案的条目
   */

  /*
    // 这边的给自己点赞的功能屏蔽掉了 因为开启点赞需要刷新 其他作业列表的点赞 价值较小 并且给自己点赞有点奇怪
    // 如果要加回来 往title中添加额外的字段就可以
   let {nickname, headimgurl, updateTime, starCount, star, id: studentAnswerId, answer, score} = answerData
   <Title nickname={nickname} headimgurl={headimgurl} time={updateTime}
   starCount={starCount} star={star} starId={studentAnswerId} />
   */
  renderStudentAnswer (answerData) {
    if (answerData) {
      let {nickname, headimgurl, updateTime, id: studentAnswerId, answer, score} = answerData
      return (<MediaBox>
        <Title nickname={nickname} headimgurl={headimgurl} time={updateTime} />
        <Description content={answer} />
        <MediaBoxInfo style={{textAlign: 'right'}}>
          {score ? <MoreLine title={<span style={{flex: 'auto'}}>导师点评{score}分</span>}
            content={<TeacherComment studentAnswerId={studentAnswerId} canEvaluateScore />} /> : <div onClick={this.onEditButtonClick}>修改答案</div>}
        </MediaBoxInfo>
      </MediaBox>)
    } else {
      return null
    }
  }

  render () {
    let {questionInfo, myAnswer} = this.props
    if (questionInfo) {
      return (<div>
        <p>type :{questionInfo.type}</p>
        <p>editStatus :{this.state.editStatus ? 'true' : 'false'}</p>
        <Panel style={this.getVisibleStyle('edit')}>
          <EditHomework {...this.props} updateFunc={this.props.updateFunc} />
        </Panel>
        <Panel style={this.getVisibleStyle('view')}>
          {myAnswer ? this.renderStudentAnswer(myAnswer) : <LoadingIcon />}
        </Panel>
      </div>)
    } else {
      return (<LoadingIcon />)
    }
  }
}

