import React from 'react'
import Link from 'next/link'

export default class extends React.Component {
  render () {
    let {courseId, cover, path, title, count, time, process} = this.props
    if (courseId) {
      let imgUrl = cover || '/static/img/learn/cover_little.png'
      let pathname = path || '/learn/course/info'
      return (
        <Link href={{ pathname: pathname, query: { courseId: courseId } }}>
          <a style={{width: '100%'}}>
            <div className='course-view-line'>
              <div className='course-img' >
                <img src={imgUrl} />
              </div>
              <div className='course-info' >
                <div>
                  <p className='course-info-title'>{title}</p>
                </div>
                {process}
                <div className='more-info'>
                  <span>{count}</span>
                  <span>{time}</span>
                </div>
              </div>

            </div>
            <style jsx>{`
              .course-view-line {
                height: 70px;
                font-size: 14px;
                display: flex;
                background-color: white;
                margin: 10px auto;
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
              .course-info > div {
                width: 100%;
              }
              .course-info-title {
                font-size: 16px;
                font-weight: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 230px;
                white-space: nowrap
              }
              .more-info {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
              }
            `}</style>
          </a>
        </Link>
      )
    } else {
      return null
    }
  }
}
