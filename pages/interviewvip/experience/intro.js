import React from 'react'
import InterviewLayout from '../../../containers/interviewvip/layout'
import Button from '../../../xz-components/button'
import Card from '../../../xz-components/card'
import FixFooter from '../../../xz-components/fixfooter'

export default class extends React.Component {
  renderContent (topicKey) {
    return (
      <div>
        <p><strong>今日打卡内容</strong></p>
        <p>经过结构化分析的学习，你应该已经了解到怎么运用逻辑结构帮助我们着手分析一个或复杂、或空泛的案例。在此基础上，如果我们掌握一些常见的商业分析框架，让我们分析案例的效率大大提高。</p>
        <br />
        <p><strong>学习形式</strong></p>
        <ul style={{listStyle: 'none'}}>
          <li>1. 意义：通过案例实例说明商业分析框架的应用意义</li>
          <li>2. 方法论：讲述 3 个常见的商业分析框架</li>
          <li>3. 练习：England Bank 案例，6 道单项选择题，限时 10 分钟</li>
          <li>4. 延伸：推荐阅读材料和日常练习方法</li>
        </ul>
        <br />
        <p><strong>目标效果</strong></p>
        <p>理解常用的商业分析框架，结合结构化思维，并能在案例面试中运用</p>
      </div>
    )
  }

  renderAction () {
    return (
      <div className='action'>
        <a href='/interviewvip/introPage'>
          <Button style={{backgroundColor: 'rgb(255, 93, 93)'}}>优惠报名</Button>
        </a>
        <a href='/interviewvip/experience/task'>
          <Button>下一页</Button>
        </a>
        <style jsx>{`
          .action {
            display: flex;
            justify-content: space-between;
          }
          .action a {
            display: inline-block;
            width: 45%;
          }
        `}</style>
      </div>
    )
  }

  render () {
    return (
      <InterviewLayout>
        <div className='intro'>
          <div className='title'>群面说明</div>
          <div className='content'>
            <Card>{this.renderContent()}</Card>
          </div>
          <FixFooter>{this.renderAction()}</FixFooter>
        </div>
        <style jsx>{`
          .intro .title {
            font-weight: bold;
            text-align: center;
            margin-top: 2rem;
          }
          .intro .content {
            padding-bottom: 5rem;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
