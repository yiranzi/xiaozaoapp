import React from 'react'
import { Tabbar, TabItem } from '../../../../xz-components/tabbar'
import {Alert} from '../../../../xz-components/alert'
import DateUtil from '../../../../util/date'
import SeeMyWork from '../../../../containers/learn/main/homework/seeMyWork'
import SeeOtherWork from '../../../../containers/learn/main/homework/seeOtherWork'
import Description from '../../../../containers/learn/main/homework/commentBox/description'
import ScrollLoader from '../../../../xz-components/scrollLoader'
import {
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  MediaBoxInfo
} from 'react-weui'
import Link from 'next/link'
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
      currentPage: undefined
    }
    this.onTabClick = this.onTabClick.bind(this)
    this.updateStudentAnswerList = this.updateStudentAnswerList.bind(this)
    this.updateMyQuestionAndAnswer = this.updateMyQuestionAndAnswer.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  componentWillMount = async () => {
    if (this.props.tabSelect === 0) {
      this.setState({
        currentSelect: 0
      })
      this.updateStudentAnswerList()
    } else if (this.props.tabSelect === 1) {
      this.setState({
        currentSelect: 1
      })
      this.updateMyQuestionAndAnswer()
    }
  }

  // 在更新的时候，判定是否拉取。
  componentWillReceiveProps = async (nextProps) => {
    // 监听关闭窗口的指令
    if (nextProps.viewType === 'close') {
      this.backButtonClick()
    }
  }

  setOverStatus (endTime, commitTime) {
    let delayDay
    if (commitTime) {
      delayDay = DateUtil.diffTime(endTime, commitTime)
    } else if (endTime) {
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
    // 这边新增了点击展开，关闭之前的tabbar点击。
    // const seeMyHomeWork = 1
    // this.onTabClick(seeMyHomeWork)
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
      // this.props.chooseChapterAndLesson(this.props.chapterIndex, this.props.lessonIndex, -1)
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
        // 告知父组件 切换模式（单页 or list）
        // this.props.chooseChapterAndLesson(this.props.chapterIndex, this.props.lessonIndex, 1)
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
        this.openAlert()
      }
      this.setState({
        currentSelect: doHomeWorkIndex
      })
    }
  }

  openAlert () {
    Alert({
      content: '提交完作业才可以查看其他人答案哦',
      okText: '确定'
    })
  }

  loadMore = async (resolve, finish) => {
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
      })
      resolve()
    }
  }

  updateStudentAnswerList = async () => {
    let {workId, endTime} = this.props.questionItem
    let {courseId} = this.props
    let currentPage = 1
    let answerListByPage = await AxiosUtil.get(`/api/work/answerList/${courseId}/${workId}/?pn=${currentPage}`, true)
    this.totalSize = parseInt(answerListByPage.totalSize / this.perPageSize)
    let data = answerListByPage.data
    // 补充上每个的delay状态
    data.forEach((ele, index) => {
      ele.overStatus = this.setOverStatus(endTime, ele.updateTime)
    })
    this.setState({
      currentPage: currentPage,
      answerList: data
    }, () => {
      // 告知父组件 切换模式（单页 or list）
      this.props.chooseChapterAndLesson(this.props.chapterIndex, this.props.lessonIndex, 0)
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

  renderTabbar () {
    let {questionItem, courseId} = this.props
    let {answerCount, workId} = questionItem
    let {questionInfo, myAnswer} = this.state
    let allAnswerIcon = <div>
      <p>全部回答</p>
      <p>{Number(answerCount)}条</p>
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
            answerDataType={questionItem.type}
            answerList={this.state.answerList}
            courseId={courseId}
            workId={workId} />
        </TabItem>
        <TabItem title={myAnswerIcon} >
          <SeeMyWork
            courseId={courseId}
            questionInfo={questionInfo}
            questionItem={questionItem}
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
        {/* <div className='question-icon'> */}
        {/* {overWork ? <i className={'weui-icon-success-no-circle'} /> : <i style={{color: ThemeConfig.color.content}} className={'weui-icon-cancel'} />} */}
        {/* </div> */}
        {overWork && <div className='question-icon'>
          <i className={'weui-icon-success-no-circle'} />
        </div>}
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

  renderGoDetailLink () {
    let {questionItem, courseId} = this.props
    let {chapterId: menuId, pageNumber, sectionId, workId} = questionItem
    return (
      <Link href={{pathname: '/learn/course/detail', query: { courseId: courseId, menuId: menuId, pageNumber: pageNumber, sectionId: sectionId, workId: workId }}}>
        <a style={{color: '#CECECE'}}>查看相关知识点</a>
      </Link>
    )
  }

  backButtonClick () {
    this.props.chooseChapterAndLesson(this.props.chapterIndex, this.props.lessonIndex, -1)
    this.onTabClick(-1)
  }

  render () {
    // 显示全部文字
    let style = {
      display: 'block'
    }
    let {questionItem, courseStatus} = this.props
    // 展开对样式有调整
    if (questionItem) {
      return (
        <MediaBox style={this.props.viewType === undefined ? {marginBottom: '10px'} : {position: 'static'}}>
          <ScrollLoader
            style={this.props.viewType === undefined ? {height: 'auto'} : {height: '100vh'}}
            onLoadMore={this.loadMore}>
            <MediaBoxTitle>
              {this.renderTitle()}
            </MediaBoxTitle>
            <div onClick={() => { this.clickContent() }} >
              <Description modalFrom={1} lineCount={2} motalTo={'rgba(255,255,255,1)'} content={questionItem.question} canFold />
            </div>
            {courseStatus === 'doing' && <MediaBoxInfo>
              {this.renderGoDetailLink()}
            </MediaBoxInfo>}
            {this.renderTabbar()}
          </ScrollLoader>
        </MediaBox>
      )
    } else {
      return null
    }
  }
}
