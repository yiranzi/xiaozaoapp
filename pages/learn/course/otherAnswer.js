import React from 'react'
import Homework from '../../../containers/learn/main/homework/homework'
import ToolsUtil from '../../../util/tools'
import Layout from '../../../components/layout'
import FixFooter from '../../../xz-components/fixfooter'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: '',
        workId: '',
        type: ''
      },
      search: ''
    }
  }

  componentDidMount () {
    let courseId = ToolsUtil.getQueryString('courseId')
    let workId = ToolsUtil.getQueryString('workId')
    let type = ToolsUtil.getQueryString('type')
    this.setState({
      query: {
        courseId: courseId,
        workId: workId,
        type: type ? Number(type) : 0
      }
    })
  }

  render () {
    const {query} = this.state
    const {courseId, workId, type} = query
    return (
      <Layout>
        {courseId && workId && <Homework tabSelect={type} courseStatus={'doing'} courseId={parseInt(courseId)} workId={parseInt(workId)} />}
        <FixFooter style={{textAlign: 'center'}} onClick={() => { history.go(-1) }}>继续学习</FixFooter>
      </Layout>
    )
  }
}
