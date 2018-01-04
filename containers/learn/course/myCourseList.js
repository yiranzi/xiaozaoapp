import React from 'react'
import { Progress } from 'react-weui'
import DateUtil from '../../../util/date'
import LoadingIcon from '../../../xz-components/loadingicon'
import RenderLine from '../../../containers/learn/course/renderLine'

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
      let title = courseName
      let studyCount = content
      let time = `${DateUtil.format(new Date(endDate), 'yyyy-MM-dd')}结束`
      let process = this.renderProgressBar(overSection, totalSection)
      return (<RenderLine
        courseId={courseId} cover={cover} path={path} key={key}
        title={title} count={studyCount} time={time} process={process} />)
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
                .course-div {
                  margin-bottom: 5px;
                }
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
      </div>
    )
  }
}
