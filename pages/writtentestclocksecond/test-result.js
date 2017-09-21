import React from 'react'
import WrittenTestClockSecondLayout from '../../containers/writtentestclocksecond/layout'
import WrittenTestClockSecondAction from '../../action/writtentestclocksecond'
import ThemeConfig from '../../config/theme'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      testInfo: {},
      showPage: false,
      exceeds: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 42, 44, 46, 48, 51, 54, 57, 60, 63, 65, 67, 69, 72, 75, 77, 80, 82, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 100]
    }
  }

  componentDidMount = async () => {
    try {
      let testInfo = await WrittenTestClockSecondAction.getEvaluation()
      this.setState({
        testInfo: testInfo,
        showPage: true
      })
    } catch (err) {
      alert(err.message)
    }
  }

  renderGlobalCss () {
    return (
      <style global jsx >{`
        .written-test-clock {
          padding: 0!important;
        }
        .written-test-clock-second {
          background: url(/static/writtentestclocksecond/test-result-bg.png);
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style >
    )
  }

  render () {
    const {testInfo} = this.state

    if (testInfo.hasOwnProperty('setId')) {
      const {totalScore, writtenTestTopicDTOList} = testInfo
      const accuracy = Math.round(totalScore / writtenTestTopicDTOList.length * 100)
      return (
        <WrittenTestClockSecondLayout >
          <div className='square-form' >
            <div className='left' >
              <img src='/static/writtentestclocksecond/entry-form-left-3.png' />
            </div >
            <div className='content' >
              <div>{accuracy > 65 ? '' : '很遗憾，'}本次测试答对{testInfo.totalScore}道题</div >
              <div>总正确率{accuracy}%</div >
              <div>你的笔试战斗力超过了{this.state.exceeds[accuracy]}%的笔试打卡学习者</div >
            </div >
            <div className='right' >
              <img src='/static/writtentestclocksecond/entry-form-right-3.png' />
            </div >
          </div >
          <div className='text' >
            <div className='class-prefer' >
              <p >少侠，笔试训练也是一个打怪升级的过程</p >
              <p >您目前最适合进入</p >
              <p className='class' >{accuracy > 65 ? '全能提升进阶班' : '全能提升基础班'}</p >
            </div >
            <a className='jour' href='/writtentestclocksecond/clock-in-intro' >
              <img src='/static/writtentestclocksecond/start-traning.png' />
            </a >
          </div >

          <style jsx >{`
            .square-form {
              color: ${ThemeConfig.color.white};
              display: flex;
              justify-content: center;
            }
            .square-form .content {
              width: 80%;
              box-sizing: border-box;
              background: url(/static/writtentestclocksecond/form.png);
              background-size: 100% 100%;
              margin: auto;
              padding: 3rem 2rem;
              text-align: center;
              font-weight: bold;
              margin-top: 3rem;
            }
            .square-form .left, .square-form .right {
              width: 10%;
            }
            .square-form .left img, .square-form .right img {
              width: 100%;
            }
            .text {
              padding: 1rem 10%;
              text-align: center;
              color: #af7534;
              font-weight: bold;
              margin-bottom: 1rem;
            }
            .text .class {
              color: ${ThemeConfig.color.writtentestclocksecondmainlight};
              font-size: ${ThemeConfig.size.large};
              margin: 1.5rem 0;
            }
            .text .jour {
              display: inline-block;
              width: 80%;
            }
            .text .jour img {
              width: 100%;
            }
            .data2 {
              width: 205px;
              margin: 0 auto;
            }
          `}</style >
          {this.renderGlobalCss()}
        </WrittenTestClockSecondLayout >
      )
    } else {
      return (
        <WrittenTestClockSecondLayout />
      )
    }
  }
}
