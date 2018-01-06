import React from 'react'
import {
  Tab,
  TabBody,
  NavBar,
  NavBarItem,
  Panel,
  PanelHeader,
  PanelBody,
  Swiper
} from 'react-weui'
import DataUtil from '/util/data'
import Layout from '../..//components/layout'
import LoadingIcon from '../../xz-components/loadingicon'
import GetPayInfo from '/util/getPayInfo'
import AxiosUtil from '/util/axios'

import CourseSwipeContainer from '../../containers/learn/main/entry/courseSwipeContainer'

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
    '4': '技能培养2'
  }

  constructor (props) {
    super(props)
    this.state = {
      bannerList: [],
      myCourseList: [],
      courseRecommend: []
    }
    this.state = {
      tab: 'doing'
    }
  }

  componentDidMount = async () => {
    const _this = this

    AxiosUtil.get('/api/adv/getAdvByTypeAndObjId/9/1').then((bannerList) => {
      _this.setState({bannerList: bannerList})
    })

    GetPayInfo.getCourseList().then((myCourseList) => {
      _this.setState({myCourseList: DataUtil.groupBy(myCourseList, 'status')})
    })

    AxiosUtil.get('/api/learning/courseRecommend', true).then((courseRecommend) => {
      _this.setState({courseRecommend: DataUtil.groupBy(courseRecommend, 'type')})
    })
  }

  renderBarItemList () {
    let courseStautsName = this.courseStautsName
    let keyList = Object.keys(courseStautsName)
    return keyList.map((ele, index) => {
      return (
        <NavBarItem key={ele} active={this.state.tab === ele} onClick={() => { this.setState({tab: ele}) }}>
          {courseStautsName[ele]}
        </NavBarItem>
      )
    })
  }

  renderTabbar () {
    return (
      <Tab>
        <NavBar>
          {this.renderBarItemList()}
        </NavBar>
        <TabBody style={{backgroundColor: '#FFFFFF'}}>
          {this.renderContent()}
        </TabBody>
        <style global jsx>{`
          .weui-navbar__item {
            padding: 0.5rem 0 !important;
            font-size: 1rem !important;
          }
        `}</style>
      </Tab>)
  }

  renderContent () {
    let {myCourseList} = this.state
    if (myCourseList) {
      let courseGroupList = myCourseList[this.state.tab]
      let url = {
        pathname: '/learn/myCourseList'
      }
      return (
        <CourseSwipeContainer
          category='mine'
          courseGroupList={courseGroupList}
          routerUrl={url}
          title='查看全部' />
      )
    }
  }

  renderCourseRecommand () {
    let {courseRecommend} = this.state
    if (courseRecommend) {
      let recommandKeyList = Object.keys(this.courseRecommandName)
      return (
        <Panel>
          <PanelHeader style={{textAlign: 'center'}}>
            <div className='title'>
              <img src='/static/img/icon/homework-icon.png' style={{width: '2rem'}} />
              <h3>课程推荐</h3>
            </div>
          </PanelHeader>
          <PanelBody>
            {recommandKeyList.map((key, index) => {
              let url = {
                pathname: '/learn/recommand',
                query: { type: key }
              }
              return (
                <CourseSwipeContainer key={index}
                  category='recommand'
                  courseGroupList={courseRecommend[key]}
                  routerUrl={url}
                  title={this.courseRecommandName[key]} />
              )
            })}
          </PanelBody>
          <style>{`
            .title {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>
        </Panel>
      )
    }
  }

  renderBanner () {
    const {bannerList} = this.state
    if (DataUtil.isEmpty(bannerList)) return <LoadingIcon />
    return (
      <Swiper height={100}>
        {bannerList.map((item, index) => {
          return (
            <div key={`banner-${index}`}>
              <a href={item.url} style={{display: 'block'}}>
                <img src={item.img} style={{width: '100%'}} />
              </a>
            </div>
          )
        })}
      </Swiper>
    )
  }

  render () {
    return (
      <Layout>
        <div className='learn-system-entry'>
          {this.renderBanner()}
          {this.renderTabbar()}
          {this.renderCourseRecommand()}
        </div>
        <style jsx>{`
          .learn-system-entry {
            background: #efeff4 !important;
          }
        `}</style>
      </Layout>
    )
  }
}
