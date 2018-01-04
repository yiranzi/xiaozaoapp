import React from 'react'
import DateUtil from '/util/date'
import DataUtil from '../../../util/data'
import RenderLine from '../../../containers/learn/course/renderLine'

export default class extends React.Component {
  renderLine (ele, key) {
    if (ele) {
      let {buyCount, courseId, title, start, cover, path} = ele
      let studyCount = `${buyCount}人正在学习`
      let time = `${DateUtil.format(new Date(start), 'yyyy-MM-dd')}开课`
      return (<RenderLine
        courseId={courseId} cover={cover} path={path} key={key}
        title={title} count={studyCount} time={time} />)
    }
  }

  render () {
    let {courseRecommend} = this.props
    if (DataUtil.isEmpty(courseRecommend)) {
      return <div />
    }
    let keys = Object.keys(courseRecommend)
    return (
      <div className='recommand-course-list'>
        {keys.map((item, index) => {
          return (
            <div className='course-div' key={`key_${index}`}>
              <h4>{item}</h4>
              {courseRecommend[item].map((course, index) => {
                return this.renderLine(course, index)
              })}
            </div>
          )
        })}
        <style jsx>{`
          .recommand-course-list {
            padding: 10px;
            background-color: #efeff4;
          }
          .course-div {
            margin-bottom: 5px;
          }
        `}</style>
      </div>
    )
  }
}
