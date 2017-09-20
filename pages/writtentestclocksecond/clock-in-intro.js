import React from 'react'
import WrittenTestClock from '../../containers/writtentestclocksecond/layout'
import Theme from '../../config/theme'
import classnames from 'classnames'
import { Toptips } from 'react-weui'
import Action from '../../action/writtentestclocksecond'
import JoinClass from '../../containers/writtentestclocksecond/joinClass'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMore: false,
      isAdvanced: 0,
      showTips: false,
      tipsMsg: '',
      showPage: false,
      showDialog: false,
      dialogContent: '基础班',
      level: '简单'
    }
  }

  componentDidMount = async () => {
    try {
      const info = await Action.getEvaluation()
      const { totalScore, writtenTestTopicDTOList } = info
      const score = Math.round(totalScore / writtenTestTopicDTOList.length * 100)

      this.setState({
        info,
        showPage: true,
        isAdvanced: score > 65 ? 2 : 1
      })
    } catch (error) {
      this.setState({
        error: true,
        showPage: true,
        tipsMsg: error.message,
        showTips: true
      })
    }
  };

  showMoreClick = () => {
    this.setState({
      showMore: !this.state.showMore
    })
  };

  renderGlobalCss = () => {
    return (
      <style global jsx>{`
          .written-test-clock {
            padding: 0!important;
          }
        `}</style>
    )
  };

  chooseClass = (isAdvanced) => {
    this.setState({
      showDialog: true,
      dialogContent: isAdvanced ? '高级班' : '基础班',
      level: isAdvanced ? '提高' : '简单'
    })
  };

  doRequest = async () => {
    const {isAdvanced} = this.state;
    try {
      await Action.selectGroups({ group: isAdvanced ? 'H' : 'N' })
      location.href = '/writtentestclocksecond/choose-class'
    } catch (error) {
      clearTimeout(this.timeout)
      this.setState({
        tipsMsg: error.message,
        showTips: true
      })
      this.timeout = setTimeout(() => this.setState({ showTips: false }), 2000)
    }
  }
  closeDialog (){
    this.setState({
      showDialog: false
    })
  }

  render () {
    const { showMore, isAdvanced, showTips, tipsMsg, showPage, showDialog, dialogContent, level } = this.state

    if (!showPage) return <div />
    return (
      <WrittenTestClock>
        <img className='bg-img' src='/static/writtentestclocksecond/clock-in-intro-bg-1.jpg' />
        <div className='btn-form'>
          {showMore &&
            <div className='choose-class-form'>
              <div className='choose-class-form-inner'>
                <div className={classnames('choose-class', { 'recommend-left': isAdvanced === 1 })}
                  onClick={() => this.chooseClass(false)}>全能提升基础班
                </div>
                <div className={classnames('choose-class', { 'recommend-right': isAdvanced === 2 })}
                  onClick={() => this.chooseClass(true)}>全能提升进阶班
                </div>
              </div>
            </div>
          }
          <div className='btn-img' onClick={this.showMoreClick}></div>
        </div>
        <Toptips type='warn' show={showTips}> {tipsMsg} </Toptips>
        {showDialog &&
          <JoinClass
            dialogContent={dialogContent}
            level={level}
            ok={() => this.doRequest()}
            cancel={() => this.closeDialog()}
          />}
        <style jsx>{`
          .bg-img {
            width: 100%;
          }
          .btn-form {
            bottom: 0;
            width: 100%;
            padding-bottom: 10px;
            position: fixed;
          }
          .btn-img {
            color: #000;
            display: block;
            background-image: url(/static/writtentestclocksecond/choose-now.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            text-align: center;
            height: 60px;
            width: 150px;
            margin: 0 auto;
            padding-right: 10px;
            line-height: 46px;
            margin-top: 20px;
          }
          .choose-class-form {
            display: flex;
            margin: 0 auto;
            color: #000;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-weight: bold;
          }
          .choose-class-form-inner {
            display: flex;
            flex-direction: row;
            border: 3px solid ${Theme.color.writtentestclocksecondmain};
            height: 40px;
            border-radius: 40px;
            margin: 0 auto;
            justify-content: center;
            align-items: center;
            position: relative;
            color: ${Theme.color.writtentestclocksecondmain};
            background: #f8efdb;
          }
          .choose-class {
            padding: 6px 20px;
            height: 10px;
            line-height: 10px;
          }
          .choose-class:first-child {
            border-right: 2px solid ${Theme.color.writtentestclocksecondmain};
          }
          {/* .choose-class-form:after {
            content: '';
            display: block;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid ${Theme.color.writtentestclocksecondmain};
            margin-top: -10px;
          } */}
          .recommend-left:before {
            content: '';
            background-image: url(/static/writtentestclocksecond/recommend.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height: 30px;
            width: 30px;
            display: block;
            top: -18px;
            left: 16%;
            position: absolute;
          }
          .recommend-right:before {
            content: '';
            background-image: url(/static/writtentestclocksecond/recommend.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height: 30px;
            width: 30px;
            display: block;
            top: -18px;
            right: 16%;
            position: absolute;
          }
        `}</style>
        {this.renderGlobalCss()}
      </WrittenTestClock>
    )
  }
}
