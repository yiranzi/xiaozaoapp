import React from 'react';
import Footer from '../components/footer';
export default class extends React.Component {
  render () {
    return (
      <div className='index-clock-in-form'>
        <div className='btn-form'>
          <img className='title-img' src='/static/writtentestclock/index-clock-in-logo.png' />
          <a href='/writtentestclock/pastanswer' className={'btn yesterday-achieve'} />
          <a href='/writtentestclock/former-clock-in' className='btn former-test' />
          <a href='/writtentestclock/answer' className='btn today-push' />
          <a href='/writtentestclock/test?category=end' className='btn test' />
        </div>
        <Footer />
        <style jsx>{`
          .title-img {
            width: 100vw;
            margin-top: 30px;
            margin-bottom: 15px;
          }
          .index-clock-in-form {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 100vh;
            flex-direction: column;
          }
          .btn-form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .btn {
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 220px;
            height: 80px;
            margin: 3px 0;
            margin-left: 1rem;
          }
          .yesterday-achieve-check {
            background-image: url(/static/writtentestclock/yesterday-achieve-check.png);
          }
          .yesterday-achieve-cross {
            background-image: url(/static/writtentestclock/yesterday-achieve-cross.png);
          }
          .yesterday-achieve {
            background-image: url(/static/writtentestclock/yesterday-achieve.png);
          }

          .former-test {
            background-image: url(/static/writtentestclock/former-test.png);
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
