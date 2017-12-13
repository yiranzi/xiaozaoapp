import React from 'react'
import AxiosUtil from '/util/axios'
import LoadingIcon from '/xz-components/loadingicon'
import {
  MediaBoxInfo,
  MediaBox
} from 'react-weui'
import GiveScore from '/containers/learn/main/homework/commentBox/giveScore'
import Description from '/containers/learn/main/homework/commentBox/description'
import Title from '/containers/learn/main/homework/commentBox/title'

/**
 * 导师评价组件
 * canEvaluateScore。是否显示星评价
 */

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teacherComment: undefined
    }
  }

  componentDidMount = async () => {
    let {studentAnswerId} = this.props
    if (studentAnswerId) {
      let teacherComment = await AxiosUtil.get(`/api/work/workAnswerEvaluate/${studentAnswerId}`)
      this.setState({
        teacherComment: teacherComment
      })
    }
  }

  render () {
    let {teacherComment} = this.state
    if (teacherComment) {
      let {nickname, headimgurl, createTime, evaluate, score, id: evaluateId} = teacherComment
      return (<MediaBox style={{textAlign: 'left'}}>
        <Title nickname={nickname} headimgurl={headimgurl} time={createTime} />
        <Description content={evaluate} />
        {this.props.canEvaluateScore && <MediaBoxInfo>
          <GiveScore evaluateId={evaluateId} score={score} />
        </MediaBoxInfo>}
      </MediaBox>)
    } else {
      return <LoadingIcon />
    }
  }
}





