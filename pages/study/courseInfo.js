import React from 'react'
import Notice from '/containers/study/notice'
import Homework from '/containers/study/homework/homework'
import Discuss from '/containers/study/discuss'
import Achieve from '/containers/study/achieve'
import Introduce from '/containers/study/introduce'
import { Tab, NavBarItem, Progress } from 'react-weui'
import Layout from '../../components/layout'
import AxiosUtil from '../../util/axios'

import ToolsUtil from '../../util/tools'
import GetPayInfo from '../../util/getPayInfo'
import Button from '/xz-components/button'

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
    // 2 根据id拉取数据
    await this.setState({
      courseId: courseId
    })
    this.set()
  }

  set = async () => {
    let {courseId} = this.state
    let courseInfo = await GetPayInfo.getPayInfo(courseId)
    this.setState({
      courseStatus: courseInfo.status
      // courseStatus: 'unbuyed'
    })
    this.getCourseInfo(courseInfo)
  }

  getCourseInfo = async (courseInfo) => {
    let {status: courseStatus} = courseInfo
    if (courseStatus === undefined || courseStatus === 'unbuyed') {
      let {courseId} = this.state
      // 拉取名字
      let courseInfo = await AxiosUtil.get(`/api/learning/courseDetail/${courseId}`)
      this.setState({
        courseName: courseInfo.name
      })
    } else {
      // 保存信息
      this.setState({
        courseName: courseInfo.courseName,
        finishSection: courseInfo.overSection,
        totalSection: courseInfo.totalSection,
        totalChapter: courseInfo.totalChapter
      })
    }
  }

  renderTabbar () {
    let {courseId} = this.state
    return (<div className='course-tab-bar'>
      <Tab type='navbar'>
        {this.renderByPayStatus()}
        <NavBarItem label='作业'><Homework courseStatus={this.state.courseStatus} courseId={courseId} /></NavBarItem>
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
    if (courseStatus === undefined || courseStatus === 'unbuyed') {
      return (<NavBarItem label='概述'><Introduce courseId={courseId} /></NavBarItem>)
    } else {
      return (<NavBarItem label='公告'><Notice courseId={courseId} /></NavBarItem>)
    }
  }

  renderTopImg () {
    let {courseId, courseStatus, courseName, finishSection, totalSection, totalChapter} = this.state
    if (courseName) {
      let content
      if (courseStatus === 'undefined' || courseStatus === 'unbuyed') {
        // 未付费
        {/*content = <a href={`/payment/buygether`}>报名课程</a>*/}
        content = <a href={`/study/introduce`}>立即报名</a>
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
            <a style={{width: '100%'}}href={`/study/introduce?courseId=${courseId}`}>概述>></a>
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
      return null
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
