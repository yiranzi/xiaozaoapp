import React from 'react'
import Layout from '/components/layout'
import Axios from '/util/axios'
import DateUtil from '/util/date'
import ToolsUtil from '/util/tools'
import {
  Panel,
  PanelHeader,
  PanelBody
} from 'react-weui'

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
        {type && this.courseRecommandName[type]}
      </PanelHeader>
      <PanelBody>
        {courseRecommend && courseRecommend.map((ele, index) => {
          return (this.renderLine(ele))
        })}
      </PanelBody>
    </Panel>)
  }

  renderLine (ele) {
    if (ele) {
      let {buyCount, courseId, title, start, cover} = ele
      return (<div className='course-view-line' onClick={() => { this.goRouter(`/learn/course/info?courseId=${courseId}`) }}>
        <div style={{flex: '1'}} className='course-img' >
          <img src={cover} />
        </div>
        <div style={{flex: '2'}} className='course-info' >
          <h2 className=''>{title}</h2>
          <p>介绍内容？</p>
          <div>
            <span>{buyCount}人已报名</span>
            <span>{DateUtil.format(new Date(start), 'yyyy-MM-dd')}开课</span>
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

  render () {
    return (
      <Layout>
        <div>
          {this.renderRecommand()}
        </div>
      </Layout>
    )
  }
}
