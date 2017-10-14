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
        } else if (topicKey == '2' || topicKey == '3') {
          content[0] = content[0].replace('answerTime', minute + '分' + second + '秒')
          content[0] = content[0].replace('selectedCount', this.state.selectedCount)
          content[0] = content[0].replace('scoreValue', this.state.score)
          content[0] = content[0].replace('accuracyValue', this.state.score + '/' + this.state.selectedCount)
        } else if (topicKey === '6-1' || topicKey === '6-2') {
          content[0] = content[0].replace('accuracyValue', this.state.score + '/' + this.state.selectedCount)
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
    const day = (topicKey == '1-1' ? '1-2' : topicKey == '5-1' ? '5-2' : null)
    return <div>
      <br/>
      {(topicKey == '1-1') &&
      <div className='pratice'>
        <h4>群面时case阅读建议</h4>
        <br/>
        <Audio src='http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/interview/mp3/S1-1-1-fangfa.mp3'/>
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
      {(topicKey == '1-2') &&
      <div className='pratice'>
        <h4>群面时case阅读建议</h4>
        <br/>
        <img className='day1result' src='/static/img/interview/day1/day1_2_result%20(1).jpg'/>
        <img className='day1result' src='/static/img/interview/day1/day1_2_result%20(2).jpg'/>
        <br/>
        <h4>推荐阅读</h4>
        <img className='day1result' src='/static/img/interview/day1/day1_2_result%20(3).jpg'/>
      </div>
      }
      {(topicKey == '2') &&
      <div className='pratice'>
        <h4>提升自己的结构化思维，我们有以下的建议：</h4>
        <h4>推荐课程</h4>
        <p>三三原则</p>
        <br/>
        <h4>阅读推荐</h4>
        <p>老聃的金字塔原理：<a href='http://www.fengtang.com/blog/?p=113' target='_blank'>http://www.fengtang.com/blog/?p=113</a></p>
        <p>《金字塔原理》电子书下载</p>
        <br/>
        <h4>日常练习</h4>
        <p>1. 累积别人的结构框架：无论是影视、书籍、文章，看到别人用的结构，记录下来，成为自己的素材。比如麦肯锡的 2016 China Consumer Report 中，你会发现麦肯锡就是按照“购买意愿、购买地点、购买方式，以及购买分配”对消费者进行分析的。</p>
        <p>下载阅读材料（超链接：<a href='http://pan.baidu.com/s/1qYzBB8w' target='_blank'>http://pan.baidu.com/s/1qYzBB8w</a>）</p>
        <br/>
        <p>2. 主动思考：每天给出一个小题目，花 10 分钟时间，建立结构，尽量符合我们提到的 MECE 原则、八二原则、神奇数字“3”来进行分析。你可以把结构写下来，也可以说给同伴听，让 ta 进行评价。比如今天你可以问自己：摩拜单车如何削减成本？你可以尝试列出这样的框架：</p>
        <ul className='list'>
          <li>生产成本</li>
          <li>运营调度成本</li>
          <li>市场推广成本</li>
        </ul>
      </div>
      }
      {(topicKey == '3') &&
      <div className='pratice'>
        <h4>提升自己的对商业分析框架的运用，我们有以下的建议：</h4>
        <br/>
        <h4>阅读推荐</h4>
        <p>学了很多框架，却还是不会分析 <a href='http://mp.weixin.qq.com/s/CJjKG6FjUlNGTzVJWDkZ-w' target='_blank'>http://mp.weixin.qq.com/s/CJjKG6FjUlNGTzVJWDkZ-w</a></p>
        <br/>
        <h4>练习</h4>
        <p>真正深入理解一个商业分析框架，需要阅读相应的著作，可以试着从 3C 模型和五力模型作为例子开始：</p>
        <p>阅读材料1（超链接：<a href='http://pan.baidu.com/s/1o85LqX0'>http://pan.baidu.com/s/1o85LqX0</a>）</p>
        <p>阅读材料2（超链接：<a href='http://pan.baidu.com/s/1cCVu9K'>http://pan.baidu.com/s/1cCVu9K</a>）</p>
      </div>
      }
      {(topicKey == '4') &&
      <div className='pratice'>
        <h4>阅读推荐：</h4>
        <br/>
        <img className='day1result' src='/static/img/interview/day4/day4_result%20(1).jpg'/>
        <img className='day1result' src='/static/img/interview/day4/day4_result%20(2).jpg'/>
        <img className='day1result' src='/static/img/interview/day4/day4_result%20(3).jpg'/>
        <img className='day1result' src='/static/img/interview/day4/day4_result%20(4).jpg'/>
        <img className='day1result' src='/static/img/interview/day4/day4_result%20(5).jpg'/>
        <img className='day1result' src='/static/img/interview/day4/day4_result%20(6).jpg'/>
      </div>
      }
      {(topicKey == '5-1') &&
      <div className='pratice'>
        <h4>群面时准备 presentation 的建议：</h4>
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
      {(topicKey == '5-2') &&
      <div className='pratice'>
        <h4>更多练习材料：</h4>
        <br/>
        <h4>推荐阅读</h4>
        <p><a href='http://mp.weixin.qq.com/s/6_FVLCicKjS0Y8_goXH07A' target='_blank'>http://mp.weixin.qq.com/s/6_FVLCicKjS0Y8_goXH07A</a></p>
        <br/>
        <h4>更多练习</h4>
        <p>链接: <a href='https://pan.baidu.com/s/1nvigGJJ'>https://pan.baidu.com/s/1nvigGJJ</a> 密码: mnwy</p>
      </div>
      }
      {(topicKey == '6-1') &&
      <div className='pratice'>
        <h4>群面时获取信息（听力）的建议：</h4>
        <br/>
        <img className='day1result' src='/static/img/interview/day6/day6_result%20(1).jpg'/>
        <img className='day1result' src='/static/img/interview/day6/day6_result%20(2).jpg'/>
        <img className='day1result' src='/static/img/interview/day6/day6_result%20(3).jpg'/>
        <img className='day1result' src='/static/img/interview/day6/day6_result%20(4).jpg'/>
        <img className='day1result' src='/static/img/interview/day6/day6_result%20(5).jpg'/>
        <img className='day1result' src='/static/img/interview/day6/day6_result%20(6).jpg'/>
        <img className='day1result' src='/static/img/interview/day6/day6_result%20(7).jpg'/>
        <br/>
        <h4>推荐练习</h4>
        <p>需要练习英文听力的同学，可以点击下载听力练习题。</p>
        <p><a href='https://pan.baidu.com/s/1hr4vtXU'>https://pan.baidu.com/s/1hr4vtXU</a></p>
      </div>
      }
      {(topicKey == '1-1' || topicKey == '5-1') &&
        <div className='action'><a href={'/interview/intro?day=' + day}><Button>再来一次</Button></a></div>
      }
      <style jsx>{`
        .day1result {
          width: 100%;
        }
        .list {
          margin-left: 20px;
        }
        .pratice {
          margin-bottom: 5rem;
        }
        .action {
          display: flex;
          justify-content: center;
          position: fixed;
          width: 100%;
          left: 0;
          bottom: 0;
          padding: 1rem 2rem;
          box-sizing: border-box;
          background: #F9F9F9;
        }
      `}</style>
    </div>
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
