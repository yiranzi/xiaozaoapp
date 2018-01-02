import React from 'react'
import DateUtil from '/util/date'
import Link from 'next/link'
import DataUtil from '../../../util/data'

export default class extends React.Component {
  renderLine (ele, key) {
    if (ele) {
      let {buyCount, courseId, title, start, cover, path} = ele
      let imgUrl = cover || '/static/img/learn/cover_little.png'
      let pathname = path || '/learn/course/info'
      return (
        <Link key={key} href={{ pathname: pathname, query: { courseId: courseId } }}>
          <a style={{width: '100%', height: '100%'}}>
            <div className='course-view-line'>
              <div className='course-img' >
                <img src={imgUrl} />
              </div>
              <div className='course-info' >
                <div className='course-info-title'>{title}</div>
                <div className='more-info'>
                  <span>{buyCount}人正在学习</span>
                  <span>{DateUtil.format(new Date(start), 'yyyy-MM-dd')}开课</span>
                </div>
              </div>
            </div>
            <style jsx>{`
              .course-view-line {
                display: flex;
                background-color: white;
                margin: 5px auto;
                font-size: 14px;
                height: 80px;
              }
              .course-img {
                flex: 1;
              }
              .course-img img {
                width: 100%;
                height: 100%;
              }
              .course-info {
                padding: 5px;
                flex: 2;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
              }
              .course-info h2 {
                font-size: 16px;
                font-weight: normal;
              }
              .more-info {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
              }
              .course-info-title {
                font-size: 16px;
                font-weight: normal;
              }
              .course-info > div {
                width: 100%;
              }
            `}</style>
          </a>
        </Link>
      )
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
            <div key={`key_${index}`}>
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
        `}</style>
        <style global jsx>{`
          .weui-navbar+.weui-tab__panel {
            padding-top: 40px !important;
          }
        `}</style>
      </div>
    )
  }
}
