import React from 'react'
import Theme from '../../config/theme'
import Action from '../../action/writtentestclocksecond'
import WrittenTestClock from '../../containers/writtentestclocksecond/layout'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      showPage: false,
      clockInCompleted: false,
      checkDays: 0,
      testResult: 0,
      totalDay: 0,
      totalScore: 0,
      currPersent: 0,
      exceeds: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 42, 44, 46, 48, 51, 54, 57, 60, 63, 65, 67, 69, 72, 75, 77, 80, 82, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 100]

    }
  }

  componentDidMount = async () => {
    try {
      const info = await Action.getInfo()
      const result = await Action.getTest()
      const { testResult, startDay, endDay } = info
      const { totalScore, writtenTestTopicDTOList } = result
      const totalDay = endDay - startDay + 1
      const currPersent = Math.round(totalScore / writtenTestTopicDTOList.length * 100)

      let clockInCompleted = true
      let checkDays = 0
      info.completeDay.forEach((item, index) => {
        if (item) {
          checkDays++
        } else {
          clockInCompleted = false
        }
      })

      this.setState({
        currPersent,
        totalScore,
        checkDays,
        testResult,
        clockInCompleted,
        totalDay,
        showPage: true
      })
    } catch (error) {
      this.setState({
        tipsMsg: error.message,
        showPage: true
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

  renderTop = () => {
    const { clockInCompleted, checkDays, totalScore, currPersent, exceeds } = this.state
    if (clockInCompleted) {
      return (
        <div>
          <div>小伙伴</div>
          <div>本次笔试测试你答对{totalScore}道题，总正确率{currPersent}％</div>
          <div>笔试答题战斗力超过了{exceeds[currPersent]}％的笔试打卡学习者！</div>
        </div>
      )
    } else {
      return (
        <div>
          <div>本次笔测试，你答对了{totalScore}道题，总正确率{currPersent}%！</div>
          <div>你总共坚持打卡{checkDays}天，未完成本期打卡任务</div>
        </div>
      )
    }
  }

  renderMiddle = () => {
    const { clockInCompleted, checkDays } = this.state
    if (clockInCompleted) {
      return (
        <div>
          <div>您总共开始打卡<span className='check-day'>{checkDays}</span>天</div>
          <div>恭喜您！</div>
          <div>顺利完成本期笔试打卡任务！</div>
          <div>已成功解锁第二期笔试打卡参与权限！</div>
          <style jsx>{`
                .check-day {
                  background-color: ${Theme.color.writtentestclockmain};
                  border-radius: 50%;
                  margin: 0 6px;
                  color: #fff;
                  padding: 2px 6px;
                }
              `}</style>
        </div>
      )
    } else {
      return (
        <div>
          <div>扫描下方二维码</div>
          <div>分享报名卡解锁第二期笔试打卡权限吧！</div>
          <div>从这一刻开始改变！</div>
        </div>
      )
    }
  }
  render () {
    const { showPage } = this.state

    if (!showPage) return <div />
    return (
      <WrittenTestClock>
        <div className='exam-result-layout'>
          <div className='top-form'>
            {this.renderTop()}
          </div>
          <div className='middle-form'>
            {this.renderMiddle()}
          </div>
          <div className='bottom-form'>
            <img className='bottom-form-bg' src='/static/writtentestclock/exam-result-bottom.png' />
            <div className='bottom-form-content'>
              <img className='qr-code' src='/static/writtentestclock/season2-qr-code.png' />
              <div>马上扫描，分享报名</div>
              <img className='season-2' src='/static/writtentestclock/season2-banner.png' />
              <div>小灶四大笔试打卡计划吧</div>
            </div>
          </div>
          {this.renderGlobalCss()}
          <style jsx>{`
          .exam-result-layout {
            text-align: center;
            height: 100vh;
          }
          .top-form {
            padding: 30px 0;
          }
          .top-form div {
            margin-top: 5px;
          }
          .middle-form {
            border: 1px solid ${Theme.color.writtentestclockmain};
            width: 80vw;
            border-radius: 5px;
            margin: 0 auto;
            font-size: 14px;
            font-weight: 200;
            background: #2b2b2b;
            padding-top: 20px;
            height: 65vh;
            display: flex;
            flex-direction: column;
            position: fixed;
            bottom: 0;
            margin-left: 10vw;
          }
          .middle-form div {
            margin-bottom: 5px;
          }
          .bottom-form {
            position: fixed;
            bottom: 0;
          }
          .bottom-form-bg {
            width: 100%;
            margin-bottom: -7px;
          }
          .bottom-form-content {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: 0;
            width: 100vw;
            color: #fff;
            font-size: 14px;
          }
          .bottom-form-content div {
            margin: 10px 0;
          }
          .qr-code {
            width: 120px;
            margin-top: -1rem;
            margin-bottom: 20px;
          }
          .season-2 {
            width: 100px;
          }
        `}</style>
        </div>
      </WrittenTestClock>
    )
  }
}
