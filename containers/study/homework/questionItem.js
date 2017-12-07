import React from 'react'
import { Tabbar, TabItem } from '/xz-components/tabbar'
import DateUtil from '/util/date'
import SeeMyWork from '/containers/study/homework/seeMyWork'
import SeeOtherWork from '/containers/study/homework/seeOtherWork'
import {
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  MediaBoxInfo
} from 'react-weui'

import AxiosUtil from '../../../util/axios'
/**
 * 渲染每个问题
 */
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSelect: -1,
      answerList: undefined
    }
    this.onTabClick = this.onTabClick.bind(this)
    this.updataList = this.updataList.bind(this)
  }

  componentDidMount = async () => {
    console.log('question item componentDidMount')
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

  // 作业是负责拉取数据的大模块。
  // 点击小作业后，会让大模块拉取数据，进行
  // 写作业，是内容的一部分。提交作业，也是上报到大模块 进行提交的。
  // 包括点评 都是这样？

  // 用户点击小模块的操作。是在模块内部进行处理的 模块内部有current数据。 模块内部进行控制。

  // 1 数据。
  // 2

  onTabClick (index) {
    if (index === 2) {
      return
    }
    let {payStatus, questionItem} = this.props
    let {overWork} = questionItem
    // 未付费
    if (payStatus === undefined || payStatus === 'unbuyed') {
      return
    }
    if (!overWork) {
      if (index === 0) {
        console.log(this)
        console.log(this.updataList)
        this.updataList()
      } else if (index === 1) {
        console.log('get my homework')
      }
      this.setState({
        currentSelect: index
      })
    } else {
      const doHomeWorkIndex = 1
      this.setState({
        currentSelect: doHomeWorkIndex
      })
    }
  }

  updataList = async () => {
    console.log('updataList')
    let {workId, endTime} = this.props.questionItem
    let {courseId} = this.props
    let answerListByPage = await AxiosUtil.get(`/api/work/answerList/${courseId}/${workId}/?pn=1`)
    let data = answerListByPage.data
    data.map((ele, index) => {
      return (ele.overStatus = this.setOverStatus(endTime, ele.updateTime))
    })
    await this.setState({
      answerList: data
    })
    console.log(data)
  }

  renderTabbar (questionItem) {
    console.log(questionItem)
    let {answerCount} = questionItem
    let {workId} = questionItem
    let {courseId} = this.props
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
      {this.setOverStatus(questionItem.endTime, questionItem.updateTime) && <img style={{position: 'absolute', width: '50px', right: '0px', top: '0'}}src='/static/img/study/homework-late.png' />}
      <p>截止日期</p>
      <p>{DateUtil.format(questionItem.endTime, 'yyyy-MM-dd')}</p>
    </div>
    return (
      <Tabbar style={{marginTop: '10px', marginBottom: '10px'}} currentSelect={this.state.currentSelect} onTabClick={this.onTabClick}>
        <TabItem title={allAnswerIcon} ><SeeOtherWork answerList={this.state.answerList} courseId={courseId} workId={workId} /></TabItem>
        <TabItem title={myAnswerIcon} ><SeeMyWork courseId={courseId} workId={workId} /></TabItem>
        <TabItem title={dateIcon} disabled>empty</TabItem>
      </Tabbar>)
  }

  renderTitle (questionItem) {
    let {title} = questionItem
    let {overWork} = questionItem
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

  renderStar () {
    return (<div className='test-style'>
      <p>123</p>
      <p>456</p>
      <style jsx>{`
        .test-style {
          display: flex
        }
      `}</style>
    </div>)
  }

  renderContent (questionItem) {
    return (<div onClick={() => { this.clickContent() }}>
      <div dangerouslySetInnerHTML={{__html: questionItem.question}} />
    </div>)
  }

  render () {
    let style = {
      display: 'block'
    }
    let {questionItem} = this.props
    return (<MediaBox>
      <MediaBoxTitle>
        {this.renderTitle(questionItem)}
      </MediaBoxTitle>
      <MediaBoxDescription style={style}>
        {this.renderContent(questionItem)}
      </MediaBoxDescription>
      <MediaBoxInfo>
        跳转链接
      </MediaBoxInfo>
      {this.renderTabbar(questionItem)}
      <style jsx>{`

      `}</style>
    </MediaBox>)
  }
}

