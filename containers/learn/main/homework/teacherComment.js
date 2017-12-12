import React from 'react'
import AxiosUtil from '/util/axios'
import LoadingIcon from '/xz-components/loadingicon'
import {
  Cell,
  CellHeader,
  CellFooter,
  CellBody,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription
} from 'react-weui'
import DateUtil from '/util/date'
import GiveScore from '/containers/learn/main/homework/giveScore'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teacherComment: false
    }
  }

  componentDidMount = async () => {
    let {studentAnswerId} = this.props
    console.log('componentDidMount teacherComment')
    if (studentAnswerId) {
      let teacherComment = await AxiosUtil.get(`/api/work/workAnswerEvaluate/${studentAnswerId}`)
      this.setState({
        teacherComment: teacherComment
      })
      console.log(teacherComment)
    }
  }

  renderTitle () {
    let {nickname, headimgurl, createTime} = this.state.teacherComment
    return (<MediaBoxTitle>
      <Cell style={{padding: '0'}}>
        <CellHeader>
          <img src={headimgurl} style={{display: `block`, width: `20px`, marginRight: `5px`}} />
        </CellHeader>
        <CellBody>
          <span>{nickname} {createTime && DateUtil.format(createTime, 'yyyy-MM-dd')}</span>
        </CellBody>
      </Cell>
    </MediaBoxTitle>)
  }

  renderDescription () {
    let {evaluate} = this.state.teacherComment
    if (evaluate) {
      return (<MediaBoxDescription style={{display: 'block'}}>
        <div><div dangerouslySetInnerHTML={{__html: evaluate}} /></div>
      </MediaBoxDescription>)
    } else {
      return null
    }
  }

  renderEvaluateScore () {
    let {score, id: evaluateId} = this.state.teacherComment
    if (evaluateId) {
      return (<cell>
        <CellFooter>
          <Cell>
            <GiveScore evaluateId={evaluateId} score={score} />
          </Cell>
        </CellFooter>
      </cell>)
    }
  }

  render () {
    let {teacherComment} = this.state
    if (teacherComment) {
      return (<MediaBox style={{textAlign: 'left'}}>
        {this.renderTitle()}
        {this.renderDescription()}
        {this.props.canEvaluateScore && this.renderEvaluateScore()}
      </MediaBox>)
    } else {
      return <LoadingIcon />
    }
  }
}





