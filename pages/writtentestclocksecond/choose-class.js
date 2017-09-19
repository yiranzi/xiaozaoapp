import WrittenTestClock from '../../containers/writtentestclocksecond/layout'
import React from 'react'
import Constants from '../../config/constants'
import Theme from '../../config/theme'
import { Toptips } from 'react-weui'
import Action from '../../action/writtentestclocksecond'

export default class extends React.Component {
  constructor (props) {
    super(props)
    // const { info } = props'
    this.state = {
      showTips: '',
      tipsMsg: '',
      info: '',
      showPage: false
    }
  }

  componentDidMount = async() => {
    try{
      const info = await Action.getInfo()
      this.setState({
        info,
        showTips: info.error,
        tipsMsg: info.message || '',
        showPage: true
      })
    }catch(error) {
      this.setState({
        error: true,
        showPage: true,
        ...error
      })
    }
  }

  renderGolbalCss() {
    return (
      <style global jsx>{`
        .written-test-clock-second {
          overflow-x: hidden;
        }
      `}</style>
    )
  }

  render () {
    const { showTips, tipsMsg, showPage } = this.state
    const { no, groupNo } = this.state.info

    if (!showPage) return <div />
    if (showTips) {
      return <Toptips type='warn' show={showTips}> {tipsMsg} </Toptips>
    }
    return (
      <WrittenTestClock>
        <div className='class-choose-form'>

          <div className='class-choose-top-form'>
            <div className='class-choose-title'>您已经成功选择班级!</div>
            <div className='sub-form'>
              <div className='sub-title'>你的学号是：</div>
              <div className='sub-content-id'>{no || ''}</div>
            </div>
          </div>

          <div className='class-choose-content'>
            <img src={`/static/writtentestclock/qr-code/${groupNo}.jpg`} />
          </div>

          <div className='class-choose-qq'>
            <div className='qq'>QQ群号：{Constants.qqGroupNum[groupNo]}</div>
            <div className='hint'>*若长按扫码无法加群</div>
            <div className='hint'>请输入QQ号进入专属打卡群</div>
          </div>
          <a className='go-clock-in' href='/writtentestclocksecond/index-clock-in' />
          {this.renderGolbalCss()}
          <style jsx>{`
            .class-choose-form {
                align-items: center;
                height: 100vh;
                display: flex; 
                flex-direction: column;
                justify-content: space-around;
            }
            .class-choose-top-form {
                position: relative;
                background: url(/static/writtentestclocksecond/choose-class-form.png);
                background-size: 100%;
                background-repeat: no-repeat;
                height: 47vw;
                width: 80vw;
                text-align: center;
                margin: 0 auto;
            }
            .class-choose-top-form:before {
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
            .class-choose-top-form:after {
              content: ' ';
              position: absolute;
              background: url(/static/writtentestclocksecond/choose-class-form-right.png);
              right: -98px;
              width: 100px;
              top: 47%;
              height: 75px;
              background-size: 45%;
              background-repeat: no-repeat;
            }
            .class-choose-title {
              color: #fff;
              font-size: 23px;
              font-weight: bold;
              padding-top: 2vw;
            }
            .class-choose-title-bg {
                height: 100px;
                border-left: 100vw solid ${Theme.color.writtentestclockmain};
                border-bottom: 26px solid transparent;  
            }
            
            .sub-form {
              bottom: 30px;
              margin: 0 auto;
              position: absolute;
              width: 80vw;
              height: 10vh;
            }
            .sub-title {
                color: ${Theme.color.writtentestclocksecondfont};
                height: 30px;
                font-size: 13px;
                font-weight: 200;
            }
            .sub-content-id {
                height: 25px;
                color: ${Theme.color.writtentestclocksecondfont};
                text-align: center;
                line-height: 25px;
                margin: 0 -10px;
                font-size: 25px;
            }
            .class-choose-content {
              position: relative;
              background: url(/static/writtentestclocksecond/qr-code.png);
              background-repeat: no-repeat;
              background-position: center;
              background-size: 70%;
              height: 200px;
              margin-top: 10px;
              display: flex;
              flex-direction: column;
              width: 18rem;
              text-align: center;
              margin: 0 auto;
            }
            .class-choose-content:before {
              content: ' ';
              position: absolute;
              background: url(/static/writtentestclocksecond/qr-code-left.png);
              left: -34px;
              width: 100px;
              top: 25%;
              height: 111px;
              background-size: 80%;
              background-repeat: no-repeat;
            }
            .class-choose-content:after {
              content: ' ';
              position: absolute;
              background: url(/static/writtentestclocksecond/qr-code-right.png);
              right: -56px;
              width: 100px;
              top: 18%;
              height: 150px;
              background-size: 13%;
              background-repeat: no-repeat;
            }
            .class-choose-content img {
                margin: 0 auto;
                width: 180px;
                height: 180px;
                margin-top: 10px;
            }
            .class-choose-qq {
              text-align: center;
            }
            .class-choose-qq .qq {
              color: ${Theme.color.writtentestclocksecondmain};
              font-size: 20px;
              margin: 10px 0;
            }
            .class-choose-qq .hint {
              color: ${Theme.color.writtentestclocksecondmain};
              font-size: 12px;
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
            }
            
        `}</style>
        </div>
      </WrittenTestClock>
    )
  }
}
