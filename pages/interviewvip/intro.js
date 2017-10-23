import React from 'react'
import {Button} from 'react-weui'
import Card from '../../components/card'
import ToolsUtil from '../../util/tools'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'
import IntroContent from '../../containers/interview/introcontent'

const intro = IntroContent

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topicKey: '',
      isRender: true
    }
  }

  componentDidMount () {
    this.setState({topicKey: ToolsUtil.getQueryString('topicKey')})
    this.setState({isRender: false})
  }

  renderIntroContent () {
    const {topicKey} = this.state
    const content = intro[`topicKey${topicKey}`]
    if (content) {
      return content.map((item, index) => {
        return <div key={index} dangerouslySetInnerHTML={{__html: item}} />
      })
    } else {
      return <div />
    }
  }

  render () {
    const {isRender, topicKey} = this.state
    console.log(isRender)
    return (
      <InterviewLayout isRender={isRender}>
        {isRender && <div>
          <Back text='< 返回打卡主页' url='/interviewvip/list' />
          <div className='intro-content'>
            <Card
              title='打卡说明'
              content={this.renderIntroContent()}
            />
            <a href={`/interviewvip/intro?topicKey=${topicKey}`}><Button>开始打卡</Button></a>
          </div>
        </div>}
      </InterviewLayout>
    )
  }
}