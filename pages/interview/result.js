import React from 'react'
import {Button} from 'react-weui'
import Card from '../../components/card'
import Footer from '../../components/footer'
import Audio from '../../components/audio'
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

  componentDidMount = async () => {
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
      console.log(interviewResult)
      if (interviewResult) {
        const selected = eval(interviewResult.selected);
        this.setState({
          topicKey: topicKey,
          answerTime: interviewResult.answerTime,
          score: interviewResult.score,
          selectedCount: selected.length,
          isRender: false
        })
      }
    } catch (e) {
      console.log(e)
      console.log(2)
      this.setState({
        topicKey: topicKey,
        isRender: false,
        error: e
      })
    }

    if (topicKey == '1-2') {
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
    const {topicKey} = this.state
    if (topicKey) {
      let content = result[`day${topicKey}`]
      if (content) {
        let minute = parseInt(this.state.answerTime / 1000 / 60)
        minute = (minute == 0 ? 1 : minute)
        let second = this.state.answerTime / 1000 % 60
        if (topicKey === '1-1') {
          content[0] = content[0].replace('accuracyValue', this.state.score + '/' + this.state.selectedCount)
          content[0] = content[0].replace('speedValue', parseInt(686 / minute))
        } else if (topicKey === '1-2') {
          let prevMinute = parseInt(this.state.prevAnswerTime / 1000 / 60)
          prevMinute = (prevMinute == 0 ? 1 : prevMinute)
          const readNumUp = parseInt(944 / minute) - parseInt(686 / prevMinute)
          content[0] = content[0].replace('answerTime', minute + '分' + second + '秒')
          content[0] = content[0].replace('speedValue', parseInt(944 / minute))
          content[0] = content[0].replace('accuracyValue', this.state.score + '/' + this.state.selectedCount)
          content[0] = content[0].replace('readNumUp', (readNumUp < 0 ? 0 : readNumUp))
        }

        const text = content.map((item, index) => {
          return <div key={index} dangerouslySetInnerHTML={{__html: item}}/>
        })
        return <div>
          <img className='icon01' src='/static/img/interview/result-icon.png'/>
          {text}
          <style jsx>{`
          .icon01 {
            width: 80px;
            margin: 10px;
          }
        `}</style>
        </div>
      } else {
        return <div />
      }
    } else {
      return <div />
    }
  }

  renderResultMore () {
    const {topicKey} = this.state
    if (topicKey == '1-1' || topicKey == '5-1') {
      const day = (topicKey == '1-1' ? '1-2' : topicKey == '5-1' ? '5-2' : null)
      return <div>
        <br/>
        {(topicKey == '1-1') &&
        <div>
          <h4>群面时case阅读建议</h4>
          <br/>
          <Audio src=''/>
          <br/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(1).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(2).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(3).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(4).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(5).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(6).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(7).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(8).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(9).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(10).jpg'/>
          <img className='day1result' src='/static/img/interview/day1/day1_result%20(11).jpg'/>
        </div>
        }
        {(topicKey == '5-1') &&
        <div>
          <h4>群面时准备 presentation 的建议</h4>
          <br/>
          <Audio src=''/>
          <br/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(1).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(2).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(3).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(4).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(5).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(6).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(7).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(8).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(9).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(10).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(11).jpg'/>
          <img className='day1result' src='/static/img/interview/day5/day5_result%20(12).jpg'/>
        </div>
        }
        {(topicKey == '6') &&
        <div>
          <h4>群面时获取信息（听力）的建议</h4>
          <br/>
          <img className='day1result' src='/static/img/interview/day6/day6_result%20(1).jpg'/>
          <img className='day1result' src='/static/img/interview/day6/day6_result%20(2).jpg'/>
          <img className='day1result' src='/static/img/interview/day6/day6_result%20(3).jpg'/>
          <img className='day1result' src='/static/img/interview/day6/day6_result%20(4).jpg'/>
          <img className='day1result' src='/static/img/interview/day6/day6_result%20(5).jpg'/>
          <img className='day1result' src='/static/img/interview/day6/day6_result%20(6).jpg'/>
          <img className='day1result' src='/static/img/interview/day6/day6_result%20(7).jpg'/>
        </div>
        }
        <br/>
        <Footer><a href={'http://localhost:3000/interview/intro?day=' + day}><Button>再来一次</Button></a></Footer>
        <style jsx>{`
          .day1result {
            width: 100%;
          }
        `}</style>
      </div>
    } else if (topicKey == '1-2') {
      return <div>
        <h4>推荐阅读</h4>
        <p>小灶官网英语练练练</p>
        <Audio src=''/>
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
      </InterviewLayout>
    )
  }
}
