import React from 'react'
import InterviewLayout from '../../containers/interviewvip/layout'
import ThemeConfig from '../../config/theme'
import Button from '../../components/button'
import Card from '../../components/card'
import FixFooter from '../../components/fixfooter'
import ToolsUtil from '../../util/tools'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topicKey: '',
      isRender: true
    }
  }

  componentDidMount = async () => {
    let topicKey = ToolsUtil.getQueryString('topicKey')
    this.setState({
      topicKey: topicKey,
      isRender: false
    })
  }

  render12 () {
    return (
      <div className='wrapper'>
        <div className='sub-title'>今日打卡内容</div>
        <div className='sub-content'>今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容</div>
        <div className='sub-title'>训练形式</div>
        <div className='sub-content'>今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容</div>
        <div className='sub-title'>学习目标</div>
        <div className='sub-content'>今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容今日打卡内容</div>
        <div className='sub-title'>今日打卡内容</div>
      </div>
    )
  }

  renderContent (topicKey) {
    return (
      <div className='detail'>
        {topicKey === '1-2' && this.render12()}
      </div>
    )
  }

  render () {
    const {topicKey, isRender} = this.state
    // 这里需要管理状态，如果做过，直接到解析页面
    let content = (
      <a href={`/interviewvip/task?topicKey=${topicKey}`}>
        <Button text='下一页' bg='#fdc23e' half />
      </a>
    )
    return (
      <InterviewLayout isRender={isRender}>
        <div className='intro'>
          <div className='header'><span>返回主页</span></div>
          <div className='title'>群面说明</div>
          <div className='content'>
            <Card content={this.renderContent(topicKey)} />
          </div>
          <FixFooter content={content} />
        </div>
        <style jsx>{`
          .header span {
            border: 1px solid ${ThemeConfig.color.blue};
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            color: ${ThemeConfig.color.blue};
          }
          .intro .title {
            font-weight: bold;
            text-align: center;
            margin-top: 2rem;
          }
          .intro .content {
            padding-bottom: 5rem;
          }
        `}</style>
        <style global jsx>{`
          .intro .content .detail .sub-title {
            font-weight: bold;
            margin-top: 1rem;
          } 
        `}</style>
      </InterviewLayout>
    )
  }
}
