import React from 'react';
import Footer from '../components/footer';
import Theme from '../../../../config/theme';
import UserAction from '../../../../src/action/writtentestclock/user';
import { Toptips } from 'react-weui';
import classnames from 'classnames';
export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      tipsMsg: '',
      showPage: false,
      exceeds: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 42, 44, 46, 48, 51, 54, 57, 60, 63, 65, 67, 69, 72, 75, 77, 80, 82, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 100]
    };
  }

  componentDidMount = async () => {
    try {
      const info = await UserAction.getHistory();
      const { startDay, endDay, completeDay, evaluationAccuracy } = info;
      const dateLength = Math.ceil((endDay - startDay) / 3600 / 24 / 1000) + 1;
      const currentDayIndex = completeDay.length;
      let renderList = [];
      let totalUser = info.totalUserCount;
      let hasPrize = true;
      let countdownDay = dateLength - completeDay.length;
      for (let i = 0; i < dateLength; i++) {
        const item = completeDay[i] || {};
        /** item.type
          * 2: 打卡完成
          * 1: 打卡未完成
          * 0: 打卡未开始／当日尚未打卡
          **/
        if (completeDay[i]) {
          if (completeDay[i].completed) {
            item.type = 2;
          } else {
            if (currentDayIndex === i + 1) {
              item.type = 0;
            } else {
              item.type = 1;
            }
          }

          if (!completeDay[i].completed &&
            (currentDayIndex !== i + 1)) {
            hasPrize = false;
          }
        } else {
          item.type = 0;
        }
        renderList.push(item);
      }
      this.setState({
        currentDayIndex,
        evaluationAccuracy,
        countdownDay,
        completeDay,
        dateLength,
        renderList,
        totalUser,
        hasPrize,
        showPage: true
      });
    } catch (error) {
      this.setState({
        tipsMsg: error.message,
        showPage: true
      });
    }
  }

  rowClick = (type, index) => {
    if (type !== 0) location.href = `/writtentestclock/pastanswer?day=${index + 1}`;
  }

  renderRow = (item, index) => {
    const { accuracy, completeUser } = item;
    const beat = accuracy ? this.state.exceeds[accuracy] : '';
    const dayIndex = index + 1;
    return (
      <div onClick={() => this.rowClick(item.type, index)} key={index} className={classnames('table-row', { 'check': item.type === 2, 'cross': item.type === 1, 'next-todo': item.type === 0 })}>
        <div className='table-content'>
          <div>Day{dayIndex}</div>
          <div>{completeUser}</div>
          <div>{accuracy ? accuracy + '%' : ''}</div>
          <div>{beat ? beat + '%' : ''}</div>
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
            background: #cbcbcb;
          }
          .check-icon {
            width: 35px;
            height: 35px;
            border-radius: 5px;
            float: right;
          }
          .check .check-icon {
            background: url(/static/writtentestclock/check-blank.png) no-repeat center center ${Theme.color.writtentestclockmain};
            background-size: 75%;
          }
          .cross .table-content,
          .next-todo .table-content {
            background: #515151;
            color: #cbcbcb;
          }
          .cross .check-icon {
            background: url(/static/writtentestclock/cross-blank.png) no-repeat center center #515151;
            background-size: 75%;
          }  
          .next-todo .check-icon {
            background: #515151;
          }
        `}</style>
      </div>
    );
  }

  render () {
    const { showPage, tipsMsg, renderList, totalUser, hasPrize, countdownDay, evaluationAccuracy, exceeds } = this.state;
    if (!showPage) {
      return (
        <div>
          <Footer />
        </div>
      );
    }

    if (tipsMsg) {
      return (
        <div>
          <Toptips type='warn' show> {tipsMsg} </Toptips>
          <Footer />
        </div>
      );
    }

    return (
      <div className='index-clock-in-form'>
        <div className='btn-form'>
          <img className='title-img' src='/static/writtentestclock/index-clock-in-index.png' />
          <div className='sub-title'>小灶笔试打卡第一期<span> ( 限时免费 ) </span></div>
          <a className='middle-banner' href='/writtentestclock/pastanswer?day=test'>
            <div>入学前测评－正确率{evaluationAccuracy || 0}%－击败了{exceeds[evaluationAccuracy || 0]}%人</div>
          </a>
          <div className='table'>
            <div className='table-title'>
              <div>天数</div>
              <div>完成人数</div>
              <div>正确率</div>
              <div>击败了</div>
            </div>
            {renderList.map((item, index) => {
              return this.renderRow(item, index);
            })}
            <div className='partake'>
              <div className='count'>已有{totalUser}人参加</div>
              <div className='avatar a' />
              <div className='avatar b' />
              <div className='avatar c' />
              <div className='avatar d' />
              <div className='avatar e' />
              <div className='ellipsis'>······</div>
            </div>
          </div>
          <div className='accomplish-until'>
            {
              hasPrize
                ? <div><span>你离通关奖品还差</span><span className='date'>{countdownDay}</span><span>天打卡</span></div>
                : <div><span>很遗憾您已无法获得本期奖品<br />坚持打卡结束，也会有新的收获哦</span></div>
            }
          </div>
          <a href='/writtentestclock/preview-prize' className='btn preview-prize' />
          <a href='/writtentestclock/answer' className='btn today-push' />
          <a className='btn test' />
        </div>
        <Footer />
        <style jsx>{`
          .title-img {
            width: 100vw;
            margin: 15px 0;
          }
          .sub-title {
            font-size: ${Theme.size.normal}
            font-weight: bold;
          }
          .sub-title span {
            color: red;
          }
          .index-clock-in-form {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            margin-bottom: 50px;
          }
          .btn-form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .middle-banner {
            background: url(/static/writtentestclock/index-clock-in-middle-bar-1.png) no-repeat center center;
            background-size: 91%;
            height: 80px;
            width: 100vw;
            color: #000;
            line-height: 70px;
            text-align: center;
            font-size: 14px;
          }
          .middle-banner div {
            text-align: center;
            width: 90vw;
          }
          .table {
            width: 90vw;
            margin-bottom: 20px;
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
          }
          .ellipsis {
            color: #fff;
            margin-left: 5px;
            width: 30px;
          }
          .accomplish-until {
            background: url(/static/writtentestclock/prize-count-down.png) no-repeat center center;
            background-size: 91%;
            height: 80px;
            width: 100vw;
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
          }
          .accomplish-until div {
            display: block;
            font-size: 17px;
            text-align: right;
            font-weight: bold;
            margin-left: 2rem;
          }
          .accomplish-until .date {
            width: 27px;
            height: 27px;
            text-align: center;
            background: #fff;
            border-radius: 27px;
            margin: 4px;
            color: ${Theme.color.writtentestclockmain};
          }
          .accomplish-until div span {
            display: inline-block;
            text-align: center;
          }
          .btn {
            background-repeat: no-repeat;
            background-size: contain;
            width: 220px;
            height: 80px;
            margin: 3px 0;
            margin-left: 1rem;
          }
          .today-push {
            background-image: url(/static/writtentestclock/today-push-1.png);
          }
          .preview-prize {
            background-image: url(/static/writtentestclock/preview-prize.png);
          }
          .test {
            background-image: url(/static/writtentestclock/after-class-test-disabled-1.png);
          }
          .avatar {
            background-size: 100%;
          }
          .avatar.a {
            background-image: url(/static/writtentestclock/avatars/avatar1.jpeg);
          }
          .avatar.b {
            background-image: url(/static/writtentestclock/avatars/avatar2.jpeg);
          }
          .avatar.c {
            background-image: url(/static/writtentestclock/avatars/avatar3.jpeg);
          }
          .avatar.d {
            background-image: url(/static/writtentestclock/avatars/avatar4.jpeg);
          }
          .avatar.e {
            background-image: url(/static/writtentestclock/avatars/avatar5.jpeg);
          }
        `}</style>
      </div>
    );
  }
}
