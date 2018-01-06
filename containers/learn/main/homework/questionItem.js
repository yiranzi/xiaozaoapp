import React from 'react'
import { Tabbar, TabItem } from '/xz-components/tabbar'
import Button from '/xz-components/button'
import DateUtil from '/util/date'
import SeeMyWork from '/containers/learn/main/homework/seeMyWork'
import SeeOtherWork from '/containers/learn/main/homework/seeOtherWork'
import {
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  MediaBoxInfo,
  InfiniteLoader
} from 'react-weui'

import AxiosUtil from '/util/axios'
/**
 * 渲染每个问题
 */
export default class extends React.Component {
  totalSize
  perPageSize = 10
  constructor (props) {
    super(props)
    this.state = {
      currentSelect: -1,
      answerList: undefined,
      isUpdateActive: false,
      currentPage: undefined
    }
    this.onTabClick = this.onTabClick.bind(this)
    this.updateStudentAnswerList = this.updateStudentAnswerList.bind(this)
    this.updateMyQuestionAndAnswer = this.updateMyQuestionAndAnswer.bind(this)
    this.updateFunc = this.updateFunc.bind(this)
  }

  componentDidMount = async () => {
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
      // 告知父组件 切换模式（单页 or list）
      this.props.chooseChapterAndLesson(this.props.chapterIndex, this.props.lessonIndex, -1)
      this.setState({
        currentSelect: -1
      })
      return
    }
    if (overWork) {
      // 告知父组件 切换模式（单页 or list）
      this.props.chooseChapterAndLesson(this.props.chapterIndex, this.props.lessonIndex, index)
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

  loadMore = async (finish, resolve) => {
    console.log('loadMore')
    // 判定页码是否是最后一页。
    if (this.state.currentPage >= this.totalSize) {
      finish()
    } else {
      let {workId, endTime} = this.props.questionItem
      let {courseId} = this.props
      // 更新页码
      let nextPageIndex = this.state.currentPage + 1
      // axios
      let answerListByPage = await AxiosUtil.get(`/api/work/answerList/${courseId}/${workId}/?pn=${nextPageIndex}`)
      let data = answerListByPage.data
      data.forEach((ele, index) => {
        ele.overStatus = this.setOverStatus(endTime, ele.updateTime)
      })
      // 补充到后面
      let answerList = this.state.answerList
      answerList = answerList.concat(data)
      // 保存页码
      this.setState({
        currentPage: nextPageIndex,
        answerList: answerList
      }, () => resolve())
    }
  }

  updateStudentAnswerList = async () => {
    let {workId, endTime} = this.props.questionItem
    let {courseId} = this.props
    let currentPage = 0
    let answerListByPage = await AxiosUtil.get(`/api/work/answerList/${courseId}/${workId}/?pn=${currentPage}`, true)
    this.totalSize = parseInt(answerListByPage.totalSize / this.perPageSize)
    console.log(this.totalSize)
    let data = answerListByPage.data
    // 补充上每个的delay状态
    data.forEach((ele, index) => {
      ele.overStatus = this.setOverStatus(endTime, ele.updateTime)
    })
    data = data.concat(data)
    this.setState({
      currentPage: currentPage,
      answerList: data
    })
  }

  updateMyQuestionAndAnswer = async () => {
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
      return (<div>
        <MediaBox style={{marginBottom: '30px'}}>
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
          {this.props.viewType && <Button onClick={() => { this.onTabClick(0) }}>查看其它章节作业</Button>}
        </MediaBox>
      </div>)
      return (<InfiniteLoader style={{height: 'auto'}} onLoadMore={this.loadMore}>
        <MediaBox style={{marginBottom: '30px'}}>
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
          {this.props.viewType && <Button onClick={() => { this.onTabClick(0) }}>查看其它章节作业</Button>}
        </MediaBox>
      </InfiniteLoader>)
    } else {
      return null
    }
  }
}

