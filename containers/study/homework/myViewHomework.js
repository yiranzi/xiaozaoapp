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
import TeacherComment from '/containers/study/homework/teacherComment'
import DateUtil from '/util/date'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      starClick: false
    }
  }

  componentDidMount = async () => {
    console.log('componentDidMount seemywork')
  }

  answerClickStar (workAnswerId) {
    // 发送请求。
    AxiosUtil.get(`/api/work/answerStar/${workAnswerId}`)
    // 如果成功则成功。还是直接成功？
    this.setState({
      starClick: true
    })
  }

  renderTitle () {
    let {nickname, headimgurl, updateTime} = this.props.myAnswer
    return (<MediaBoxTitle>
      <Cell style={{padding: '0'}}>
        <CellHeader>
          <img src={headimgurl} style={{display: `block`, width: `20px`, marginRight: `5px`}} />
        </CellHeader>
        <CellBody>
          <span>{nickname} {DateUtil.format(updateTime, 'yyyy-MM-dd')}</span>
        </CellBody>
        <CellFooter>
          {this.renderStar()}
        </CellFooter>
      </Cell>
    </MediaBoxTitle>)
  }

  renderStar () {
    let {starCount, star, id} = this.props.myAnswer
    let jsxStyle = <style>{`
      .comment-title-good {
        display: flex;
        align-items: center;
      }
      .comment-title-good img{
        margin: auto 5px auto 5px;
        width: 20px
      }
    `}</style>
    if (this.state.starClick) {
      return (<div className='comment-title-good'>
        <span>{starCount + 1} </span>
        <img src={'/static/img/study/homework-good-on.png'} />
        {jsxStyle}
      </div>)
    }
    if (star) {
      return (<div className='comment-title-good'>
        <span>{starCount}</span>
        <img src={'/static/img/study/homework-good-on.png'} />
        {jsxStyle}
      </div>)
    } else {
      return (<div onClick={() => { this.answerClickStar(id) }} className='comment-title-good'>
        <span>{starCount} </span>
        <img src={'/static/img/study/homework-good-off.png'} />
        {jsxStyle}
      </div>)
    }
  }

  renderDescription () {
    let {answer} = this.props.myAnswer
    if (answer) {
      return (<MediaBoxDescription style={{display: 'block'}}>
        <div height={2}><div dangerouslySetInnerHTML={{__html: answer}} /></div>
      </MediaBoxDescription>)
    } else {
      return null
    }
  }

  renderTeacherComment () {
    let {score, id} = this.props.myAnswer
    let contentDiv
    if (score !== null) {
      let title = <span style={{flex: 'auto'}}>导师点评{score}分</span>
      let content = <TeacherComment studentAnswerId={id} canEvaluateScore />
      contentDiv = <MoreLine title={title} content={content} />
    } else {
      contentDiv = <div onClick={this.props.onEditButtonClick}>修改答案</div>
    }
    return (<cell>
      <CellFooter>
        {contentDiv}
      </CellFooter>
    </cell>)
  }

  render () {
    let {myAnswer} = this.props
    if (myAnswer) {
      return (<MediaBox>
        {this.renderTitle()}
        {this.renderDescription()}
        {this.renderTeacherComment()}
      </MediaBox>)
    } else {
      return null
    }
  }
}





