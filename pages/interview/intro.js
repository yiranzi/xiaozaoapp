import React from 'react'
import {Button} from 'react-weui'
import Card from '../../components/card'
import ToolsUtil from '../../util/tools'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'
import IntroContent from '../../containers/interview/introcontent'

const intro = IntroContent;

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      day: '',
      isRender: true
    }
  }

  componentDidMount () {
    this.setState({day: ToolsUtil.getQueryString('day')})
    this.setState({isRender: false})
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
    const {isRender, day} = this.state
    console.log(day);
    return (
      <InterviewLayout isRender={isRender} >
        <Back text='< 返回打卡主页' url='/interview/main' />
        <div className='intro-content'>
          <Card
            title='打卡说明'
            content={this.renderIntroContent()}
          />
          {day == 1 &&
            <a href='/interview/background1'><Button>开始打卡</Button></a>
          }
          {day == 6 &&
            <a href='/interview/background6'><Button>开始打卡</Button></a>
          }
          {(day != 1 && day != 6) &&
            <a href='/interview/task'><Button>开始打卡</Button></a>
          }
        </div>
      </InterviewLayout>
    )
  }
}
