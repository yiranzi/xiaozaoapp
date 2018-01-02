import React from 'react'
import { Progress } from 'react-weui'
import DateUtil from '../../../util/date'
import LoadingIcon from '../../../xz-components/loadingicon'
import Link from 'next/link'

export default class extends React.Component {
  renderProgressBar (current, total) {
    const prog = Math.ceil(current / (total || 1) * 100)
    return (
      <div className='parocess-div'>
        <Progress style={{width: '80%'}} value={prog} showCancel={false}
          className='wx-pull-left course-progress' />
        <span>{prog}%</span>
        <style jsx>{`
          .parocess-div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        `}</style>
      </div>
    )
  }

  renderLine (ele, key, statusIndex) {
    if (ele) {
      let {buyCount, courseId, courseName, overSection, totalSection, endDate, cover, path} = ele
      let content
      let finishPercent = 0.55
      let afterCalcCount
      switch (statusIndex) {
        case 0:
          content = buyCount + '人正在学习'
          break
        case 1:
          afterCalcCount = Math.ceil(finishPercent * buyCount)
          content = afterCalcCount + '人已完成'
          break
        case 2:
          afterCalcCount = Math.ceil(finishPercent * buyCount)
          content = afterCalcCount + '人已完成'
          break
      }
      let imgUrl = cover || '/static/img/learn/cover_little.png'
      let pathname = path || '/learn/course/info'
      return (
        <Link key={key} href={{ pathname: pathname, query: { courseId: courseId } }}>
          <a style={{width: '100%'}}>
            <div className='course-view-line'>
              <div className='course-img' >
                <img src={imgUrl} />
              </div>
              <div className='course-info' >
                <div className='course-info-title'>{courseName}</div>
                {this.renderProgressBar(overSection, totalSection)}
                <div className='more-info'>
                  <span>{content}</span>
                  <span>{DateUtil.format(new Date(endDate), 'yyyy-MM-dd')}结束</span>
                </div>
              </div>

            </div>
            <style jsx>{`
              .course-view-line {
                height: 80px;
                font-size: 14px;
                display: flex;
                background-color: white;
                margin: 5px auto;
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
    }
  }

  renderList () {
    let {myCourseList} = this.props
    let courseStauts = ['doing', 'finish', 'over']
    let courseStautsName = ['正在进行', '已完成', '已结束']
    let list
    return (
      courseStauts.map((ele, statusIndex) => {
        if (myCourseList && myCourseList[ele]) {
          list = myCourseList[ele].map((ele, index) => {
            return (this.renderLine(ele, index, statusIndex))
          })
          return (
            <div className='course-div' key={statusIndex}>
              <h4>{courseStautsName[statusIndex]}</h4>
              {list}
              <style jsx>{`
                .course-div h1 {
                  font-size: 18px;
                }
              `}</style>
            </div>)
        }
      })
    )
  }

  render () {
    const { done } = this.props
    if (!done) return <LoadingIcon />
    return (
      <div className='my-course-list'>
        {this.renderList()}
        <style jsx>{`
          .my-course-list {
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
