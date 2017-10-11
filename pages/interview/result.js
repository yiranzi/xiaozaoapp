import React from 'react'
import { Button } from 'react-weui'
import Card from '../../components/card'
import Footer from '../../components/footer'
import ToolsUtil from '../../util/tools'
import InterviewLayout from '../../containers/interview/layout'

const standard = [2, 3, 4, 6]

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      day: ''
    }
  }

  componentDidMount () {
    this.setState({day: ToolsUtil.getQueryString('day')})
  }

  renderContent () {
    return <div>asdfasdf</div>
  }

  render () {
    return (
      <InterviewLayout>
        <div className='interview-result'>
          <Card content={this.renderContent()} />
          <Footer><Button>开始打卡</Button></Footer>
        </div>
      </InterviewLayout>
    )
  }
}
