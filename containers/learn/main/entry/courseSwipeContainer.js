import React from 'react'
import { MediaBox, MediaBoxTitle, MediaBoxBody } from 'react-weui'
import CourseInfoBar from './courseInfoBar'
import DateUtil from '/util/date'

export default class extends React.Component {
  renderCourseList () {
    let {courseGroupList} = this.props
    if (courseGroupList) {
      // 课程推荐的字段
      if (courseGroupList[0].start) {
        return courseGroupList.map((course, index) => {
          let title = course.title
          let content = `${course.buyCount}人已购买`
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
      } else {
        return courseGroupList.map((course, index) => {
          // 我的课程字段
          let title = course.courseName
          let content = `${course.buyCount}人已购买`
          let info = course.endDate && DateUtil.format(course.endDate, 'yy-MM-dd')
          switch (course.status) {
            case 'doing':
              info += '结束'
              break
            case 'done':
              info = '已完成'
              break
            case 'over':
              info = '已结束'
              break
          }
          return (
            <CourseInfoBar
              category={this.props.category}
              key={index}
              courseId={course.courseId}
              bgImg={'default'}
              title={title}
              des={content}
              info={info}
            />
          )
        })
      }
    }
  }

  goRouter () {
    let {routerUrl} = this.props
    if (routerUrl) {
      location.href = routerUrl
    }
  }

  render () {
    return (
      <div>
        <MediaBox>
          <MediaBoxTitle onClick={this.goRouter}>{this.props.title} ></MediaBoxTitle>
          <MediaBoxBody style={{display: 'flex', overflow: 'auto'}}>
            {this.props.courseGroupList ? this.renderCourseList() : <div>空的</div>}
          </MediaBoxBody>
        </MediaBox>
        <style global jsx>{`
          .weui-media-box__title {
            font-size: 1rem !important;
          }
          .course-info-bar .weui-media-box__title {
            margin-bottom: 0 !important;
          }
        `}</style>
      </div>
    )
  }
}
