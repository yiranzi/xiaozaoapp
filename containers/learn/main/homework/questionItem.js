import React from 'react'
import { Tabbar, TabItem } from '/xz-components/tabbar'
import DateUtil from '/util/date'
import SeeMyWork from '/containers/learn/main/homework/seeMyWork'
import SeeOtherWork from '/containers/learn/main/homework/seeOtherWork'
import {
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  MediaBoxInfo
} from 'react-weui'

import AxiosUtil from '/util/axios'
/**
 * 渲染每个问题
 */
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSelect: -1,
      answerList: undefined,
      isUpdateActive: false
    }
    this.onTabClick = this.onTabClick.bind(this)
    this.updateStudentAnswerList = this.updateStudentAnswerList.bind(this)
    this.updateMyQuestionAndAnswer = this.updateMyQuestionAndAnswer.bind(this)
    this.updateFunc = this.updateFunc.bind(this)
  }

  componentDidMount = async () => {
    console.log('question item componentDidMount')
  }

  // 在更新的时候，判定是否拉取。
  componentWillReceiveProps = async (nextProps) => {
    let {currentSelect, isUpdateActive} = this.state
    if (currentSelect === 1 && isUpdateActive) {
      this.updateMyQuestionAndAnswer()
      this.setState({
        isUpdateActive: false
      })
    }
  }

  setOverStatus (endTime, commitTime) {
    let delayDay
    if (commitTime) {
      delayDay = DateUtil.diffTime(endTime, commitTime)
    } else {
      delayDay = DateUtil.diffDay(endTime)
    }
    if (delayDay <= 0) {
      // 已结束
      return true
    } else {
      return false
    }
  }

  clickContent () {
    const seeMyHomeWork = 1
    this.onTabClick(seeMyHomeWork)
  }

  onTabClick (index) {
    // index == 2 不可点击
    if (index === 2) {
      return
    }
    let {courseStatus, questionItem} = this.props
    let {overWork} = questionItem
    // 未付费
    if (courseStatus === undefined || courseStatus === 'unbuyed') {
      return
    }
    // 重复点击 会取消选中
    if (this.state.currentSelect === index) {
      this.setState({
        currentSelect: -1
      })
      return
    }
    if (overWork) {
      // 如果完成作业
      if (index === 0) {
        // 拉取其他人作业列表
        this.updateStudentAnswerList()
      } else if (index === 1) {
        // 拉取作业数据 准备展示题目
        this.updateMyQuestionAndAnswer()
      }
      this.setState({
        currentSelect: index
      })
    } else {
      // 拉取作业数据 准备展示题目
      this.updateMyQuestionAndAnswer()
      const doHomeWorkIndex = 1
      if (index !== doHomeWorkIndex) {
        alert('提交完作业才可以查看其他人答案哦')
      }
      this.setState({
        currentSelect: doHomeWorkIndex
      })
    }
  }

  updateStudentAnswerList = async () => {
    let {workId, endTime} = this.props.questionItem
    let {courseId} = this.props
    let answerListByPage = await AxiosUtil.get(`/api/work/answerList/${courseId}/${workId}/?pn=1`, true)
    let data = answerListByPage.data
    // 补充上每个的delay状态
    data.forEach((ele, index) => {
      ele.overStatus = this.setOverStatus(endTime, ele.updateTime)
    })
    this.setState({
      answerList: data
    })
  }

  updateMyQuestionAndAnswer = async () => {
    console.log('updateMyQuestionAndAnswer')
    let {workId} = this.props.questionItem
    let {courseId} = this.props
    let getQuestion = await AxiosUtil.get(`/api/work/${courseId}/${workId}`, true)
    if (getQuestion.answer) {
      // 如果已有答案。 或者直接读取overStatus。 或者有了答案 请求刷新
      let getMyAnswer = await AxiosUtil.get(`/api/work/myAnswer/${courseId}/${workId}`, true)
      await this.setState({
        questionInfo: getQuestion,
        myAnswer: getMyAnswer
      })
    } else {
      console.log('not do homework')
      this.setState({
        questionInfo: getQuestion
      })
    }
  }

  updateFunc () {
    // 拉取前标记可以更新
    this.setState({
      isUpdateActive: true
    })
    this.props.updateFunc()
  }

  renderTabbar () {
    let {questionItem} = this.props
    let {answerCount, workId} = questionItem
    let {courseId} = this.props
    let {questionInfo, myAnswer} = this.state
    answerCount = answerCount || 0
    let allAnswerIcon = <div>
      <p>全部回答</p>
      <p>{answerCount}条</p>
    </div>
    let {score} = questionItem
    let myAnswerIcon = <div>
      <p>我的回答</p>
      <p>{score ? `已点评 ${score}分` : '--'}</p>
    </div>
    let dateIcon = <div>
      {this.setOverStatus(questionItem.endTime, questionItem.updateTime) && <img
        style={{position: 'absolute', width: '50px', right: '0px', top: '0'}}
        src='/static/img/study/homework-late.png' />}
      <p>截止日期</p>
      <p>{DateUtil.format(questionItem.endTime, 'yyyy-MM-dd')}</p>
    </div>
    return (
      <Tabbar style={{marginTop: '10px', marginBottom: '10px'}}
        currentSelect={this.state.currentSelect}
        onTabClick={this.onTabClick}>
        <TabItem title={allAnswerIcon} >
          <SeeOtherWork
            answerList={this.state.answerList}
            courseId={courseId}
            workId={workId} />
        </TabItem>
        <TabItem title={myAnswerIcon} >
          <SeeMyWork
            courseId={courseId}
            workId={workId}
            questionInfo={questionInfo}
            updateFunc={this.updateFunc}
            myAnswer={myAnswer} />
        </TabItem>
        <TabItem title={dateIcon} disabled />
      </Tabbar>)
  }

  renderTitle () {
    let {questionItem} = this.props
    let {title, overWork} = questionItem
    return (
      <div className='question-title-div'>
        <h3 className='question-title'>{title}</h3>
        <div className='question-icon'>
          <i className={overWork ? 'weui-icon-success' : 'weui-icon-info'} />
        </div>
        <style jsx>{`
        .question-title-div {
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
        }
        .question-title {
          font-size: 18px;
          font-weight: normal;
        }
      `}</style>
      </div>

    )
  }

  renderContent () {
    let {questionItem} = this.props
    return (<div onClick={() => { this.clickContent() }}>
      <div dangerouslySetInnerHTML={{__html: questionItem.question}} />
    </div>)
  }

  render () {
    let style = {
      display: 'block'
    }
    let {questionItem} = this.props
    if (questionItem) {
      return (<MediaBox>
        <MediaBoxTitle>
          {this.renderTitle()}
        </MediaBoxTitle>
        <MediaBoxDescription style={style}>
          {this.renderContent()}
        </MediaBoxDescription>
        <MediaBoxInfo>
          跳转链接
        </MediaBoxInfo>
        {this.renderTabbar()}
        <style global jsx>{`
          .weui-media-box {
            margin-bottom: 30px !important;
          }
        `}</style>
      </MediaBox>)
    } else {
      return null
    }
  }
}

