import React from 'react'
import {
  Panel,
  MediaBoxInfo,
  MediaBox
} from 'react-weui'
import MoreLine from '/xz-components/moreLine'
import TeacherComment from '/containers/learn/main/homework/teacherComment'
import Description from '/containers/learn/main/homework/commentBox/description'
import Title from '/containers/learn/main/homework/commentBox/title'
import LoadingIcon from '/xz-components/loadingicon'

/**
 * 准其他人答案的panel。里面填充了很多学生答案条目
 */
export default class extends React.Component {
  componentDidMount = async () => {
  }

  /**
   * 描述学生答案的条目
   */
  renderStudentAnswer (index, answerData) {
    if (answerData) {
      let {nickname, headimgurl, updateTime, starCount, star, id: studentAnswerId, answer, score} = answerData
      return (<MediaBox key={index}>
        {answerData.overStatus && <img style={{position: 'absolute', width: '50px', right: '0px', top: '0'}}src='/static/img/study/homework-late.png' />}
        <Title nickname={nickname} headimgurl={headimgurl} time={updateTime}
          starCount={starCount} star={star} starId={studentAnswerId} />
        <Description answerDataType={this.props.answerDataType} content={answer} canFold />
        <MediaBoxInfo style={{textAlign: 'right'}}>
          {score && <MoreLine title={<span style={{flex: 'auto'}}>导师点评{score}分</span>}
            content={<TeacherComment studentAnswerId={studentAnswerId} />} />}
        </MediaBoxInfo>
      </MediaBox>)
    } else {
      return null
    }
  }

  render () {
    let {answerList} = this.props
    if (answerList) {
      if (answerList.length > 0) {
        let studentAnswerArray = answerList.map((answerData, index) => {
          return (this.renderStudentAnswer(index, answerData))
        })
        return (<Panel style={{backgroundColor: '#efeff4'}}>
          {studentAnswerArray}
        </Panel>)
      } else {
        return <div>你来第一个提交作业吧</div>
      }
    } else {
      return <LoadingIcon />
    }
  }
}

