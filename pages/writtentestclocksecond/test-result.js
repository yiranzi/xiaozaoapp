import WrittenTestClockSecondLayout from '../../containers/writtentestclocksecond/layout'
import WrittenTestClockSecondAction from '../../action/writtentestclocksecond'
import React from 'react'

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
    let testInfo = await WrittenTestClockSecondAction.getEvaluation()
    console.log(testInfo)
    this.setState({
      testInfo: testInfo,
      showPage: true
    })
  }

  shareWx = () => {
    this.setState({
      shareIsShow: true
    })
  }

  renderGlobalCss () {
    return (
      <style global jsx >{`
        .written-test-clock {
          padding: 0!important;
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
              <img src='/static/writtentestclocksecond/form-left.png' />
            </div>
            <div className='content' >
              <div className='right-count' >本次测试打对{testInfo.totalSize}道题</div >
              <div className='data1' >总正确率{accuracy}%</div >
              <div className='data2' >你的笔试战斗力超过了{this.state.exceeds[accuracy]}%的笔试打卡学习者</div >
            </div >
            <div className='right' >
              <img src='/static/writtentestclocksecond/entry-form-right.png' />
            </div >
          </div >
          <div className='class-prefer'>
            <p>少侠，笔试训练也是一个打怪升级的过程</p>
            <p>您目前最适合进入</p>
            <p>{accuracy > 65 ? '全能提升进阶班' : '全能提升基础班'}</p>
          </div>
          <a className='jour' href='/writtentestclocksecond/clock-in-intro'>
            <img src='/static/writtentestclocksecond/'/>
          </a>
          <style jsx >{`
          .square-form {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .square-form .left, .square-form .right {
            width: 10%;
          }
          .square-form .left, .square-form .content, .square-form .right {

          }
          .square-form img {
            width: 100%;
          }
          .square-form .content {
            width: 70%;
            background: url(/static/writtentestclocksecond/form.png);
            background-size: 100% 100%;
            padding: 4rem 2rem;
            text-align: center;
          }
        `}</style >
        </WrittenTestClockSecondLayout>
      )
    } else {
      return (
        <WrittenTestClockSecondLayout > </WrittenTestClockSecondLayout >
      )
    }
  }
}
