import React from 'react'
import AxiosUtil from '../../../util/axios'
import {
  Cell,
  CellHeader,
  CellBody,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription
} from 'react-weui'
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
      let teacherComment = await AxiosUtil.get(`/api/workAnswerEvaluate/${studentAnswerId}`)
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

  render () {
    let {teacherComment} = this.state
    if (teacherComment) {
      return (<MediaBox style={{textAlign: 'left'}}>
        {this.renderTitle()}
        {this.renderDescription()}
      </MediaBox>)
    } else {
      return <div>Loading...</div>
    }
  }
}





