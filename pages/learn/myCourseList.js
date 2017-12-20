import React from 'react'

import { Progress } from 'react-weui'
import Layout from '/components/layout'
import GetPayInfo from '/util/getPayInfo'
import DateUtil from '/util/date'
import TitleWithIcon from '/xz-components/titleWithIcon'
import Link from 'next/link'
import ToolsUtil from '/util/tools'

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
    return (
      <div className='parocess-div'>
        <Progress style={{width: '80%'}} value={prog} showCancel={false}
          className='wx-pull-left course-progress' />
        <style jsx>{`
          .parocess-div {
            height: 25px;
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }

  renderLine (ele, key, statusIndex) {
    if (ele) {
      let {buyCount, courseId, courseName, overSection, totalSection, endDate, cover} = ele
      let content
      console.log(key)
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
      let imgUrl
      if (cover) {
        // 1 传入完成拼接
        cover = ToolsUtil.addByType(cover, 'show')
        // 2 设置
        imgUrl = cover
      } else {
        imgUrl = '/static/img/learn/cover_little.png'
      }
      return (
        <Link replace key={key} href={{ pathname: '/learn/course/info', query: { courseId: courseId } }}>
          <a style={{width: '100%', height: '100%'}}>
            <div className='course-view-line'>
              <div className='course-img' >
                <img src={imgUrl} />
              </div>
              <div className='course-info' >
                <h2 className=''>{courseName}</h2>
                {this.renderProgressBar(overSection, totalSection)}
                <div className='more-info'>
                  <span>{content}</span>
                  <span>{DateUtil.format(new Date(endDate), 'yyyy-MM-dd')}结束</span>
                </div>
              </div>

            </div>
            <style jsx>{`
              .course-view-line {
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
                padding: 10px;
                flex: 2;
              }
              .course-info h2 {
                font-size: 18px;
              }
              .more-info {
                display: flex;
                justify-content: space-between;
              }
            `}</style>
          </a>
        </Link>
      )
    }
  }

  renderList () {
    let {myCourseList} = this.state
    let courseStauts = ['doing', 'finish', 'over']
    let courseStautsName = ['正在进行', '已完成', '已结束']
    let list
    return (courseStauts.map((ele, statusIndex) => {
      if (myCourseList && myCourseList[ele]) {
        list = myCourseList[ele].map((ele, index) => {
          return (this.renderLine(ele, index, statusIndex))
        })
        return (<div className='course-div' key={statusIndex}>
          <h1>{courseStautsName[statusIndex]}</h1>
          {list}
          <style jsx>{`
            .course-div h1 {
              font-size: 18px;

            }
          `}</style>
        </div>)
      }
    }))
  }

  render () {
    return (
      <Layout>
        <div className='my-course-list'>
          <TitleWithIcon outStyle={{margin: '20px'}} title='我的课堂' imgUrl={'/static/img/icon/icon_2.jpeg'} />
          {this.renderList()}
          <style jsx>{`
            .my-course-list {
              min-height: 800px;
              padding: 10px;
               background-color: #efeff4;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}
