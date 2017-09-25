import React from 'react'
import classnames from 'classnames'
import Action from '../../action/writtentestclocksecond'
import Footer from '../../containers/writtentestclocksecond/footer'
import WrittenTestClock from '../../containers/writtentestclocksecond/layout'

export default class extends React.Component {
  
  renderGlobalCss () {
    return (
      <style global jsx>{`
          .written-test-clock {
            background: #fff!important;
          }
          .prize-form {
            position: relative;
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
  
  render () {
    return (
      <WrittenTestClock>
        <div className='prize-form'>
          <img src='/static/writtentestclocksecond/1.png' />
          <img src='/static/writtentestclocksecond/2.png' />
          <img src='/static/writtentestclocksecond/3.png' />
          <img src='/static/writtentestclocksecond/4.png' />
          <img src='/static/writtentestclocksecond/5.png' />
          <img src='/static/writtentestclocksecond/6.png' />
          <img src='/static/writtentestclocksecond/7.png' />
          <img src='/static/writtentestclocksecond/8.png' />
          <img src='/static/writtentestclocksecond/9.png' />
          <img src='/static/writtentestclocksecond/10.png' />
          <Footer />
          <style jsx>{`
        `}</style>
          {this.renderGlobalCss()}
        </div>
      </WrittenTestClock>
    )
  }
}
