import React from 'react'
import Theme from '../../config/theme'
import ToolsUtil from '../../util/tools'
import { Toptips } from 'react-weui'
import Action from '../../action/writtentestclocksecond'
import WrittenTestClock from '../../containers/writtentestclocksecond/layout'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showPage: false,
      tipMsg: '',
      clockInCompleted: false
    }
  }

  componentDidMount = async () => {
    try {
      const test = await Action.getTest()
      const info = await Action.getInfo()
      const totalDays = info.completeDay.length + 1
      let clockInCompleted = true
      let checkDays = 1
      info.completeDay.forEach((item, index) => {
        if (item) {
          checkDays++
        } else {
          clockInCompleted = false
        }
      })

      this.setState({
        showPage: true,
        clockInCompleted,
        checkDays,
        totalDays,
        test
      })
    } catch (err) {
      this.setState({
        showPage: true,
        tipMsg: err.message
      })
    }
  }


  renderGlobalCss () {
    return (
      <style jsx global>{`
        .written-test-clock {
          padding: 0!important;
        }
      `}</style>
    )
  }

  renderBottomContent() {
    const { clockInCompleted, checkDays, totalDays } = this.state
    const uncheckedDays = totalDays - checkDays
    if(clockInCompleted) {
      return (
        <div className='bottom-form-content'>
          <div>选择坚持总能看到进步！</div>
          <div className='weight'>你总共坚持打卡{checkDays}天！恭喜您！</div>
          <div>成功完成本期笔试打卡任务！</div>
          <div>点击我的奖品马上领取属于自己的奖励吧！</div>
          <img src='/static/writtentestclocksecond/exam-qr-code.png' />
          <style jsx>{`
            .weight {
              font-weight: bold;
            }
            img {
              width: 7rem;
              margin-top: 1rem;
            }
          `}</style>
        </div>
      )
    } else {
      return (
        <div className='bottom-form-content'>
          <div className='weight'>您总共坚持打卡{checkDays}天，缺席打卡{uncheckedDays}天</div>
          <div>很遗憾</div>
          <div>未能完成本期笔试打卡任务</div>
          <div>马上领取属于自己的奖励吧！</div>
          <img src='/static/writtentestclocksecond/exam-qr-code.png' />
          <style jsx>{`
            .weight {
              font-weight: bold;
            }
            img {
              width: 7rem;
              margin-top: 1rem;
            }
          `}</style>
        </div>
      )
    }
  }

  render () {
    const { showPage, test, tipMsg, checkDays } = this.state
    if(!showPage) return <div></div>
    if (tipMsg) {
      return (
        <WrittenTestClock>
          <Toptips type='warn' show> {tipMsg} </Toptips>
        </WrittenTestClock>
      )
    }

    const accuracy = Math.round(test.totalScore / test.writtenTestTopicDTOList.length  * 100)
    return (
      <WrittenTestClock>
        <div className='exam-result-layout'>
          <div className='square'>
            <div className='inner-square'>
              <div className='score'>小伙伴</div>
              <div className='score'>你成功坚持笔试修炼第{checkDays}天，打卡成功</div>
            </div>
          </div>
          <div className='correct-rate'>
            <div className='rate-content title'>今日笔试打卡成绩</div>
            <div className='rate-content'><span className='persent'>{accuracy}％</span>正确率</div>
            <div className='rate-content'>击败了超过{ToolsUtil.exceeds[accuracy]}%的参与者</div>
          </div>
          <div className='bottom-form'>
            {this.renderBottomContent()}
          </div>
          <style jsx>{`
          .exam-result-layout {
            text-align: center;
            height: 100vh;
            font-size: 14px;
            overflow-x: hidden;
          }
          .square {
            width: 100%;
            text-align: center;
          }
          .inner-square {
            padding: 5vw 0 2vw;
            font-size: 1.2rem;
            font-weight: bold;
          }
          .correct-rate {
            margin-top: 30px;
            position: relative;
            text-align: center;
            background: url(/static/writtentestclocksecond/exam-result-form.png) center center;
            background-size: 100%;
            background-repeat: no-repeat;
            height: 43vw;
            width: 80vw;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: ${Theme.color.writtentestclocksecondfont}
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
          .rate-content.title,
          .persent {
            font-size: 1.2rem;
          }
          .rate-content {
            font-size: 0.8rem;
          }
          .bottom-form {
            width: 70vw;
            background: #fff;
            margin: 0 auto;
            margin-top: -2vw;
            z-index: 1;
            position: absolute;
            margin-left: 50%;
            transform: translate(-50%);
            box-sizing: border-box;
            padding: 20px 10px;
            box-shadow: 2px 3px 10px #ccc;
          }
          .bottom-form:after{
            content: '扫描二维码立即查看最新四大低价课程';
            position: absolute;
            transform: translate(-50%);
            width: 100%;
            bottom: -8vw;
            font-size: 14px;
            font-weight: bold;
          }
        `}</style>
        </div>
      </WrittenTestClock>
    )
  }
}
