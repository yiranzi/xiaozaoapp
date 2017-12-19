import React from 'react'
import { MediaBox, MediaBoxTitle, MediaBoxBody } from 'react-weui'
import CourseInfoBar from './courseInfoBar'
import DateUtil from '/util/date'
import Link from 'next/link'

export default class extends React.Component {
  renderViewAll (routerUrl) {
    return (<Link href={routerUrl} key={'total'}>
      <a style={{background: 'url(/static/img/learn/cover_little.png)', marginLeft: '5px'}}>
        <div className='view-all-div'>
          <p>查看全部</p>
        </div>
        <style jsx>{`
          .view-all-div {
            flex-basis: 100px;
            flex-shrink: 0;
            flex-grow: 0;
            padding: 10px;
            text-align: center;
            margin-top: 20px;
            color: white;
          }
          .view-all-div p {
            width: 150px;
            margin-left: 5px;
          }
        `}</style>
      </a>
    </Link>)
  }
  renderCourseList () {
    let {courseGroupList} = this.props
    if (courseGroupList) {
      if (courseGroupList[0].start) {
        return (this.renderRecommand(courseGroupList))
      } else {
        return (this.renderMy(courseGroupList))
      }
    } else {
      return (
        <div className='course-bar-empty'>
          <p>您还没有课程，赶紧去选课吧~</p>
          <style jsx>{`
            .course-bar-empty {
              width: 100%;
              text-align: center;
              margin-top: 20px;
            }
          `}</style>
        </div>
      )
    }
  }

  renderRecommand (courseGroupList) {
    let arr = courseGroupList.map((course, index) => {
      let title = course.title
      let content = `${course.buyCount}人正在学习`
      let info = course.start && DateUtil.format(course.start, 'yy-MM-dd')
      info += '开课'
      return (
        <CourseInfoBar
          category={this.props.category}
          key={index}
          courseId={course.courseId}
          bgImg={course.cover}
          title={title}
          des={content}
          info={info}
        />
      )
    })
    arr.push(this.renderViewAll(this.props.routerUrl))
    return arr
  }

  renderMy (courseGroupList) {
    let arr = courseGroupList.map((course, index) => {
      // 我的课程字段
      let title = course.courseName
      let content = `${course.buyCount}人正在学习`
      let info = course.endDate && DateUtil.format(course.endDate, 'yy-MM-dd')
      //
      let finishPercent = 0.55
      let afterCalcCount
      switch (course.status) {
        case 'doing':
          info += '结束'
          break
        case 'done':
          afterCalcCount = Math.ceil(finishPercent * course.buyCount)
          content = `${afterCalcCount}人已完成`
          info = '已完成'
          break
        case 'over':
          afterCalcCount = finishPercent * course.buyCount
          content = `${afterCalcCount}人已完成`
          info = '已结束'
          break
      }
      return (
        <CourseInfoBar
          category={this.props.category}
          key={index}
          courseId={course.courseId}
          bgImg={course.cover}
          title={title}
          des={content}
          info={info}
        />
      )
    })
    arr.push(this.renderViewAll(this.props.routerUrl))
    return arr
  }

  render () {
    return (
      <MediaBox style={{minHeight: '126px'}}>
        <Link href={this.props.routerUrl}>
          <a><MediaBoxTitle>{this.props.title} ></MediaBoxTitle></a>
        </Link>
        <MediaBoxBody style={{display: 'flex', overflow: 'auto'}}>
          {this.renderCourseList()}
        </MediaBoxBody>
        <style global jsx>{`
        .weui-media-box__title {
          font-size: 1rem !important;
        }
        .course-info-bar .weui-media-box__title {
          margin-bottom: 0 !important;
        }
      `}</style>
      </MediaBox>
    )
  }
}
