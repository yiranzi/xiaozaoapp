
import WrittenTestClock from '../../containers/writtentestclocksecond/layout'
import React from 'react'
import Footer from '../../containers/writtentestclocksecond/footer'
import Theme from '../../config/theme'
import Constants from '../../config/constants'
import Action from '../../action/writtentestclocksecond'
import { Toptips } from 'react-weui'
import classnames from 'classnames'
import Loading from '../../components/loading'

export default class extends React.Component {
  constructor(props) {
    super(props)
    let set = new Set()
    while (set.size < 5) {
      set.add(Math.round(200 * Math.random()))
    }
    let randomAvatars = [...set]

    this.state = {
      tipsMsg: '',
      showPage: false,
      randomAvatars,
      exceeds: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 42, 44, 46, 48, 51, 54, 57, 60, 63, 65, 67, 69, 72, 75, 77, 80, 82, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 100]
    }
  }

  initState = (info, user, test) => {
    const { startDay, endDay, completeDay } = info
    const { evaluationResult } = user
    const dateLength = Math.ceil((endDay - startDay) / 3600 / 24 / 1000) + 1
    const currentDayIndex = completeDay.length
    let renderList = []
    let totalUser = info.totalUserCount
    let hasPrize = true
    let countdownDay = dateLength - completeDay.length
    for (let i = 0; i < dateLength; i++) {
      const item = completeDay[i] || {}
      /** item.type
        * 2: 打卡完成
        * 1: 打卡未完成
        * 0: 打卡未开始／当日尚未打卡
        **/
      if (completeDay[i]) {
        if (completeDay[i].completed) {
          item.type = 2
        } else {
          if (currentDayIndex === i + 1) {
            item.type = 0
          } else {
            item.type = 1
          }
        }

        if (!completeDay[i].completed &&
          (currentDayIndex !== i + 1)) {
          hasPrize = false
        }
      } else {
        item.type = 0
      }
      renderList.push(item)
    }

    this.setState({
      currentDayIndex,
      evaluationResult,
      countdownDay,
      completeDay,
      dateLength,
      renderList,
      totalUser,
      hasPrize,
      user,
      test,
      showPage: true
    })
  }

  componentDidMount = async () => {
    try {
      this.info = await Action.getHistory()
      this.user = await Action.getInfo()
      this.test = await Action.getTest()
      this.initState(this.info, this.user, this.test)
    } catch (error) {
      if(error.url.indexOf('getTest')) {
        this.initState(this.info, this.user)
      } else {
        this.setState({
          tipsMsg: error.message,
          showPage: true
        })
      }
    }
  }

  rowClick = (type, index) => {
    if (type !== 0) location.href = `/writtentestclocksecond/task?category=task&day=${index + 1}`
  }

  renderRow = (item, index) => {
    const { accuracy, completeUser } = item
    const beat = accuracy ? this.state.exceeds[accuracy] : ''
    const dayIndex = index + 1
    return (
      <div onClick={() => this.rowClick(item.type, index)} key={index} className={classnames('table-row', { 'check': item.type === 2, 'cross': item.type === 1, 'next-todo': item.type === 0 })}>
        <div className='table-content'>
          <div>Day{dayIndex}</div>
          <div>{completeUser}</div>
          <div>{accuracy ? accuracy + '%' : ''}</div>
          <div>{beat ? beat + '%' : (beat === 0 ? '0%' : '')}</div>
        </div>
        <div className='check-icon' />
        <style jsx>{`
          .table-content {
            justify-content: space-around;
            display: flex;
            width: 85%;
            padding: 5px 0;
            font-size: 15px;
          }
          .table-content div {
            width: 25%;
            text-align: center;
          }
          .table-title {
            font-weight: bold;
          }
          .table-row {
            overflow: hidden;
            margin-bottom: 10px;
          }
          .table-content {
            color: #000;
            border-radius: 5px;
            float: left;
          }
          .check .table-content {
            background: #ec4242;
            color: #fff;
          }
          .check-icon {
            width: 35px;
            height: 35px;
            border-radius: 5px;
            float: right;
          }
          .check .check-icon {
            background: url(/static/writtentestclock/check-blank.png) no-repeat center center #ec4242;
            background-size: 75%;
          }
          .cross .table-content,
          .next-todo .table-content {
            background: #d3d3d3;
            color: #ec4242;
          }
          .cross .check-icon {
            background: url(/static/writtentestclock/cross-blank.png) no-repeat center center #d3d3d3;
            background-size: 75%;
          }  
          .next-todo .check-icon {
            background: #d3d3d3;
          }
        `}</style>
      </div>
    )
  }

  render() {
    const { showPage, tipsMsg, renderList, totalUser, hasPrize, countdownDay, evaluationResult, exceeds, randomAvatars, currentDayIndex, user, test } = this.state
    
    let currPersent = 0;
    if(test) {
      currPersent = Math.round(test.totalScore / test.writtenTestTopicDTOList.length * 100)
    }
    
    
    if (!showPage) {
      return (
        <WrittenTestClock>
          <Loading />
          <Footer />
        </WrittenTestClock>
      )
    }

    if (tipsMsg) {
      return (
        <WrittenTestClock>
          <Toptips type='warn' show> {tipsMsg} </Toptips>
          <Footer />
        </WrittenTestClock>
      )
    }
    return (
      <WrittenTestClock>
        <div className='index-clock-in-form'>
          <div className='btn-form'>
            <img className='title-img' src='/static/writtentestclocksecond/index-clock-in-top.png' />
            <div className='top-content'>
              <div className='partake'>
                <div className='count'>已有{totalUser}人参加</div>
                {randomAvatars.map((item, index) => {
                  return <div key={index} className='avatar' style={{ backgroundImage: `url(/static/writtentestclocksecond/avatars/${item}.jpg)` }} />
                })}
                <div className='ellipsis'>······</div>
              </div>
              <div className='middle-form'>
                <div className='row'><span>学号：</span><span className='content'>{user.no || ''}</span></div>
                <div className='row'><span>QQ群号：</span><span className='content'>{Constants.qqGroupNum[user.groupNo]}</span></div>
              </div>
            </div>
            <a href={`/writtentestclocksecond/task?category=task&day=${currentDayIndex}`} className='btn today-push' />

            <div className='result-form'>
              <div className='row'>
                <a href='/writtentestclocksecond/task?category=entrance&&action=review'>
                  <img src='/static/writtentestclocksecond/evaluation-result-btn.png' />
                </a>
                <div>正确率{evaluationResult}%</div>
                <div>击败了{exceeds[evaluationResult || 0]}%的人</div>
              </div>
              <div className='row'>
                {
                  test
                  ? <a href='/writtentestclocksecond/task?category=finish&&action=review'>
                      <img src='/static/writtentestclocksecond/clock-in-result.png' />
                    </a>
                  :  <a><img src='/static/writtentestclocksecond/clock-in-result.png' /></a>
                }
                <div>正确率{currPersent}%</div>
                <div>击败了{exceeds[currPersent || 0]}%的人</div>
              </div>
            </div>
            <div className='hint'><span>点击查看</span><img src='/static/writtentestclocksecond/hand.png' /></div>

            <div className='table'>
              <div className='table-content-wrap'>
                <div className='table-title'>
                  <div>天数</div>
                  <div>完成人数</div>
                  <div>正确率</div>
                  <div>击败了</div>
                </div>
                {renderList.map((item, index) => {
                  return this.renderRow(item, index)
                })}
              </div>
            </div>
            
            <div className='accomplish-until'>
              <img src='/static/writtentestclocksecond/prize.png'/>
              {
                hasPrize
                  ? <div><span>你离通关奖品还差</span><span className='date'>{countdownDay}</span><span>天打卡</span></div>
                  : <div><span>很遗憾您已无法获得本期奖品<br />坚持打卡结束，也会有新的收获哦</span></div>
              }
            </div>
          </div>
          <Footer />
          <style jsx>{`
          .title-img {
            width: 100vw;
          }
          .index-clock-in-form {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            padding-bottom: 50px;
          }
          .btn-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-aligns: center;
            position: relative;
          }
          .table {
            background: url(/static/writtentestclocksecond/clock-in-result-form.png) no-repeat;
            background-size: 100%;
            width: 100vw;
            margin-top: 10px;
            margin-bottom: 20px;
            height: 115vw;
          }
          .table-content-wrap {
            width: 90vw;
            height: 100vw;
            margin: 0 auto;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .table-title {
            justify-content: space-around;
            display: flex;
            width: 85%;
            padding: 5px 0;
            font-size: 15px;
          }
          .table-title div{
            width: 25%;
            text-align: center;
          }
          .partake {
            overflow: hidden;
            display: flex;
            justify-content: space-evenly;
            margin-top: 20px;
            line-height: 25px;
            text-align: center;
            align-items: center;
          }
          .partake .count {
            width: 120px;
          }
          .partake div {
            display: inline-block;
            float: left;
          }
          .avatar {
            background: #ccc;
            height: 25px;
            width: 25px;
            border-radius: 25px;
            margin-left: 5px;
            border: 1px solid;
          }
          .ellipsis {
            color: ${Theme.color.writtentestclocksecondmain};
            margin-left: 5px;
            width: 30px;
          }
          .accomplish-until {
            height: 80px;
            width: 100vw;
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ec4242;
          }
          .accomplish-until div {
            display: block;
            font-size: 17px;
            text-align: right;
            font-weight: bold;
            margin-left: 1rem;
          }
          .accomplish-until .date {
            width: 27px;
            height: 27px;
            text-align: center;
            background: #fff;
            border-radius: 27px;
            margin: 4px;
            color: #ec4242;
          }
          .accomplish-until div span {
            display: inline-block;
            text-align: center;
          }
          .btn {
            background-repeat: no-repeat;
            background-size: contain;
            width: 175px;
            height: 80px;
            margin: 0 auto;
            display: block;
          }
          .today-push {
            background-image: url(/static/writtentestclocksecond/clock-in-today.png);
            margin-top: -40px;
            z-index: 1;
          }
          .avatar {
            background-size: 100%;
          }
          .top-content {
            position: absolute;
            margin: 0 auto;
            margin-top: 83vw;
            top: 0;
            width: 90vw;
            left: calc(50% - 45vw);
          }
          .middle-form {
            margin: 25px 0;
            font-size: 12px;
            text-align: center;
          }
          .middle-form .row {
            padding: 0 5px;
            display: inline-block;
          }
          .middle-form .content {
            border-bottom: 1px solid;
          }
          .result-form {
            margin-top: 20px;
            font-size: 14px;
            color: #af7534;
          }
          .result-form .row {
            display: flex;
            justify-content: space-between;
            width: 90vw;
            line-height: 30px;
            margin-bottom: 10px;
          }
          .result-form .row img {
            width: 120px;
            height: 30px;
          }
          .result-form .row div {
            width: 110px;
            text-align: center;
          }
          .hint {
            font-size: 12px;
            color: #af7534;
            text-align: left;
            width: 80vw;
          }
          .hint img {
            width: 20px;
            vertical-align: middle;
          }
        `}</style>
        </div>
      </WrittenTestClock>
    )
  }
}
