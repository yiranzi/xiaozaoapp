import React from 'react'
import Layout from '../../components/layout'
import ThemeConfig from '../../config/theme'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <div className='interview'>
          {this.props.children}
        </div>
        <style jsx>{`
          .interview {
            min-height: 100vh;
            padding: 1rem;
            box-sizing: border-box;
            background-color: ${ThemeConfig.color.gray};
          }
        `}</style>
        <style global jsx>{`
          .interview .weui-btn_primary,
          .interview .weui-btn_primary:not(.weui-btn_disabled):active {
            color: ${ThemeConfig.color.white};
            background-color: ${ThemeConfig.color.yellow};
          }

        `}</style>
      </Layout>
    )
  }
}
