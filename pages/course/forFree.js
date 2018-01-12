import React from 'react'// 库
import Layout from '../../components/layout'// container
import AxiosUtil from '../../util/axios'
import WxShare from '../../xz-components/newWxShare'
import CourseInfoNavBar from '../../containers/abilitycollege/buygether/courseInfoNavBar'
import MoreCourseIcon from '../../containers/abilitycollege/buygether/moreCourseIcon'
import Fixfooter from '../../xz-components/fixfooter'
import ToolsUtil from '../../util/tools'
import {Alert} from '../../xz-components/alert'
import LoadingIcon from '../../xz-components/loadingicon'
import Link from 'next/link'

// 介绍页
export default class extends React.Component {
  littleShareUrl // 小程序分享url
  wxConfig = new WxShare() // 分享初始化

  constructor (props) {
    super(props)
    this.state = {
      courseId: undefined,
      packageId: undefined,
      upstreamGiveId: undefined,
      myGiveId: undefined,
      myGroupingId: undefined, // 我正在开团的id
      detailList: undefined
    }
    this.getFreeCourse = this.getFreeCourse.bind(this)
  }

  componentWillMount = async () => {
    // 获取courseId
    let courseId = parseInt(ToolsUtil.getQueryString('courseId')) // 为了拉取课程信息
    let packageId = parseInt(ToolsUtil.getQueryString('packageId')) // 为了获取课程
    let upstreamGiveId = parseInt(ToolsUtil.getQueryString('giveId'))
    // 获取课程介绍
    let detailList = await AxiosUtil.get(`/api/group-course-buy/detailList/${packageId}`)
    let myGiveId
    if (!upstreamGiveId) {
      // 如果是自己领取 获取giveId（进入界面就发起请求，调用领取免费课）
      myGiveId = await AxiosUtil.get(`/api/gift/give/${packageId}`)
    } else {
      // 如果是下线领取
      try {
        await AxiosUtil.get(`/api/gift/giveReceive/${upstreamGiveId}`)
      } catch (e) {
        // 自己领取自己
        if (e === '10002') {
          myGiveId = upstreamGiveId
        }
      }
    }
    let courseInfo = await AxiosUtil.get(`/api/learning/courseDetail/${courseId}`)
    this.setState({
      courseId: courseId,
      packageId: packageId,
      upstreamGiveId: upstreamGiveId,
      detailList: detailList,
      myGiveId: myGiveId,
      courseInfo: courseInfo
    })
    // 调用分享函数
    let _this = this
    this.wxConfig.init().then(() => {
      _this.setShare()
    })
  }

  setShare () {
    let {myGiveId} = this.state
    let shareProp = {
      title: '领取我的免费课',
      desc: '点击领取我的免费课',
      link: `https://${ToolsUtil.isProd() ? 'wx' : 'rcwx.review'}.xiaozao.org/course/forFree`,
      imgUrl: 'https://wx.xiaozao.org/static/img/buygether/shareImg.png'
    }
    if (myGiveId) {
      shareProp.title = this.nickname + shareProp.title
      let addParam = `&giveId=${myGiveId}`
      shareProp.link += addParam
      this.littleShareUrl = addParam
      if (this.littleShareUrl && this.state.environment === 'little') {
        // 如果小程序。修改url设置分享
        window.history.replaceState(null, '', location.href + this.littleShareUrl)
      }
    }
    console.log(shareProp.link)
    this.wxConfig.setShareConfig(shareProp)
  }

  // 点击购买按钮后的回调触发
  getFreeCourse = async () => {
    let {myGiveId, packageId} = this.state
    if (!packageId) {
      Alert({
        content: 'no packageId'
      })
    }
    Alert({
      content: `${myGiveId} + ${packageId}`
    })
  }

  renderFooter () {
    let {buyed} = this.state.courseInfo
    if (buyed) {
      return (<Fixfooter>
        <div className='fix-foot'>
          <Link href={'/learn/course/info/?courseId=' + this.state.courseId}>
            <a style={{display: 'block'}}>
              去上课
            </a>
          </Link>
        </div>
        <style jsx>{`
       .fix-foot {
          margin: -16px;
          display: flex;
          font-size: 14px;
          color: white;
          height: 50px;
          line-height: 50px;
        }
        .fix-foot p{
          color: red;
          width: 100%;
        }
      `}</style>
      </Fixfooter>)
    } else {
      return (<Fixfooter>
        <div className='fix-foot' onClick={() => { this.getFreeCourse() }}>
          <p>去领取</p>
        </div>
        <style jsx>{`
       .fix-foot {
          margin: -16px;
          display: flex;
          font-size: 14px;
          color: white;
          height: 50px;
          line-height: 50px;
        }
        .fix-foot p{
          color: red;
          width: 100%;
        }
      `}</style>
      </Fixfooter>)
    }
  }

  renderTopImg () {
    return (
      <div>
        <img src={this.state.courseInfo.cover} />
        <style jsx>{`
          img {
            width: 100%;
            height: 150px;
          }
        `}</style>
      </div>
    )
  }

  render () {
    if (this.state.detailList) {
      if (this.state.detailList.length > 0) {
        return (
          <Layout>
            <div className='buy-card-page'>
              {this.renderTopImg()}
              <div className='card-div'>
                <h1 className='course-title'>{this.state.courseInfo.name}</h1>
                <CourseInfoNavBar detailList={this.state.detailList} />
              </div>
              {this.renderFooter()}
            </div>
            <MoreCourseIcon />
            <style jsx>{`
              .buy-card-page {
                padding-bottom: 60px;
                width: 100%;
                font-size: 0px;
                text-align: center;
                color: #2f3138;
                background-color: #f0f2f6;
              }
              .buy-card-page *{
                margin: 0px;
              }
              .course-title {
                padding: 10px 0 10px 0;
                font-size: 20px;
                text-align: left;
              }
              .buy-button {
                padding: 5px;
              }
              .card-div {
                padding: 0 15px;
                background-color: #F9F9F9;
                {/*border-bottom: 1px solid #e5e5e5;*/}
                {/*margin-bottom: -2px;*/}
              }
              .more-info {
                background-color: #f0f2f6;
              }
        `}</style>
            <style jsx global>{`
             .my-title-h1 {
                padding: 10px 0px;
                font-size: 16px;
                font-weight: normal;
                color: #2f3138;
                text-align: left;
              }
            `}</style>
          </Layout>
        )
      } else {
        return <div>没有信息</div>
      }
    } else {
      return <Layout><LoadingIcon /></Layout>
    }
  }
}
