import React from 'react'
import {Button} from 'react-weui'
import Card from '../../components/card'
import Footer from '../../components/footer'
import ToolsUtil from '../../util/tools'
import AxiosUtil from '../../util/axios'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'
import ResultContent from '../../containers/interview/resultcontent'

const result = ResultContent

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topicKey: null,
      answerTime: '',
      score: 0,
      selectedCount: 0,
      prevAnswerTime: 0,
      isRender: true,
      error: ''
    }
  }

  componentDidMount () {
    const topicKey = ToolsUtil.getQueryString('topicKey')
    this.setState({day: topicKey})
    this.queryResultData(topicKey)
  }

  queryResultData = async (topicKey) => {
    try {
      let interviewResult = await AxiosUtil({
        method: 'get',
        url: '/api/interview/getCompleteByTopicKey/' + topicKey
      })
      const selected = eval(interviewResult.selected);
      this.setState({
        topicKey: topicKey,
        answerTime: interviewResult.answerTime,
        score: interviewResult.score,
        selectedCount: selected.length,
        isRender: false
      })
    } catch (e) {
      this.setState({
        topicKey: topicKey,
        isRender: false,
        error: e
      })
    }

    if (topicKey === '1-2') {
      const prevAnswerTime = this.queryPrevAnswerTime('1-1')
      this.setState({
        prevAnswerTime: prevAnswerTime
      })
    }
  }

  /*
  * 查询上一次答题用时
  * */
  queryPrevAnswerTime = async (topicKey) => {
    try {
      let interviewResult = await AxiosUtil({
        method: 'get',
        url: '/api/interview/getCompleteByTopicKey/' + topicKey
      })
      return interviewResult.answerTime
    } catch (e) {
      console.log('err')
      return 0
    }
  }

  renderContent () {
    const {topicKey, answerTime} = this.state
    let answerTimeSecond = parseInt(answerTime / 1000)
    if (topicKey) {
      let content = result[`day${topicKey}`]
      if (content) {
        let minute = parseInt(answerTimeSecond / 60)
        minute = (minute == 0 ? 1 : minute)
        let second = Math.floor(answerTimeSecond / 60 % 1 * 100) / 100
        if (topicKey === '1-1') {
          content[0] = content[0].replace('accuracyValue', this.state.score + '/' + this.state.selectedCount)
          content[0] = content[0].replace('speedValue', parseInt(686 / minute))
        } else if (topicKey === '1-2') {
          let prevMinute = parseInt(this.state.prevAnswerTime / 60)
          prevMinute = (prevMinute == 0 ? 1 : prevMinute)
          const readNumUp = parseInt(944 / minute) - parseInt(686 / prevMinute)
          content[0] = content[0].replace('answerTime', minute + '分' + second + '秒')
          content[0] = content[0].replace('speedValue', parseInt(944 / minute))
          content[0] = content[0].replace('accuracyValue', this.state.score + '/' + this.state.selectedCount)
          content[0] = content[0].replace('readNumUp', readNumUp)
        }

        const text = content.map((item, index) => {
          return <div key={index} dangerouslySetInnerHTML={{__html: item}}/>
        })
        return <div>
          <img src='/static/img/interview/result-icon.png'/>
          {text}
          <style jsx>{`
            img {
              width: 30%;
            }
          `}</style>
        </div>
      } else {
        return <div/>
      }
    } else {
      return <div/>
    }
  }

  renderResultMore () {
    const {topicKey} = this.state
    if (topicKey == '1-1' || topicKey == '5-1') {
      const day = (topicKey == '1-1' ? '1-2' : topicKey == '5-1' ? '5-2' : null)
      return <div>
        <div className='content'>
          alwkefjlkwejflwke
        </div>
        <div className='more'>
          <a href={`/interview/task?topicKey=${day}`}><Button>再来一次</Button></a>
        </div>
        <style jsx>{`
          .content {
            margin-bottom: 5rem;
          }
          .more {
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            background-color: #F9F9F9;
            padding: 1rem;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    } else if (topicKey == '1-2') {
      return <div>
        <h4>推荐阅读</h4>
        <p>小灶官网英语练练练</p>
        <img src='/static/img/interview/result-icon.png'/>
      </div>
    } else {
      return <div/>
    }
  }

  renderAnalysis () {
    const {topicKey} = this.state
    return (
      <a href={`/interview/review?topicKey=${topicKey}&today=today`}>
        <Button>点击查看解析</Button>
      </a>
    )
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <Back text='< 返回' url='/interview/main'/>
        <div className='interview-result'>
          <Card content={this.renderContent()}/>
          <Footer>{this.renderAnalysis()}</Footer>
        </div>
        <div className='interview-result-more'>
          {this.renderResultMore()}
        </div>
        <style jsx>{`
          .interview-result {
            text-align: center;
          }
        `}</style>
        <style global jsx>{`
          .interview-result .card {
            background: #fff;
          }
          .interview-result button.weui-btn,
          .more button.weui-btn {
            width: 50%;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
