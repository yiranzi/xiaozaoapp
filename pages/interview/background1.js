import React from 'react'
import {Button} from 'react-weui'
import Card from '../../components/card'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'

export default class extends React.Component {
  renderContent () {
    return (
      <div>
        <div className='title'>故事背景</div>
        <div className='content'>
          <p>England Bank (简称为 EB) 是一家总部坐落在英格兰东北部的商业银行。 EB 目前的营销策略和独特的
            卖点是专门针对该地区的客户，巩固其在该地区传统“本地银行”的地位。</p>
          <p>最近，你被 EB 聘用为顾问，帮助他们解决当前战略问题与管理问题。为了准备这次会议，你和一些同事正
            在出席委员会会议，讨论未来战略方向，提出切实可行的建议。</p>
        </div>
        <style jsx>{`
          .title {
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }
  render () {
    return (
      <InterviewLayout >
        <Back text='< 返回打卡主页' url='/interview/main' />
        <div>
          <Card content={this.renderContent()} />
          <a href='/interview/task'><Button>下一页</Button></a>
        </div>
      </InterviewLayout>
    )
  }
}
