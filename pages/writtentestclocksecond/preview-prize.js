import React from 'react'
import classnames from 'classnames'
import { Toptips } from 'react-weui'
import Action from '../../action/writtentestclocksecond'
import Footer from '../../containers/writtentestclocksecond/footer'
import WrittenTestClock from '../../containers/writtentestclocksecond/layout'

export default class extends React.Component {
  themeConfig = {
    color: '#fe5c4b',
    btnColor: '#fff08b'
  }
  constructor(props) {
    super(props)
    this.state = {
      showPage: false,
      checkedLevel: 0,
      tipsMsg: ''
    }
  }
  componentDidMount = async () => {
    try {
      const info = await Action.getInfo()
      const result = await Action.getTest()
      const { completeDay } = info
      const checkedList = completeDay.filter(item => item)
      let length = checkedList.length
      if (result.answerDTOList.length) length++

      let checkedLevel = 0

      if (length >= 3 && length < 5) {
        checkedLevel = 1
      } else if (length === 5) {
        checkedLevel = 2
      } else if (length > 5) {
        checkedLevel = 3
      }

      this.setState({
        checkedLevel,
        showPage: true
      })
    } catch (error) {
      this.setState({
        showPage: true,
        tipsMsg: error.message
      })
    }
  }

  chooseCoupon = (v) => {
    const { checkedLevel } = this.state
    if (checkedLevel === v) {
      switch (v) {
        case 1:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=2z7os176'
          break
        case 2:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=a2rscewu'
          break
        case 3:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=1erad2oav'
          break
        default:
      }
    }
  }

  renderGlobalCss() {
    return (
      <style global jsx>{`
          .written-test-clock {
            background: #fff!important;
          }
          .prize-form {
            position: relative;
            background: #fff;
            width: 100%;
            margin-bottom: 100px;
          }
          .prize-form img {
            width: 100%;
            margin-bottom: -8px;
          }
      `}</style>
    )
  }

  render() {
    const { showPage, tipsMsg, checkedLevel } = this.state
    if (!showPage) return <div />
    if (tipsMsg) {
      return <Toptips type='warn' show> {tipsMsg} </Toptips>
    };
    return (
      <WrittenTestClock>
        <div className='prize-form'>
          <div className='coupon-form'>
            <div className='coupon-title'>小灶笔试打卡奖励，相信每一份坚持都会有回报！</div>
            <div className='coupon'>
              <img src='/static/writtentestclocksecond/coupon20.png' />
              <div>连续3天打卡，</div>
              <div>即可获得20元四大线上课程学习基金</div>
              <a
                className={classnames({ 'disabled': checkedLevel !== 1 })}
                onClick={() => this.chooseCoupon(1)}>{checkedLevel === 1 ? '立即领取' : '打卡结束后即可领取'}</a>
            </div>
            <div className='coupon'>
              <img src='/static/writtentestclocksecond/coupon30.png' />
              <div>连续5天打卡，</div>
              <div>即可获得30元四大线上课程学习基金</div>
              <a
                className={classnames({ 'disabled': checkedLevel !== 2 })}
                onClick={() => this.chooseCoupon(2)}>{checkedLevel === 2 ? '立即领取' : '打卡结束后即可领取'}</a>
            </div>
            <div className='coupon'>
              <img src='/static/writtentestclocksecond/coupon50.png' />
              <div>连续7天打卡，</div>
              <div>即可获得50元四大线上课程学习基金</div>
              <a
                className={classnames({ 'disabled': checkedLevel !== 3 })}
                onClick={() => this.chooseCoupon(3)}>{checkedLevel === 3 ? '立即领取' : '打卡结束后即可领取'}</a>
            </div>
          </div>
          <img src='/static/writtentestclocksecond/prize/1-.png' />
          <div className='class-block'>
            <a href='https://h5.youzan.com/v2/feature/14hq9cwg7' />
            <img src='/static/writtentestclocksecond/prize/2-.png' />
          </div>
          <div className='class-block'>
            <a href='https://h5.youzan.com/v2/feature/14hq9cwg7' />
            <img src='/static/writtentestclocksecond/prize/3-.png' />
          </div>
          <div className='class-block'>
            <a href='https://h5.youzan.com/v2/feature/14hq9cwg7' />
            <img src='/static/writtentestclocksecond/prize/4-.png' />
          </div>
          <div className='class-block'>
            <a href='https://h5.youzan.com/v2/feature/14hq9cwg7' />
            <img src='/static/writtentestclocksecond/prize/5-.png' />
          </div>
          
          <img src='/static/writtentestclocksecond/prize/6-.png' />
          <div className='class-block'>
            <a href='https://h5.youzan.com/v2/goods/2x7t40laxx40h' />
            <img src='/static/writtentestclocksecond/prize/7-.png' />
          </div>
          <img src='/static/writtentestclocksecond/prize/8-.png' />
          <div className='class-block'>
            <a href='https://h5.youzan.com/v2/goods/1yhjp7yil20ch' />
            <img src='/static/writtentestclocksecond/prize/9-.png' />
          </div>
          <img src='/static/writtentestclocksecond/prize/10-.png' />
          <Footer />
          {this.renderGlobalCss()}
          <style jsx>{`
            .coupon-form {
              border: 1px solid ${this.themeConfig.color};
              border-radius: 5px;
              display: flex;
              flex-direction: column;
              align-items: center;
              box-shadow: 5px 5px 5px #888888;
              margin: 20px;
              background: #fff;

            }
            .coupon-title {
              font-weight: bold;
              margin: 30px 0;
              font-size: .9rem;
              text-align: center;
            }
            .coupon {
              margin-bottom: 10px;
              width: 80vw;
              background: ${this.themeConfig.color};
              border-radius: 5px;
              text-align: center;
              color: #fff;
            }
            .coupon img {
              width: 90%;
              margin: 20px 0;
            }
            .coupon a {
              display: inline-block;
              padding: 5px 10px;
              background: ${this.themeConfig.btnColor};
              color: #000;
              border-radius: 5px;
              width: 150px;
              margin: 30px 0;
            }
            .coupon .disabled {
              background: #ccc;
            }
            .middle-title {
              width: 100%;
              margin: 30px 0;
            }
            .class-block {
              position: relative;
              margin-bottom: 20px;
            }
            .class-block a {
              position: absolute;
              width: 38%;
              height: 17%;
              {/* background: aqua; */}
              margin-left: 46%;
              margin-top: 40%;
            }
            .class-block img,
            .qr-code {
              width: 100%;
            }
          `}</style>
        </div>
      </WrittenTestClock>
    )
  }
}
