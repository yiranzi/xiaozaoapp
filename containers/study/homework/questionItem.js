import React from 'react'
import { Tabbar, TabItem } from '/xz-components/tabbar'
import DateUtil from '/util/date'

/**
 * 渲染团购的卡片
 */
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSelect: -1
    }
    this.onTabClick = this.onTabClick.bind(this)
  }

  componentDidMount = async () => {
    console.log('componentDidMount')
  }

  setOverStatus (questionItem) {
    let commitTime = questionItem.updateTime
    let delayDay
    if (commitTime) {
      delayDay = DateUtil.diffTime(questionItem.endDate, commitTime)
    } else {
      delayDay = DateUtil.diffDay(questionItem.endDate)
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
    console.log('onTabClick')
    let {payStatus, questionItem} = this.props
    let {overWork} = questionItem
    if (payStatus !== undefined && payStatus !== 'unbuyed') {
      // 已经付费
      if (overWork) {
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
  }

  getStatus () {
    // 未付费

    // 已付费 未完成 未过期 （可以做作业。点击任何都是做作业，不可查看其他人）

    // 已付费 未完成 已过期 （可以做作业。点击任何都是做作业 ）

    // 已付费 已完成
  }

  renderTabbar (questionItem) {
    let {answerCount} = questionItem
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
      <p>截止日期</p>
      <p>？？？</p>
    </div>
    return (<div className='course-tab-bar'>
      <Tabbar currentSelect={this.state.currentSelect} onTabClick={this.onTabClick}>
        <TabItem title={allAnswerIcon} >SeeOther</TabItem>
        <TabItem title={myAnswerIcon} >doHomeWork or seeMyHomework doStatus is prop</TabItem>
        <TabItem title={dateIcon} disabled>empty</TabItem>
      </Tabbar>
      <style jsx>{`
        .course-tab-bar1 {
          display: flex;
          width: 100%;
        }
      `}</style>
      <style jsx>{`
        .course-tab-bar1 {
          display: flex;
          width: 100%;
        }
      `}</style>
    </div>)
  }

  renderTitle (questionItem) {
    let {title} = questionItem
    let {overWork} = questionItem
    return (<div className='question-title-div'>
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
          font-size: 20px;
        }
        .question-icon {
          {/*flex: 1;*/}
        }
      `}</style>
    </div>)
  }

  renderContent (questionItem) {
    return (<div onClick={() => { this.clickContent() }}>
      renderContentrenderContentrenderContent
    </div>)
  }

  render () {
    let {questionItem} = this.props
    return (<div>
      {this.renderTitle(questionItem)}
      {this.renderContent(questionItem)}
      {this.renderTabbar(questionItem)}
    </div>)
  }
}

