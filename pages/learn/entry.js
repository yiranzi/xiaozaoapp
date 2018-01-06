import React from 'react'
import {
  Tab,
  TabBody,
  NavBar,
  NavBarItem,
  Swiper
} from 'react-weui'
import MyCourseList from '../../containers/learn/course/myCourseList'
import RecommandCourseList from '../../containers/learn/course/recommandCourseList'
import DataUtil from '/util/data'
import Layout from '../..//components/layout'
import LoadingIcon from '../../xz-components/loadingicon'
import GetPayInfo from '../../util/getPayInfo'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bannerList: [],
      myCourseList: [],
      courseRecommend: [],
      done: false
    }
    this.state = {
      tab: 'mine'
    }
  }

  componentDidMount = async () => {
    const _this = this

    AxiosUtil.get('/api/adv/getAdvByTypeAndObjId/9/1').then((bannerList) => {
      _this.setState({bannerList: bannerList})
    })

    GetPayInfo.getCourseList().then((myCourseList) => {
      _this.setState({myCourseList: DataUtil.groupBy(myCourseList, 'status'), done: true})
    })

    AxiosUtil.get('/api/learning/courseRecommend', true).then((courseRecommend) => {
      _this.setState({courseRecommend: DataUtil.groupBy(courseRecommend, 'type')})
    })
  }

  renderBanner () {
    const {bannerList} = this.state
    if (DataUtil.isEmpty(bannerList)) return null
    return (
      <div className='top-banner'>
        <Swiper>
          {bannerList.map((item, index) => {
            return (
              <div key={`banner-${index}`}>
                <a href={item.url} style={{display: 'block', width: '100%', height: '100%'}}>
                  <img src={item.img} style={{width: '100%', height: '100%'}} />
                </a>
              </div>
            )
          })}
        </Swiper>
        <style jsx>{`
          .top-banner {
            width: 100%;
            height: 160px;
          }
        `}</style>
      </div>
    )
  }

  render () {
    const { tab, done } = this.state
    if (!done) {
      return <LoadingIcon />
    } else {
      return (
        <Layout>
          <div className='learn-system-entry'>
            {this.renderBanner()}
            <Tab>
              <NavBar>
                <NavBarItem active={tab === 'mine'} onClick={(e) => this.setState({tab: 'mine'})}>我的课程</NavBarItem>
                <NavBarItem active={tab === 'recommand'} onClick={(e) => this.setState({tab: 'recommand'})}>推荐课程</NavBarItem>
              </NavBar>
              <TabBody>
                <div style={{display: tab === 'mine' ? null : 'none'}}>
                  <MyCourseList myCourseList={this.state.myCourseList} />
                </div>
                <div style={{display: tab === 'recommand' ? null : 'none'}}>
                  <RecommandCourseList courseRecommend={this.state.courseRecommend} />
                </div>
              </TabBody>
            </Tab>
          </div>
        </Layout>
      )
    }
  }
}
