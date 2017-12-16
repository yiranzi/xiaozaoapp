import React from 'react'
import Link from 'next/link'
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
      },
      search: location.search
    })
  }

  render () {
    const {query, search} = this.state
    const {courseId, workId} = query
    return (
      <Layout>
        {courseId && workId && <Homework courseStatus={'doing'} courseId={parseInt(courseId)} workId={parseInt(workId)} />}
        <FixFooter style={{textAlign: 'center'}}><Link href={`/learn/course/detail${search}`}><a>继续学习</a></Link></FixFooter>
      </Layout>
    )
  }
}
