import React from 'react'
import Introduce from '/containers/study/introduce'
import Button from '/xz-components/button'
import Loading from '/xz-components/loadingicon'
import Layout from '/components/layout'
import ToolsUtil from '/util/tools'
import AxiosUtil from '/util/axios'

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
          {payStatus && <a href={`/learn/course/detail?courseId=${courseId}`}>
            <Button>进入课程</Button>
          </a>}
          <style jsx>{`
          .introduce {
            text-align: center;
          }
        `}</style>
        </div>
      </Layout>)
    } else {
      return (<Layout>
        <Loading />
      </Layout>)
    }
  }
}
