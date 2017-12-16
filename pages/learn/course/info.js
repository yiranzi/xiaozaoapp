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

import Link from 'next/link'

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
    let courseInfo = await AxiosUtil.get(`/api/learning/courseDetail/${courseId}`, true)
    if (!courseInfo.buyed) {
      this.setState({
        courseStatus: 'unbuyed',
        courseName: courseInfo.name,
        courseStartDate: courseInfo.startTime
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
      <style global jsx>{`
      .course-tab-bar .weui-navbar__item {
        padding: 0;
        line-height: 50px;
      }
      .course-tab-bar .weui-navbar {
        height: 50px;
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
    let {courseStatus, courseName} = this.state
    if (courseName) {
      if (courseStatus === 'unbuyed') {
        // 未付费
        return (this.renderCourseUnBuyed())
      } else {
        if (courseStatus === 'over') {
          return (this.renderCourseOver())
        } else {
          return (this.renderCourseBuyed())
        }
      }
    } else {
      return (<LoadingIcon />)
    }
  }

  renderCourseUnBuyed () {
    let {courseName, courseStartDate} = this.state
    return (<div className='course-info'>
      <h1>{courseName}</h1>
      <Link href={`/payment/buygether`}>
        <a style={{color: 'white'}}>立即报名</a>
      </Link>
      <style jsx>{`
          .course-info {
            padding: 10px;
            min-height: 150px;
            text-align: center;
            color: white;
            background: url('/static/img/learn/cover_long.jpeg')
          }
          .course-info h1 {
            font-size: 22px;
          }
        `}</style>
    </div>)
  }

  renderCourseOver () {
    let {courseName} = this.state
    return (<div className='course-info'>
      <h1>{courseName}</h1>
      <a>已结束</a>
      <style jsx>{`
          .course-info {
            padding: 10px;
            min-height: 150px;
            text-align: center;
            color: white;
            background: url('/static/img/learn/cover_long.jpeg')
          }
          .course-info h1 {
            font-size: 22px;
          }
      `}</style>
    </div>)
  }

  renderCourseBuyed () {
    let {courseId, courseName, finishSection, totalSection, totalChapter} = this.state
    const prog = Math.ceil(finishSection / (totalSection ? totalSection : 1) * 100)
    return (<div className='course-info'>
      <h1>{courseName}</h1>
      <div className='content'>
        <p>{`进度（本课程共${totalChapter}章，${totalSection}节，已完成${finishSection}节）`}</p>
        <div className='process-bar-out'>
          <Progress style={{width: '80%', height: '10px'}} value={prog} showCancel={false}
            className='wx-pull-left course-progress' />
        </div>
        <p>{prog}%</p>
        <div>
          <Link href={{pathname: '/learn/course/detail', query: {courseId: courseId}}}>
            <a>
              <Button style={{fontSize: '18px', width: '240px', height: '50px'}} className='start-button'>开始学习</Button>
            </a>
          </Link>
        </div>
        <Link href={{pathname: '/learn/course/introduce', query: {courseId: courseId}}}>
          <a style={{color: 'white'}}>概述>></a>
        </Link>
      </div>
      <style jsx>{`
        .course-info {
            padding: 10px;
            min-height: 150px;
            text-align: center;
            color: white;
            background: url('/static/img/learn/cover_long.jpeg')
          }
          .course-info h1 {
            font-size: 22px;
          }
          .course-info .content {
            text-align: center;
            width: 100%;
            line-height: 30px;
          }
          .content .process-bar-out {
            display: flex;
            justify-content: center;
          }
          .content .start-button {
            height: 200px;
          }
        `}</style>
    </div>)
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
