
import WrittenTestClock from '../../containers/writtentestclocksecond/layout'
import Footer from '../../containers/writtentestclocksecond/footer'
import ShareWx from '../../containers/writtentestclocksecond/sharewx'
import Action from '../../action/writtentestclocksecond'
import React from 'react'
import Theme from '../../config/theme'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      todayInfo: null,
      clockInCount: 1,
      shareIsShow: false,
      showPage: false,
      exceeds: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 42, 44, 46, 48, 51, 54, 57, 60, 63, 65, 67, 69, 72, 75, 77, 80, 82, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 100]
    }
  }

  componentDidMount = async () => {
    try {
      const todayInfo = await Action.getToday()
      const res = await Action.getHistory()
      const clockInCount = res.completeDay.filter(item => item.completed).length
      this.setState({
        todayInfo,
        clockInCount,
        showPage: true
      })
    } catch (err) {
      this.setState({
        showPage: true
      })
    }
  }

  shareWx = () => {
    this.setState({
      shareIsShow: true
    })
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
        .written-test-clock {
          padding: 0!important;
        }
      `}</style>
    )
  }
  render () {
    const { todayInfo, showPage } = this.state
    if (!showPage) return <Footer />
    const accuracy = !todayInfo ? 0 : todayInfo.writtenTestTopicDTOList.length === 0 ? 0 : Math.round(todayInfo.totalScore / todayInfo.writtenTestTopicDTOList.length * 100)

    return (
      <WrittenTestClock>
        <div className='square-form'>
          <ShareWx isShow={this.state.shareIsShow} />
          <div className='square'>
            <div className='inner-square'>
              <div className='score'>打卡成功！你累计坚持笔试打卡<span className='day'>{this.state.clockInCount}</span>天</div>
              <div className='score'>今日笔试打卡成绩</div>
            </div>
          </div>
          <div className='correct-rate'>
            <div className='data1'><span>{accuracy}%</span>正确率</div>
          </div>
          <div className='bottom-form'>
            <div>击败了超过{this.state.exceeds[accuracy]}%的参与者，继续努力吧！</div>
            <div>分享成就卡</div>
            <div>每一份坚持</div>
            <div>都是在实现自己平凡生活里的英雄梦</div>
          </div>
          <div className='bottom-back'>返回点击Day，即可查看当日笔试任务答案解析</div>
          <a className='go-clock-in' href='/writtentestclocksecond/index-clock-in' />
          <Footer />
          {this.renderGlobalCss()}
          <style jsx>{`
            .written-test-clock {
              padding: 0!important;
            }
            .square-form {
              padding-bottom: 40px;
            }
            .flex-item {
              flex: 1;
              margin-top: 12rem;
            }
            .square {
              width: 100%;
              text-align: center;
            }
            .inner-square {
              padding: 12vw 0 2vw;
              font-size: 20px;
              font-weight: bold;
            }
            .inner-square .score {
              margin-bottom: 10px;
            }
            .btn-form {
              margin: 30px 0;
            }
            .correct-rate {
              margin-top: 30px;
              position: relative;
              text-align: center;
              background: url(/static/writtentestclocksecond/result-form.png) center center;
              background-size: 100%;
              background-repeat: no-repeat;
              height: 43vw;
              width: 80vw;
              margin: 0 auto;
            }
            .correct-rate:before {
              content: ' ';
              position: absolute;
              background: url(/static/writtentestclocksecond/entry-form-left.png);
              left: -34px;
              width: 100px;
              top: 9%;
              height: 111px;
              background-size: 35%;
              background-repeat: no-repeat;
              
            }
            .correct-rate:after {
              content: ' ';
              position: absolute;
              background: url(/static/writtentestclocksecond/choose-class-form-right.png);
              right: -99px;
              width: 100px;
              top: 47%;
              height: 75px;
              background-size: 45%;
              background-repeat: no-repeat;
            }
            .correct-bg {
              width: 85%;
              height: auto;
            }
            .correct-rate .data1 {
              position: absolute;
              top: 19vw;
              text-align: center;
              width: 100%;
              color: ${Theme.color.writtentestclocksecondfont};
            }
            .correct-rate .data1 span {
              font-size: 30px;
            }
            .bottom-form {
              text-align: center;
              padding-top: 20px;
            }
            .bottom-form div {
              margin-bottom: 3px;
            }
            .bottom-back {
              padding-top: 20px;
              text-align: center;
            }
            .go-clock-in {
              width: 150px;
              height: 65px;
              display: block;
              text-align: center;
              color: #fff;
              background-image: url(/static/writtentestclocksecond/choose-class-btn.png);
              background-repeat: no-repeat;
              background-size: 100%;
              margin: 0 auto;
              margin-top: 20px;
            }
        `}</style>
        </div>
      </WrittenTestClock>
    )
  }
}
