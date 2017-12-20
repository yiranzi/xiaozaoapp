import React from 'react'
import Introduce from '/containers/learn/main/introduce'
import Loading from '/xz-components/loadingicon'
import Layout from '/components/layout'
import ToolsUtil from '/util/tools'
import AxiosUtil from '/util/axios'
import Router from 'next/router'
import Fixfooter from '/xz-components/fixfooter'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseId: undefined
    }
  }

  // 在第一次渲染结束的时候，判定是否拉取。
  componentDidMount = async () => {
    // 1 获取课程id
    let courseId = parseInt(ToolsUtil.getQueryString('courseId'))

    if (courseId) {
      let courseInfo = await AxiosUtil.get(`/api/learning/courseDetail/${courseId}`, true)
      this.setState({
        courseName: courseInfo.name,
        payStatus: courseInfo.buyed
      })
      this.setState({
        courseId: courseId
      })
    }
  }

  render () {
    let {courseName, payStatus, courseId} = this.state
    if (courseName) {
      return (<Layout>
        <div className='introduce'>
          <h1>{courseName}</h1>
          <Introduce courseId={this.state.courseId} />
          {payStatus && (
            <Fixfooter
              style={{textAlign: 'center'}}
              onClick={() => { Router.push(`/learn/course/info${location.search}`) }}
            >返回课程</Fixfooter>
          )}
        </div>
        <style jsx>{`
          .introduce {
            text-align: center;
            padding: 10px;
          }
          .introduce h1 {
            font-size: 20px;
          }
        `}</style>
      </Layout>)
    } else {
      return (<Layout>
        <Loading />
      </Layout>)
    }
  }
}
