<<<<<<< b804211441c4503475c314425b207580923bc267:src/page/writtentestclocksecond/layout.js
import React from 'react'
import Layout from '../../../components/layout'
import ThemeConfig from '../../../../config/theme'
=======
import React from 'react';
import Layout from '../../components/layout';
import ThemeConfig from '../../../../config/theme';
>>>>>>> update: 调整目录结构:containers/writtentestclocksecond/layout.js

export default class WrittenTestClock extends React.Component {
  renderGlobalCss () {
    return (
      <style global jsx>{`
                .written-test-clock {
                    background: url('/static/writtentestclock/bg.jpg');
                    min-height: 100vh;
                    color: ${ThemeConfig.color.writtentestclockmain};
                    padding: 0 1rem;
                    background-size: 100%;
                }
                .written-test-clock-answer {
                    padding: 1rem 0;
                }
            `}</style>
    )
  }
  render () {
    const {error} = this.props
    return (
      <Layout error={error}>
        <div className='written-test-clock'>
          {this.props.children}
        </div>
        {this.renderGlobalCss()}
      </Layout>
    )
  }
}
