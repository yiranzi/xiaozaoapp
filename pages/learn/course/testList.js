import React from 'react'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import Layout from '../../../components/layout'
import Footer from '../../../containers/learn/footer'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: ''
      }
    }
  }

  componentDidMount = async () => {
    let courseId = ToolsUtil.getQueryString('courseId')
    let testList = AxiosUtil.get(`/api/learning-test/getByCourseId/${courseId}`)

    this.setState({
      query: {
        courseId: courseId
      },
      testList: testList
    })
  }
  render () {
    const {query, testList} = this.state
    return (
      <Layout>
        {DataUtil.isEmpty(testList) && <div>没有测试</div>}
        <Footer type='test' courseId={query.courseId} />
      </Layout>
    )
  }
}
