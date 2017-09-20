import WrittenTestClock from '../../containers/writtentestclocksecond/layout'
import Footer from '../../containers/writtentestclocksecond/footer'
import React from 'react'

export default class extends React.Component {
  renderGlobalCss () {
    return (
      <style global jsx>{`
        .written-test-clock {
          padding: 0!important;
        }
        .more-test-img {
          padding-bottom: 40px;
        }
      `}</style>
    )
  }
  render () {
    return (
      <WrittenTestClock>
        <div className='more-test-img'>
          <img src='/static/writtentestclocksecond/intro-bg-2.jpg'/>
          <Footer />
          {this.renderGlobalCss()}
          <style jsx>{`
            .more-test-img img {
              width: 100vw;
            }
          `}</style>
        </div>
      </WrittenTestClock>
    )
  }
}
