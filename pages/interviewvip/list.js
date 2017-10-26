import React from 'react'
import TaskCard from '../../containers/interviewvip/taskCard'// 自定义组件
import InterviewLayout from '../../containers/interviewvip/layout'
import CourseInfo from '../../util/getCourseInfo'

import ListButton from '../../containers/interviewvip/listButton'// 组件库

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: '',
      isRender: true,
      error: ''
    }
  }

  componentDidMount = async () => {
    try {
      let list = await CourseInfo.getList('list')
      this.setState({
        list: list
      })
    } catch (e) {
      // 未付费 渲染报错信息.不渲染列表
      this.setState({
        error: e.message
      })
    }
    this.setState({
      isRender: false
    })
    // result page
    // let result = CourseInfo.isLast('1-1')
  }

  renderGroupTitle (groupName) {
    return (<div>{groupName}</div>)
  }

  renderGroupContain (topic) {
    let title = topic.subTitle
    let peopleCount = topic.completeUser + '人已做完'
    return (<div onClick={this.goRouter.bind(this, topic)}>
      <TaskCard>
        <div className='topic-bar'>
          <div>
            <p>{title}</p>
            <p>{peopleCount}</p>
          </div>
          {this.renderProcess(topic)}
        </div>
      </TaskCard>

      <style jsx>{`
      .topic-bar {
        width: 100%
        display: flex
        justify-content: space-between
      }

    `}</style>
    </div>)
  }

  goRouter (topic) {
    let content = topic.finishStatus
    let topicKey = topic.topicKey
    console.log(topic.finishStatus)
    switch (topic.finishStatus) {
      case 'not-do':
        break
      default:
        location.href = `/interviewvip/intro?topicKey=${topicKey}`
    }
  }

  renderProcess (topic) {
    let resultDiv
    let content = topic.finishStatus
    switch (topic.finishStatus) {
      case 'done':
        resultDiv = <div className='icon'><img src='/static/img/interviewvip/list/finish.png' />已完成</div>
        break
      case 'doing':
        resultDiv = <div className='icon'><img src='/static/img/interviewvip/list/doing.png' />正在做</div>
        break
      case 'not-do':
        resultDiv = <div className='icon'><img src='/static/img/interviewvip/list/lock.png' />未完成</div>
        break
      default:
        console.log('error' + topic.finishStatus)
    }
    return (resultDiv)
  }

  renderList () {
    let list = this.state.list
    let arr = []
    console.log(list)
    list.forEach((groups, index) => {
      // 1 将组填入
      let {group, groupName} = groups
      arr.push(this.renderGroupTitle(groupName))
      // 2 遍历 将内容填入
      group.forEach((topic, index) => {
        arr.push(this.renderGroupContain(topic))
      })
    })
    return arr
  }

  render () {
    const {list, isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        {!error && !isRender && <div className='page'>
          <div className='header'>
            <img src='/static/img/interview/interview.png' />
          </div>
          <div className='time'>11月1日~11月6日</div>
          <div className='title'>
            <h1>群面模拟计划</h1>
          </div>
          <div className='interview-list'>
            {this.renderList(list)}
          </div>
          {this.renderListButton()}
        </div>}
        <style global jsx>{`
          .page{
          padding-bottom: 50px;
          width: 100%;
          }
          .header img{
            width: 100%;
          }
          .action {
            display: flex;
            justify-content: space-between;
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            padding: 1rem 2rem;
            box-sizing: border-box;
            background: #F9F9F9;
          }
        `}</style>
      </InterviewLayout>
    )
  }

  renderListButton () {
    return (<ListButton></ListButton>)
  }
}
