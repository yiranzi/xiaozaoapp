import React from 'react'

import { Progress } from 'react-weui'
import Layout from '../../components/layout'
import GetPayInfo from '../../util/getPayInfo'
import DateUtil from '../../util/date'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buyCount: undefined,
      myCourseList: undefined
    }
    this.renderProgressBar = this.renderProgressBar.bind(this)
  }

  componentDidMount = async () => {
    let myCourseList = await GetPayInfo.getCourseList()
    let courseListGroupByStatus = {}
    myCourseList.forEach((ele, index) => {
      courseListGroupByStatus[ele.status] = courseListGroupByStatus[ele.status] || []
      courseListGroupByStatus[ele.status].push(ele)
    })
    this.setState({
      myCourseList: courseListGroupByStatus
    })
  }

  renderProgressBar (current, total) {
    const prog = Math.ceil(current / (total ? total : 1) * 100)
    return (<Progress style={{width: '100%'}} value={prog} showCancel={false}
      className='wx-pull-left course-progress' />)
  }

  goRouter (routerUrl) {
    location.href = routerUrl
  }

  renderLine (ele) {
    if (ele) {
      let {buyCount, courseId, courseName, overSection, totalSection, endDate} = ele
      console.log(ele)
      return (<div className='course-view-line' onClick={() => { this.goRouter(`/study/courseInfo?courseId=${courseId}`) }}>
        <div style={{flex: '1'}} className='course-img' >
          <img src='/static/img/study/buyBg_1.jpeg' />
        </div>
        <div style={{flex: '2'}} className='course-info' >
          <h2 className=''>{courseName}</h2>
          {this.renderProgressBar(overSection, totalSection)}
          <div>
            <span>{buyCount}人已报名</span>
            <span>{DateUtil.format(new Date(endDate), 'yyyy-MM-dd')}结束</span>
          </div>
        </div>
        <style jsx>{`
        .course-view-line {
          display: flex;
          width: 100%;
          align-items: center;
        }
        .course-img img {
          width: 100%;
        }
        .course-info {
          flex: 1;
        }
      `}</style>
      </div>)
    }
  }

  renderList () {
    let {myCourseList} = this.state
    let courseStauts = ['doing', 'finish', 'over']
    let courseStautsName = ['正在', '已完成', '已结束']
    let list
    return (courseStauts.map((ele, index) => {
      if (myCourseList && myCourseList[ele]) {
        list = myCourseList[ele].map((ele, index) => {
          return (this.renderLine(ele))
        })
        return (<div>
          <h1>{courseStautsName[index]}</h1>
          {list}
        </div>)
      }
    }))
  }

  render () {
    return (
      <Layout>
        <div className='my-course-list'>
          <h1 className='title'>我的课堂</h1>
          {this.renderList()}
          <style jsx>{`
            .my-course-list {
              width: 100%;
            }
            .title {

            }
          `}</style>
        </div>
      </Layout>
    )
  }
}
