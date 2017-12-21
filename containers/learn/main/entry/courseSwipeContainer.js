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
      let emptyTips
      console.log(this.props.emptyTips)
      switch (this.props.emptyTips) {
        case 'doing':
          emptyTips = <Link href={'/?'}>
            <a>还没有正在进行的课程，赶紧去选课吧~</a>
          </Link>
          break
        case 'finish':
          emptyTips = <p>还没有已完成的课程~</p>
          break
        case 'over':
          emptyTips = <p>还没有已结束的课程~</p>
          break
        default:
          emptyTips = <p>暂时没有信息哦</p>
      }
      return (
        <div className='course-bar-empty'>
          <p>{emptyTips}</p>
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
      let info = course.start && DateUtil.format(course.start, 'yyyy-MM-dd')
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
      let info = course.endDate && DateUtil.format(course.endDate, 'yyyy-MM-dd')
      //
      let finishPercent = 0.55
      let afterCalcCount
      switch (course.status) {
        case 'doing':
          info += '结束'
          break
        case 'finish':
          afterCalcCount = Math.ceil(finishPercent * course.buyCount)
          content = `${afterCalcCount}人已完成`
          info += '结束'
          break
        case 'over':
          afterCalcCount = finishPercent * course.buyCount
          content = `${afterCalcCount}人已完成`
          info += '结束'
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
          <a><MediaBoxTitle style={{margin: 'auto auto 0px 6px'}}>{this.props.title} ></MediaBoxTitle></a>
        </Link>
        <MediaBoxBody style={{display: 'flex', overflow: 'auto'}}>
          {this.renderCourseList()}
        </MediaBoxBody>
        <style global jsx>{`
        .weui-media-box__title {
          font-size: 1rem !important;
        }
        .weui-media-box:before {
          border: none !important;
        }
      `}</style>
      </MediaBox>
    )
  }
}
