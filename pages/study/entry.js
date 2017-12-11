import React from 'react'
import {
  Tab,
  TabBody,
  NavBar,
  NavBarItem,
  Panel,
  PanelHeader
} from 'react-weui'
import Layout from '../../components/layout'
import GetPayInfo from '../../util/getPayInfo'
import AxiosUtil from '/util/axios'

import CourseSwipeContainer from '/containers/study/entry/courseSwipeContainer'

export default class extends React.Component {
  courseStautsName = {
    'doing': '正在进行',
    'finish': '已完成',
    'over': '已结束'
  }

  courseRecommandName = {
    '1': '职业核心',
    '2': '个人能力',
    '3': '技能培养',
    '4': '再编一个吧'
  }

  constructor (props) {
    super(props)
    this.state = {
      myCourseList: undefined,
      courseRecommend: undefined
    }
    this.state = {
      tab: 'doing'
    }
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
    let courseRecommend = await AxiosUtil.get('/api/private/learning/courseRecommend', true)
    let courseRecommendGroupByType = {}
    courseRecommend.forEach((ele, index) => {
      courseRecommendGroupByType[ele.type] = courseRecommendGroupByType[ele.type] || []
      courseRecommendGroupByType[ele.type].push(ele)
    })
    this.setState({
      courseRecommend: courseRecommendGroupByType
    })
  }

  renderBarItemList () {
    let courseStautsName = this.courseStautsName
    let keyList = Object.keys(courseStautsName)
    return keyList.map((ele, index) => {
      return <NavBarItem key={ele} active={this.state.tab === ele} onClick={() => { this.setState({tab: ele}) }}>
        {courseStautsName[ele]}
      </NavBarItem>
    })
  }

  renderTabbar () {
    return (
      <Tab>
        <NavBar>
          {this.renderBarItemList()}
        </NavBar>
        <TabBody>
          <Panel>
            {this.renderTest()}
          </Panel>
        </TabBody>
      </Tab>)
  }

  renderTest () {
    let {myCourseList} = this.state
    console.log(myCourseList)
    if (myCourseList) {
      let courseGroupList = myCourseList[this.state.tab]
      return (<CourseSwipeContainer
        courseGroupList={courseGroupList}
        routerUrl={'/study/myCourseList'}
        title='查看全部' />)
    }
  }

  renderRecommandByType () {
    let {courseRecommend} = this.state
    if (courseRecommend) {
      let recommandKeyList = Object.keys(this.courseRecommandName)
      return recommandKeyList.map((key, index) => {
        return (<CourseSwipeContainer
          courseGroupList={courseRecommend[key]}
          routerUrl={`/study/recommand?type=${key}`}
          title={this.courseRecommandName[key]} />)
      })
    }
  }

  renderCourseRecommand () {
    return (<Panel>
      <PanelHeader>
        课程推荐
      </PanelHeader>
      {this.renderRecommandByType()}
    </Panel>)
  }

  render () {
    return (
      <Layout>
        <div className='learn-system-entry'>
          <img className='ad-banner' src='/static/img/study/buyBg_1.jpeg' />
          {this.renderTabbar()}
          {this.renderCourseRecommand()}
          <style jsx>{`
            .learn-system-entry {
              width: 100%;
            }
            .ad-banner {
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
