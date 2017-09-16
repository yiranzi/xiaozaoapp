import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324:containers/writtentestclock/components/footer.js
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:containers/writtentestclock/components/footer.js
import Theme from '../../../config/theme'
=======
import Theme from '../../../../config/theme'
>>>>>>> update: eslinit code style:src/page/writtentestclock/components/footer.js
=======
import Theme from '../../../config/theme'
>>>>>>> update: project constructor:containers/writtentestclock/components/footer.js

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
                    background: ${Theme.color.writtentestclockmain};
                    justify-content: space-around;
                    align-items: center;
                }
                .footer-item {
                    display: block;
                    color: #000;
                    height: 30px;
                    width: -webkit-fill-available;
                    text-align: center;
                    line-height: 30px;
                }
                .footer-item:not(:last-child) {
                    border-right: 2px solid #000;
                }
            `}</style>
    )
  }
  render () {
    return (
      <div className='footer-wrapper'>
        <a className='footer-item' href='/writtentestclock/index-clock-in'>
                    每日做题
        </a>
        <a className='footer-item' href='/writtentestclock/more-test'>
                    更多题目
        </a>
        <a className='footer-item' href='/writtentestclock/daily-clock-in'>
                    我的打卡
        </a>
        {this.renderGlobalCss()}
      </div>
    )
  }
}
