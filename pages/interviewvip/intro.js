import React from 'react'
import InterviewLayout from '../../containers/interviewvip/layout'
import ThemeConfig from '../../config/theme'
import Button from '../../xz-components/button'
import Card from '../../xz-components/card'
import FixFooter from '../../xz-components/fixfooter'
import ToolsUtil from '../../util/tools'
import Back from '../../xz-components/back'
import IntroContent from '../../containers/interviewvip/introcontent'

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

  renderContent (topicKey) {
    let key = 'topic' + topicKey
    let intro = IntroContent[key]
    return (
      <div
        className='detail'
        dangerouslySetInnerHTML={{__html: intro}}
      />
    )
  }

  render () {
    const {topicKey, isRender} = this.state
    // 这里需要管理状态，如果做过，直接到解析页面
    let content = (
      <a href={`/interviewvip/task?topicKey=${topicKey}`}>
        <Button style={{bakckgroundColor: '#fdc23e'}}>下一页</Button>
      </a>
    )
    return (
      <InterviewLayout isRender={isRender}>
        <div className='intro'>
          <div className='header'>
            <a href='/interviewvip/list'>
              <Back direct='left' text='返回主页' />
            </a>
          </div>
          <div className='title'>群面说明</div>
          <div className='content'>
            <Card>{this.renderContent(topicKey)}</Card>
          </div>
          <FixFooter>{content}</FixFooter>
        </div>
        <style jsx>{`
          .header a {
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
          .interviewvip {
            padding-top: 2rem !important;
          }
          .intro .content .detail .sub-title {
            font-weight: bold;
            margin-top: 1rem;
          }
          .intro .content .detail img {
            width: 100%;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
