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
        workId: ''
      },
      search: ''
    }
  }

  componentDidMount () {
    let courseId = ToolsUtil.getQueryString('courseId')
    let workId = ToolsUtil.getQueryString('workId')
    this.setState({
      query: {
        courseId: courseId,
        workId: workId
      }
    })
  }

  render () {
    const {query} = this.state
    const {courseId, workId} = query
    return (
      <Layout>
        {courseId && workId && <Homework tabSelect={0} courseStatus={'doing'} courseId={parseInt(courseId)} workId={parseInt(workId)} />}
        <FixFooter style={{textAlign: 'center'}} onClick={() => { history.go(-1) }}>继续学习</FixFooter>
      </Layout>
    )
  }
}
