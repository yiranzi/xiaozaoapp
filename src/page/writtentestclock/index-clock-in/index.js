import React from 'react';
import Footer from '../components/footer';
import Theme from '../../../../config/theme';
export default class extends React.Component {
  render() {
    return (
      <div className='index-clock-in-form'>
        <div className='btn-form'>
          <img className='title-img' src='/static/writtentestclock/index-clock-in-index.png' />
          <div className='sub-title'>小灶笔试打卡第一期<span> ( 限时免费 ) </span></div>
          <div className='middle-banner'></div>
          <div className='table'>
            <div className='table-title'>
              <div>天数</div>
              <div>完成人数</div>
              <div>正确率</div>
              <div>击败了</div>
            </div>
            <div className='table-row check'>
              <div className='table-content'>
                <div>day1</div>
                <div>3000</div>
                <div>90%</div>
                <div>99%</div>
              </div>
              <div className='check-icon'></div>
            </div>
            <div className='partake'>
              <div className='count'>已有5000人参加</div>
              <div className='avatar'></div>
              <div className='avatar'></div>
              <div className='avatar'></div>
              <div className='avatar'></div>
              <div className='avatar'></div>
              <div className='avatar'></div>
              <div className='ellipsis'>······</div>
            </div>
          </div>
          <div className='accomplish-until'></div>
          <a href='/writtentestclock/answer' className='btn today-push' />
          <a href='/writtentestclock/test?category=end' className='btn test' />
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
            background: url(/static/writtentestclock/index-clock-in-middle-bar.png) no-repeat center center;
            background-size: 91%;
            height: 80px;
            width: 100vw;
          }
          .table {
            width: 90vw;
            margin-bottom: 20px;
          }
          .table-title,
          .table-content {
            justify-content: space-around;
            display: flex;
            width: 85%;
            padding: 5px 0;
          }
          .table-title div,
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
          .cross .table-content {
            background: #515151;
          }
          .cross .check-icon {
            background: url(/static/writtentestclock/cross-blank.png) no-repeat center center #515151;
            background-size: 75%;
          }
          .partake {
            overflow: hidden;
            display: flex;
            justify-content: space-evenly;
            margin-top: 20px;
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
            margin-left: 10px;
          }
          .accomplish-until {
            background: url(/static/writtentestclock/price-count-down.png) no-repeat center center;
            background-size: 91%;
            height: 80px;
            width: 100vw;
            margin-bottom: 30px;
          }
          .btn {
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 220px;
            height: 80px;
            margin: 3px 0;
            margin-left: 1rem;
          }
          .today-push {
            background-image: url(/static/writtentestclock/today-push.png);
          }
          .test {
            background-image: url(/static/writtentestclock/after-class-test.png);
          }
        `}</style>
      </div>
    );
  }
}
