import React from 'react'
import Notice from '/containers/learn/main/notice'
import Homework from '/containers/learn/main/homework/homework'
import Discuss from '/containers/learn/main/discuss'
import Achieve from '/containers/learn/main/achieve'
import Introduce from '/containers/learn/main/introduce'
import { Tab, NavBarItem, Progress } from 'react-weui'
import Layout from '/components/layout'
import AxiosUtil from '/util/axios'

import ToolsUtil from '/util/tools'
import GetPayInfo from '/util/getPayInfo'
import Button from '/xz-components/button'
import LoadingIcon from '/xz-components/loadingicon'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseStatus: undefined,
      courseId: undefined,
      courseName: undefined,
      finishSection: undefined,
      totalSection: undefined,
      totalChapter: undefined
    }
  }

  componentDidMount = async () => {
    // 1 获取课程id
    let courseId = parseInt(ToolsUtil.getQueryString('courseId'))
    this.setState({
      courseId: courseId
    })
    this.getPayStatus(courseId)
  }

  // 课程是否购买？
  getPayStatus = async (courseId) => {
    // 1 是否购买
    let courseInfo = await AxiosUtil.get(`/api/learning/courseDetail/${courseId}`)
    if (!courseInfo.buyed) {
      this.setState({
        courseStatus: 'unbuyed',
        courseName: courseInfo.name
      })
    } else {
      this.getProcessInfo(courseId)
    }
  }

  // 从我的课程列表中获取进度信息
  getProcessInfo = async (courseId) => {
    let courseInfo = await GetPayInfo.getPayInfo(courseId)
    this.setState({
      courseName: courseInfo.courseName,
      finishSection: courseInfo.overSection,
      totalSection: courseInfo.totalSection,
      totalChapter: courseInfo.totalChapter,
      courseStatus: courseInfo.status
    })
  }

  renderTabbar () {
    let {courseId, courseStatus} = this.state
    return (<div className='course-tab-bar'>
      <Tab type='navbar'>
        {this.renderByPayStatus()}
        <NavBarItem label='作业'>{courseStatus !== undefined && <Homework courseStatus={this.state.courseStatus} courseId={courseId} />}</NavBarItem>
        <NavBarItem label='讨论'><Discuss courseId={courseId} /></NavBarItem>
        <NavBarItem label='成就'><Achieve courseId={courseId} /></NavBarItem>
      </Tab>
      <style jsx>{`
        .course-tab-bar1 {
          display: flex;
          width: 100%;
        }
      `}</style>
    </div>)
  }

  renderByPayStatus () {
    let {courseStatus, courseId} = this.state
    // 拉到付费信息之后再去做后续逻辑
    if (courseStatus === undefined) {
      return (<NavBarItem label='概述'><LoadingIcon /></NavBarItem>)
    } else {
      if (courseStatus === undefined || courseStatus === 'unbuyed') {
        return (<NavBarItem label='概述'><Introduce courseId={courseId} /></NavBarItem>)
      } else {
        return (<NavBarItem label='公告'><Notice courseId={courseId} /></NavBarItem>)
      }
    }
  }

  renderTopImg () {
    let {courseId, courseStatus, courseName, finishSection, totalSection, totalChapter} = this.state
    if (courseName) {
      let content
      if (courseStatus === 'unbuyed') {
        // 未付费
        content = <a href={`/payment/buygether`}>立即报名</a>
      } else {
        // 已付费
        if (courseStatus === 'over') {
          content = <a>已结束</a>
        } else {
          const prog = Math.ceil(finishSection / (totalSection ? totalSection : 1) * 100)
          content = <div className='content'>
            <p>{`进度（本课程共${totalChapter}章，${totalSection}节，已完成${finishSection}节`}</p>
            <Progress style={{width: '50%'}} value={prog} showCancel={false}
              className='wx-pull-left course-progress' />
            <a className='study-button' href={`/learn/course/detail?courseId=${courseId}`}>
              <Button>开始学习</Button>
            </a>
            <a style={{width: '100%'}}href={`/learn/main/introduce?courseId=${courseId}`}>概述>></a>
            <style jsx>{`
              .content {
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                justify-content: center;
              }
              .study-button {
                width: 60%;
              }
            `}</style>
          </div>
        }
      }
      return (<div className='course-info'>
        <h1>{courseName}</h1>
        {content}
        <style jsx>{`
          .course-info {
            text-align: center;
          }
        `}</style>
      </div>)
    } else {
      return <LoadingIcon />
    }
  }

  render () {
    return (<div>
      <Layout>
        {this.renderTopImg()}
        {this.renderTabbar()}
      </Layout>
    </div>)
  }
}
