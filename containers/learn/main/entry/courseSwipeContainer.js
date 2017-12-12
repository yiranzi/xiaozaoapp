import React from 'react'
import {
  PanelBody,
  Cell,
  CellFooter
} from 'react-weui'

import SwipeContainer from '/containers/learn/main/entry/swipeContainer'
import CourseInfoBar from '/containers/learn/main/entry/courseInfoBar'
import DateUtil from '/util/date'

export default class extends React.Component {
  renderInner () {
    let {courseGroupList} = this.props
    if (courseGroupList) {
      if (courseGroupList[0].start) {
        return courseGroupList.map((course, index) => {
          let title = course.title
          let content = `${course.buyCount}人已购买`
          let info = course.start && DateUtil.format(course.start, 'yy-MM-dd')
          info += '开课'
          return <CourseInfoBar key={index}
            courseId={course.courseId}
            bgImg={course.cover}
            title={title}
            des={content}
            info={info} />
        })
      } else {
        return courseGroupList.map((course, index) => {
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
          return <CourseInfoBar key={index}
            courseId={course.courseId}
            bgImg={'default'}
            title={title}
            des={content}
            info={info} />
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
      <PanelBody>
        <Cell style={{borderTop: 'none'}}>
          <CellFooter style={{textAlign: 'left'}} onClick={() => { this.goRouter() }}>
            <h3>{`${this.props.title} >`}</h3>
          </CellFooter>
        </Cell>
        <Cell style={{borderTop: 'none'}}>
          {this.props.courseGroupList ? <SwipeContainer divList={this.renderInner()} /> : <div>空的</div>}
        </Cell>
      </PanelBody>
    )
  }
}
