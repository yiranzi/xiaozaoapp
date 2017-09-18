import React from 'react'
import Theme from '../../config/theme'

export default class extends React.Component {
  renderGlobalCss () {
    return (
      <style global jsx>{`
          .footer-wrapper {
              position: fixed;
              display: flex;
              bottom: 0;
              left: 0;
              height: 50px;
              width: 100vw;
              justify-content: space-around;
              align-items: center;
          }
          .footer-item {
              display: block;
              color: #000;
              height: 12vw;
              width: -webkit-fill-available;
              text-align: center;
          }
          .footer-item {
          }
          .my-clock-in {
            background: url(/static/writtentestclocksecond/my-clock-in.png);
            background-size: 100%;
          }
          .my-prize {
            background: url(/static/writtentestclocksecond/my-prize.png);
            background-size: 100%;
          }
          .clock-in-intro {
            background: url(/static/writtentestclocksecond/clock-in-intro.png);
            background-size: 100%;
          }
          .cross-line {
            width: 100vw;
            position: absolute;
            height: 10px;
            background: ${Theme.color.writtentestclocksecondmain};
            z-index: -1;
          }
      `}</style>
    )
  }
  render () {
    return (
      <div className='footer-wrapper'>
        <div className='cross-line'/>
        <a className='footer-item my-clock-in' href='/writtentestclocksecond/index-clock-in'></a>
        <a className='footer-item my-prize' href='/writtentestclocksecond/more-test'></a>
        <a className='footer-item clock-in-intro' href='/writtentestclocksecond/daily-clock-in'></a>
        {this.renderGlobalCss()}
      </div>
    )
  }
}
