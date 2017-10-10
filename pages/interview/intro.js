import React from 'react'
import {Button} from 'react-weui'
import Card from '../../components/card'
import ToolsUtil from '../../util/tools'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'

const intro = {
  'day1': [
    '打卡第一天'
  ],
  'day2': [
    '打卡第二天'
  ],
  'day3': [
    '打卡第三天'
  ],
  'day4': [
    '打卡第四天'
  ],
  'day5': [
    '打卡第五天'
  ],
  'day6': [
    '打卡第六天'
  ]
}

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
          return <p key={index}>{item}</p>
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
          <Button>开始打卡</Button>
        </div>
      </InterviewLayout>
    )
  }
}
