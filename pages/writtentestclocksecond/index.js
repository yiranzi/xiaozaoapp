import React from 'react'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'

export default class extends React.Component {
  renderContent () {
    return (
      <div />
    )
  }
  renderGlobalCss () {
    return (
      <style jsx global>{`
        .main .written-test-clock {
          padding: 0;
        }
      `}</style>
    )
  }
  render () {
    return (
      <WrittenTestClock>
        <div className='intro-bg'>
          <div className='content'>
            <div>dafsdf</div>
            <div>dafsdf</div>
            <div>dafsdf</div>
            <div>dafsdf</div>
            <div>dafsdf</div>
            <div>dafsdf</div>
          </div>
        </div>

        {this.renderGlobalCss()}
        <style jsx>{`
          .intro-bg {
            position: relative;
            display: flex;
            justify-content: center;
            background: url(/static/writtentestclocksecond/season2-sign-in.jpeg);
            background-size: 100%;
            height: 100vh;
            background-color: 'red';
            text-align: center;
            align-items: flex-end;
          }
          .content {
            background: aqua;
            margin-bottom: 30px;
          }
        `}</style>
      </WrittenTestClock>
    )
  }
}
