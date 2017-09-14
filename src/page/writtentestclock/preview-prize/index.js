import React from 'react';
import UserAction from '../../../../src/action/writtentestclock/user';
import { Toptips } from 'react-weui';
export default class extends React.Component {
  themeConfig = {
    color: '#fe5c4b',
    btnColor: '#fff08b'
  }
  constructor (props) {
    super(props);
    this.state = {
      showPage: false,
      checkedLevel: 0,
      tipsMsg: ''
    };
  }
  componentDidMount = async () => {
    try {
      const info = await UserAction.getInfo();
      const { completeDate } = info;
      const checkedList = completeDate.filter(item => item);
      const length = checkedList.length;
      let checkedLevel = 0;

      if (length >= 3 && length < 5) {
        checkedLevel = 1;
      } else if (length >= 5 && length < 7) {
        checkedLevel = 2;
      } else if (length >= 7) {
        checkedLevel = 3;
      }

      this.setState({
        checkedLevel,
        showPage: true
      });
    } catch (error) {
      this.setState({
        showPage: true,
        tipsMsg: error.message
      });
    }
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
          .written-test-clock {
            background: #fff!important;
          }
          .prize-form {
            position: relative;
            padding-top: 30px;
            font-size: 14px;
            color: ${this.themeConfig.color};
          }
      `}</style>
    );
  }
  chooseCoupon = (v) => {
    const { checkedLevel } = this.state;
    if (checkedLevel === v) {
      switch (v) {
        case 1:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=w0jbjbrm';
          break;
        case 2:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=48jrv06d';
          break;
        case 3:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=v0ehqsng';
          break;
        default:
      }
    }
  }
  render () {
    const { showPage, tipsMsg } = this.state;
    if (!showPage) return <div />;
    if (tipsMsg) {
      return <Toptips type='warn' show> {tipsMsg} </Toptips>;
    };
    return (
      <div className='prize-form'>
        <div className='coupon-form'>
          <div className='coupon-title'>小灶笔试打卡奖励，相信每一份坚持都会有回报！</div>
          <div className='coupon'>
            <img src='/static/writtentestclocksecond/coupon50.png' />
            <div>连续3天打卡，</div>
            <div>即可获得50元四大线上课程学习基金</div>
            <a onClick={() => this.chooseCoupon(1)}>点击立即领取</a>
          </div>
          <div className='coupon'>
            <img src='/static/writtentestclocksecond/coupon100.png' />
            <div>连续5天打卡，</div>
            <div>即可获得100元四大线上课程学习基金</div>
            <a onClick={() => this.chooseCoupon(2)}>点击立即领取</a>
          </div>
          <div className='coupon'>
            <img src='/static/writtentestclocksecond/coupon150.png' />
            <div>连续7天打卡，</div>
            <div>即可获得150元四大线上课程学习基金</div>
            <div>学习基金＋解锁第二期笔试打卡权限</div>
            <a onClick={() => this.chooseCoupon(3)}>点击立即领取</a>
          </div>
        </div>

        <img className='middle-title' src='/static/writtentestclocksecond/prize-middle-title.png' />

        <div className='class-block'>
          <a href='https://h5.youzan.com/v2/showcase/homepage?alias=ph3y0wi&dc_ps=27851&redirect_count=2' />
          <img src='/static/writtentestclocksecond/class-1.png' />
        </div>
        <div className='class-block'>
          <a href='https://h5.youzan.com/v2/showcase/homepage?alias=ph3y0wi&dc_ps=27851&redirect_count=2' />
          <img src='/static/writtentestclocksecond/class-2.png' />
        </div>
        <div className='class-block'>
          <a href='https://h5.youzan.com/v2/showcase/homepage?alias=ph3y0wi&dc_ps=27851&redirect_count=2' />
          <img src='/static/writtentestclocksecond/class-3.png' />
        </div>
        <div className='class-block'>
          <a href='https://h5.youzan.com/v2/showcase/homepage?alias=ph3y0wi&dc_ps=27851&redirect_count=2' />
          <img src='/static/writtentestclocksecond/class-4.png' />
        </div>

        <img className='qr-code' src='/static/writtentestclocksecond/bottom-qr-code.png' />

        <style jsx>{`
          .coupon-form {
            border: 1px solid ${this.themeConfig.color};
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 5px 5px 5px #888888;
            margin-bottom: 20px;
          }
          .coupon-title {
            font-weight: bold;
            margin: 30px 0;
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
            width: 24%;
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
        {this.renderGlobalCss()}
      </div>
    );
  }
}
