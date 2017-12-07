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
import MoreLine from '../../../xz-components/moreLine'
import MoreContent from '../../../xz-components/moreContent'
import TeacherComment from '/containers/study/homework/teacherComment'
import DateUtil from '/util/date'


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
      let teacherComment = await AxiosUtil.get(`/api/workAnswerEvalute/${studentAnswerId}`)
      this.setState({
        teacherComment: teacherComment
      })
      console.log(teacherComment)
    }
  }

  renderTitle () {
    let {nickname, headimgurl, updateTime} = this.state.teacherComment
    return (<MediaBoxTitle>
      <Cell style={{padding: '0'}}>
        <CellHeader>
          <img src={headimgurl} style={{display: `block`, width: `20px`, marginRight: `5px`}} />
        </CellHeader>
        <CellBody>
          <span>{nickname} {DateUtil.format(updateTime, 'yyyy-MM-dd')}</span>
        </CellBody>
      </Cell>
    </MediaBoxTitle>)
  }

  renderDescription () {
    let {answer} = this.props.teacherComment
    if (answer) {
      return (<MediaBoxDescription>
        <MoreContent height={2}><div dangerouslySetInnerHTML={{__html: answer}} /></MoreContent>
      </MediaBoxDescription>)
    } else {
      return null
    }
  }

  render () {
    let {teacherComment} = this.props
    if (teacherComment) {
      return (<MediaBox>
        {answerData.overStatus && <img style={{position: 'absolute', width: '50px', right: '0px', top: '0'}}src='/static/img/study/homework-late.png' />}
        {this.renderTitle()}
        {this.renderDescription()}
      </MediaBox>)
    } else {
      return <div>Loading...</div>
    }
  }
}





