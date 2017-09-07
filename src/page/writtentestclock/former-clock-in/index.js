import React from 'react';
import Theme from '../../../../config/theme';
import Footer from '../components/footer';
import UserAction from '../../../../src/action/writtentestclock/user';
export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [],
      showPage: false
    };
  }

    componentDidMount = async () => {
      const info = await UserAction.getHistory();
      let obj = {};
      obj.list = [];
      let {startDay, endDay, completeDay} = info;
      const duringDay = Math.ceil((endDay - startDay) / 3600 / 24 / 1000);
      for (let i = 0; i <= duringDay; i++) {
        const date = new Date(startDay);
        const Month = date.getMonth() + 1;
        const Day = date.getDate();
        obj.list.push({
          date: `${Month}月${Day}日`,
          day: `DAY${i + 1}`,
          check: completeDay[i] === undefined ? 'unknow' : completeDay[i] ? 'check' : 'cross'
        });
        startDay += 3600 * 24 * 1000;
      }
      this.setState({
        ...obj,
        evaluationId: info.evaluationId,
        showPage: true,
        completeDayLength: info.completeDay.length
      });
    }

    goToPastAnswer = (index) => {
      if (this.state.completeDayLength >= index + 1) location.href = `/writtentestclock/pastanswer?day=${index + 1}`;
    }

    renderGlobalCss () {
      return (
        <style global jsx >{`
          .clock-in-list:before {
            content: '';
            position: absolute;
            display: block;
            top: 188px;
            left: 16px;
            border: 1px solid;
            border-left: none;
            width: 10px;
            background: rgb(30, 31, 32);
            height: 20px;
            border-radius: 0 20px 20px 0;
          }
          .clock-in-list:after {
            content: '';
            position: absolute;
            display: block;
            top: 188px;
            right: 16px;
            border: 1px solid;
            border-right: none;
            width: 10px;
            background: rgb(30, 31, 32);
            height: 20px;
            border-radius: 20px 0 0 20px;
          }
        `}</style>
      );
    }

    renderItem = (item, index) => {
      return (
        <div className='clock-in-item' key={index}>
          <div className='content' onClick={() => this.goToPastAnswer(index)}>
            <div className='date'>{item.date}</div>
            <div>{item.day}</div>
            <div className={item.check} />
          </div>
          <style jsx>{`
            .date {
              width: 100px;
            }
            .content {
              display: flex;
              justify-content: space-between;
              font-size: 25px;
              height: 70px;
              align-items: flex-end;
            }
            .check{
              background-image: url(/static/writtentestclock/check.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
              height: 40px;
              width: 40px;
            }
            .cross{
              background-image: url(/static/writtentestclock/cross.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
              height: 40px;
              width: 40px;
            }
            .unknow {
              height: 40px;
              width: 40px;
            }
          `}</style>
          {this.renderGlobalCss()}
        </div>
      );
    }

    goToPreSchollAnswer () {
      if (this.state.evaluationId) location.href = '/writtentestclock/pastanswer?day=test';
    }

    render () {
      const { showPage } = this.state;
      if (!showPage) return <div />;
      return (
        <div className='clock-in-form'>
          <div className='clock-in-list'>
            <div className='title' onClick={() => this.goToPreSchollAnswer()}>入学前测评</div>
            {this.state.list.map((item, index) => this.renderItem(item, index))}
          </div>
          <Footer />
          <style jsx global>{`
            .clock-in-form {
              display: flex;
              align-items: center;
              height: 100vh;
            }
            .clock-in-list {
              width: 100%;
              height: 85vh;
              overflow: auto;
              background: rgb(30, 31, 32);
              border: 1px solid ${Theme.color.writtentestclockmain};
              padding: 0 20px;
            }
            .clock-in-item {
              position: relative;
              height: 80px;
              border-bottom: 1px dashed ${Theme.color.writtentestclockmain};
            }
            .clock-in-item:last-child {
              margin-bottom: 30px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              margin-top: 20px;
            }
          `}</style>
        </div>
      );
    }
}
