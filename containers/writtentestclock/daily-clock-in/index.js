import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:containers/writtentestclock/daily-clock-in/index.js
import Theme from '../../../config/theme'
import Footer from '../components/footer'
import UserAction from '../../../action/writtentestclock/user'
import AnswerAction from '../../../action/writtentestclock/answer'
=======
import Theme from '../../../../config/theme'
import Footer from '../components/footer'
import UserAction from '../../../../src/action/writtentestclock/user'
import AnswerAction from '../../../../src/action/writtentestclock/answer'
>>>>>>> update: eslinit code style:src/page/writtentestclock/daily-clock-in/index.js
import { Toptips } from 'react-weui'
export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: [],
      showTips: false,
      tipsMsg: '',
      showPage: false,
      testInfo: null,
      exceeds: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 42, 44, 46, 48, 51, 54, 57, 60, 63, 65, 67, 69, 72, 75, 77, 80, 82, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 100]
    }
  }

  componentDidMount = async () => {
    try {
      const info = await UserAction.getInfo()
      const res = await AnswerAction.getEvaluation()

      const { completeDay, startDay, endDay } = info
      const duringDay = endDay - startDay
      for (let i = completeDay.length; i <= duringDay; i++) {
        completeDay.push(0)
      }
      this.setState({
        ...info,
        dates: completeDay,
        showPage: true,
        testInfo: res
      })
    } catch (error) {
      this.setState({
        error: true,
        showPage: true,
        tipsMsg: error.message,
        showTips: true
      })
    }
  }

  renderDate = () => {
    return this.state.dates.map((item, index) => {
      const classname = 'date-item ' + (item && 'checked')
      return (
        <div key={index} className={classname}>
          {index + 1}
          <style jsx>{`
            .date-item {
              height: 52px;
              width: -webkit-fill-available;
              margin-right: 1px;
              background: rgb(191, 192, 193);
              color: #fff;
              text-align: center;
              line-height: 52px;
            }
            .checked {
              background: ${Theme.color.writtentestclockmain};
            }
          `}</style>
        </div>
      )
    })
  }

  render () {
    const { showPage, tipsMsg } = this.state
    if (!showPage) {
      return (
        <div>
          <Footer />
        </div>
      )
    }

    if (tipsMsg) {
      return (
        <div>
          <Toptips type='warn' show> {tipsMsg} </Toptips>
          <Footer />
        </div>
      )
    }

    const { no, groupNo, testResult, evaluationResult } = this.state

    let testResultContent = ''
    if (testResult) {
      const currPersent = testResult ? (testResult + '%') : '0%'
      const beatPersent = this.state.exceeds[testResult] || 0
      testResultContent = `正确率为${currPersent}, 击败了${beatPersent}%的人`
    }

    return (
      <div className='daily-clock-in-form'>
        <div className='sub-form'>
          <div className='title'>打卡记录</div>
          <div className='date-form'>{this.renderDate()}</div>
        </div>
        <div className='sub-form'>
          <div className='title'>我的信息</div>
          <div className='content-wrapper flex-wrapper'>
            <div className='study-no-title'>学号：</div><span className='study-no'>{no}</span>
            <div className='wrapper-trangle'><span /></div>
            <div className='qr-code'>
              <img src={`/static/writtentestclock/qr-code/${groupNo}.jpg`} />
            </div>
          </div>
        </div>
        <div className='sub-form'>
          <div className='title'>我的成绩</div>
          <div className='content-wrapper'>
            <div className='wrapper-trangle'><span /></div>
            <div>入学前测评：正确率为{evaluationResult ? (evaluationResult + '%') : '0%'}, 击败了{this.state.exceeds[evaluationResult] || 0}%的人</div>
            <div>活动后测试：{testResultContent}</div>
          </div>
        </div>
        <a className='prize' href='/writtentestclock/preview-prize' />
        <Footer />
        <style jsx>{`
            .daily-clock-in-form {
              display: flex;
              align-items: center;
              height: 100vh;
              flex-direction: column;
            }
            .sub-form {
              width: 90vw;
              padding: 0 10px;
              margin-bottom: 30px;
            }
            .sub-form:first-child {
              margin-top: 30px;
            }
            .date-form {
              display: flex;
            }
            .content-wrapper {
              padding: 25px 15px;
              border: 1px solid ${Theme.color.writtentestclockmain};
              position: relative;
            }
            .flex-wrapper {
              display: flex;
              padding: 25px 126px 25px 15px;
            }
            .wrapper-trangle {
              position: absolute;
              border-left: 15px solid transparent;
              border-right: 15px solid transparent;
              border-bottom: 20px solid ${Theme.color.writtentestclockmain};
              top: -20px;
              left: 65px;
            }
            .wrapper-trangle span {
              display: block;
              position: absolute;
              border-left: 15px solid transparent;
              border-right: 15px solid transparent;
              border-bottom: 20px solid rgb(29, 29, 29);
              top: 2px;
              left: -15px;
            }
            .qr-code {
              background: #fff;
              width: 100px;
              height: 100px;
              position: absolute;
              right: 1rem;
              top: 1rem;
              border: 1px solid ${Theme.color.writtentestclockmain};
            }
            .qr-code img{
              width: 100px;
              height: 100px;
            }
            .prize {
              background-image: url(/static/writtentestclock/prize.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
              width: 200px;
              height: 80px;
            }
            .study-no-title {
              width: 55px;
            }
            .study-no {
              display: inline-block;
              word-break: break-all;
            }
        `}</style>
      </div>
    )
  }
}
