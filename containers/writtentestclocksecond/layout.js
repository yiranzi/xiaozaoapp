import React from 'react'
import Layout from '../../components/layout'

export default class WrittenTestClockSecond extends React.Component {
  renderGlobalCss () {
    return (
      <style global jsx>{`
        .written-test-clock-second {
          background: url('/static/writtentestclocksecond/bg.png');
          min-height: 100vh;
          padding: 0 1rem;
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
