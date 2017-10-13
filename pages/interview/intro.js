import React from 'react'
import {Button} from 'react-weui'
import Card from '../../components/card'
import ToolsUtil from '../../util/tools'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'
import IntroContent from './introcontent'

const intro = IntroContent;

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

  renderIntroContent () {
    const {day} = this.state
    if (day) {
      const content = intro[`day${day}`]
      if (content) {
        return content.map((item, index) => {
          return <div key={index} dangerouslySetInnerHTML={{__html: item}} />
        })
      } else {
        return <div />
      }
    } else {
      return <div />
    }
  }

  render () {
    return (
      <InterviewLayout >
        <Back text='< 返回打卡主页' url='/interview/main' />
        <div className='intro-content'>
          <Card
            title='打卡说明'
            content={this.renderIntroContent()}
          />
          <a href='/interview/task'><Button>开始打卡</Button></a>
        </div>
      </InterviewLayout>
    )
  }
}
