import React from 'react'
import {
  Panel,
  PanelHeader,
  PanelBody,
  Cell,
  CellFooter
} from 'react-weui'

import SwipeContainer from '/containers/study/entry/swipeContainer'
import CourseInfoBar from '/containers/study/entry/courseInfoBar'
import DateUtil from '/util/date'

export default class extends React.Component {
  renderInner () {
    let {courseGroupList} = this.props
    if (courseGroupList) {
      return courseGroupList.map((course, index) => {
        let title = course.courseName
        let content = `${course.buyCount}人已购买`
        let info = course.endDate && DateUtil.format(course.endDate, 'yy-MM-dd')
        switch (course.status) {
          case 'doing':
            info += '天后结束'
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
          title={title}
          des={content}
          info={info} />
      })
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
