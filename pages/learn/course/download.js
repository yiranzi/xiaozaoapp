import React from 'react'
import ToolsUtil from '../../../util/tools'
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
    this.setState({
      query: {courseId: courseId}})
  }
  render () {
    const {query} = this.state
    return (
      <Layout>
        资料下载页面
        <Footer type='source' courseId={query.courseId} />
      </Layout>
    )
  }
}
