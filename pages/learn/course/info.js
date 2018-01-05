import React from 'react'
import Notice from '../../../containers/learn/main/notice'
import Homework from '../../../containers/learn/main/homework/homework'
import ChapterListPage from '/containers/learn/main/chapterListPage'
import Achieve from '../../../containers/learn/main/achieve'
import Introduce from '../../../containers/learn/main/introduce'
import { Tab, NavBarItem, Progress } from 'react-weui'
import Layout from '../../../components/layout'
import AxiosUtil from '../../../util/axios'
import DateUtil from '../../../util/date'
import DataUtil from '../../../util/data'
import ToolsUtil from '../../../util/tools'
import GetPayInfo from '../../../util/getPayInfo'
import Button from '../../../xz-components/button'
import LoadingIcon from '../../../xz-components/loadingicon'

import Link from 'next/link'
import Router from 'next/router'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseStartDate: '',
      courseStatus: undefined,
      courseId: undefined,
      courseName: undefined,
      finishSection: undefined,
      totalSection: undefined,
      totalChapter: undefined,
      currentSelect: 0,
      homeWorkData: undefined
    }
  }

  componentWillMount = async () => {
    // 1 获取课程id
    let courseId = parseInt(ToolsUtil.getQueryString('courseId'))
    this.setState({
      courseId: courseId
    }, () => {
      this.changeUpdata(this.state.currentSelect)
    })
    this.getPayStatus(courseId)
  }

  // 课程是否购买？
  getPayStatus = async (courseId) => {
    // 1 是否购买
    let courseInfo = await AxiosUtil.get(`/api/learning/courseDetail/${courseId}`, true)
    let courseBg = courseInfo.background
    let imgUrl = courseBg || '/static/img/learn/cover_long.jpeg'
    if (!courseInfo.buyed) {
      this.setState({
        courseStatus: 'unbuyed',
        courseName: courseInfo.name,
        courseStartDate: courseInfo.startTime,
        courseBg: imgUrl
      })
    } else {
      this.getProcessInfo(courseId)
    }
  }

  // 从我的课程列表中获取进度信息
  getProcessInfo = async (courseId) => {
    let courseInfo = await GetPayInfo.getPayInfo(courseId)
    let courseBg = courseInfo.background
    let imgUrl = courseBg || '/static/img/learn/cover_long.jpeg'
    this.setState({
      courseName: courseInfo.courseName,
      finishSection: courseInfo.overSection,
      totalSection: courseInfo.totalSection,
      totalChapter: courseInfo.totalChapter,
      courseStatus: courseInfo.status,
      courseBg: imgUrl
    })
  }

  // tabbar切换的时候 如果是homework 就拉取（会被缓存，不会反复拉区）
  // 其他模块的请求仍然同步发起。不被这里控制
  changeUpdata = async (index) => {
    console.log('!!!!!')
    console.log(index)
    this.setState({currentSelect: index})
    const homeWorkTab = 2
    if (index === homeWorkTab) {
      let homeWorkData = await AxiosUtil.get(`/api/work/workList/${this.state.courseId}`, true)
      this.setState({
        homeWorkData: homeWorkData
      })
    }
  }

  // 这块无奈修改为有currentselect 为了解决 homework组件无法响应被点击 进而无法计算高度的问题
  // 修改后homework数据有这里进行异步拉取。
  // 这个改动会略微影响homework加载速度（点击后才发布请求）
  renderTabbar () {
    let {courseId, courseStatus} = this.state
    return (<div className='course-tab-bar'>
      <Tab type='navbar' onChange={(index) => { this.changeUpdata(index) }}>
        {courseStatus !== undefined && courseStatus !== 'unbuyed' &&
        <NavBarItem label='目录'><ChapterListPage courseId={courseId} /></NavBarItem>}
        {this.renderByPayStatus()}
        <NavBarItem label='作业'><Homework data={this.state.homeWorkData} courseStatus={courseStatus} courseId={courseId} /></NavBarItem>
        <NavBarItem label='成就'><Achieve courseId={courseId} /></NavBarItem>
      </Tab>
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
    if (!courseStatus) {
      return (<NavBarItem label='概述'><LoadingIcon /></NavBarItem>)
    } else {
      if (courseStatus === 'unbuyed') {
        return (<NavBarItem label='概述'><Introduce courseId={courseId} /></NavBarItem>)
      } else {
        return (<NavBarItem label='公告'><Notice courseId={courseId} /></NavBarItem>)
      }
    }
  }

  renderTopDiv () {
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
    let {courseName, courseStartDate, courseBg} = this.state
    let style = {
      background: `url(${courseBg})`,
      backgroundSize: '100% 100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
    return (
      <div style={style} className='course-info'>
        <h1>{courseName}</h1>
        <div>{DataUtil.isEmpty(courseStartDate) ? '开始时间待定' : DateUtil.format(courseStartDate, 'yyyy-MM-dd')}</div>
        <Link href={`/payment/buygether`}>
          <Button size='small'>立即报名</Button>
        </Link>
        <style jsx>{`
            .course-info {
              padding: 10px;
              min-height: 150px;
              text-align: center;
              color: white;
            }
            .course-info h1 {
              font-size: 22px;
            }
          `}</style>
      </div>
    )
  }

  renderCourseOver () {
    let {courseName, courseBg} = this.state
    return (<div style={{background: `url(${courseBg})`, backgroundSize: '100% 100%'}} className='course-info'>
      <h1>{courseName}</h1>
      <a>已结束</a>
      <style jsx>{`
          .course-info {
            padding: 10px;
            min-height: 150px;
            text-align: center;
            color: white;
          }
          .course-info h1 {
            font-size: 22px;
          }
      `}</style>
    </div>)
  }

  renderCourseBuyed () {
    let {courseId, courseName, finishSection, totalSection, totalChapter, courseBg} = this.state
    const prog = Math.ceil(finishSection / (totalSection ? totalSection : 1) * 100)
    // 为null
    totalChapter = Number(totalChapter)
    totalSection = Number(totalSection)
    finishSection = Number(finishSection)
    return (<div style={{background: `url(${courseBg})`, backgroundSize: '100% 100%'}} className='course-info'>
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
        <div onClick={() => { Router.replace('/learn/course/introduce?courseId=' + courseId) }}>点击查看课程介绍</div>
      </div>
      <style jsx>{`
        .course-info {
            padding: 10px;
            min-height: 150px;
            text-align: center;
            color: white;
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
    return (
      <Layout>
        {this.renderTopDiv()}
        {this.state.courseStatus && this.renderTabbar()}
      </Layout>
    )
  }
}
