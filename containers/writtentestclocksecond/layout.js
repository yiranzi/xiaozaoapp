import React from 'react'
import Layout from '../../components/layout'
import ThemeConfig from '../../config/theme'

export default class WrittenTestClockSecond extends React.Component {
  renderGlobalCss () {
    return (
      <style global jsx>{`
        .written-test-clock-second {
          background: url('/static/writtentestclocksecond/bg.png');
          color: ${ThemeConfig.color.writtentestclocksecondmain}
          min-height: 100vh;
          background-size: 100% 100%;
        }
    `}</style>
    )
  }
  render () {
    const {error} = this.props
    return (
      <Layout error={error}>
        <div className='written-test-clock-second'>
          {this.props.children}
        </div>
        {this.renderGlobalCss()}
      </Layout>
    )
  }
}
