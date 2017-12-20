import React from 'react'
import Layout from '/components/layout'
import Axios from '/util/axios'
import DateUtil from '/util/date'
import ToolsUtil from '/util/tools'
import TitleWithIcon from '/xz-components/titleWithIcon'
import {
  Panel,
  PanelHeader,
  PanelBody
} from 'react-weui'
import Link from 'next/link'
export default class extends React.Component {
  courseRecommandName = {
    '1': '职业核心',
    '2': '个人能力',
    '3': '技能培养',
    '4': 'Buff之力'
  }

  constructor (props) {
    super(props)
    this.state = {
      myCourseList: undefined,
      courseRecommend: undefined
    }
    this.state = {
      courseRecommend: undefined,
      type: undefined
    }
  }

  componentDidMount = async () => {
    // 1 获取课程id
    let type = ToolsUtil.getQueryString('type')
    type = decodeURI(type)
    let courseRecommend = await Axios.get('/api/learning/courseRecommend')
    let courseRecommendList = []
    courseRecommend.forEach((ele, index) => {
      if (ele.type === type) {
        courseRecommendList.push(ele)
      }
    })
    this.setState({
      courseRecommend: courseRecommendList,
      type: type
    })
  }

  renderRecommand () {
    let {courseRecommend, type} = this.state
    return (<Panel>
      <PanelHeader>
        {type}
      </PanelHeader>
      <PanelBody>
        {courseRecommend && courseRecommend.map((ele, index) => {
          return (this.renderLine(ele))
        })}
      </PanelBody>
    </Panel>)
  }

  renderLine (ele, key) {
    if (ele) {
      let {buyCount, courseId, title, start, cover} = ele
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
                <h2 className=''>{title}</h2>
                <br />
                <div className='more-info'>
                  <span>{buyCount}人已报名</span>
                  <span>{DateUtil.format(new Date(start), 'yyyy-MM-dd')}开课</span>
                </div>
              </div>
            </div>
            <style jsx>{`
              .course-view-line {
                display: flex;
                background-color: white;
                margin: 10px auto;
                font-size: 14px;
                {/*height: 70px;*/}
              }
              .course-img {
                {/*height: 100%;*/}
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

  render () {
    let {courseRecommend, type} = this.state
    return (
      <Layout>
        <div className='my-course-list'>
          {type && <TitleWithIcon outStyle={{margin: '20px'}} title={type} imgUrl={'/static/img/icon/icon_3.jpeg'} />}
          {courseRecommend && courseRecommend.map((ele, index) => {
            return (this.renderLine(ele, index))
          })}
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
