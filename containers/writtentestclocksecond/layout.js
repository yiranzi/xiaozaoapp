<<<<<<< dae871440af7e7651c950803f0c1774b8f7df1dd
<<<<<<< b804211441c4503475c314425b207580923bc267:src/page/writtentestclocksecond/layout.js
import React from 'react'
import Layout from '../../../components/layout'
import ThemeConfig from '../../../../config/theme'
=======
import React from 'react';
import Layout from '../../components/layout';
import ThemeConfig from '../../../../config/theme';
>>>>>>> update: 调整目录结构:containers/writtentestclocksecond/layout.js
=======
import React from 'react'
import Layout from '../../components/layout'
<<<<<<< ab0da13ee4900a14dea1c2a3f925524462366913
import ThemeConfig from '../../../../config/theme'
>>>>>>> update: eslint .
=======
>>>>>>> update: 笔试打卡第二期layout

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
