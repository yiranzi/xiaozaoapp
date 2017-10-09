import React from 'react'
import {Button} from 'react-weui'
import InterviewLayout from '../../containers/interview/layout'
import Back from '../../containers/interview/back'
import Card from '../../components/card'

export default class extends React.Component {
  render () {
    return (
      <InterviewLayout>
        <Back text='< 返回打卡主页' url='/interview/main'/>
        <div className='intro-content'>
          <Card
            title='打卡说明'
            content='内容'
          />
          <Button>开始打卡</Button>
        </div>
      </InterviewLayout>
    )
  }
}
