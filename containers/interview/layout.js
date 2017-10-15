import React from 'react'
import { Toptips } from 'react-weui'
import Layout from '../../components/layout'
import ThemeConfig from '../../config/theme'
import Loading from '../../components/loading'

export default class extends React.Component {
  renderChildren () {
    const { isRender, error } = this.props
    if (isRender) {
      return <Loading />
    } else if (error) {
      const show = true
      return <Toptips type='warn' show={show} >{error}</Toptips>
    } else {
      return (
        <div className='interview'>
          {this.props.children}
          <style jsx>{`
          .interview {
            min-height: 100vh;
            padding: 1rem;
            box-sizing: border-box;
            background-color: ${ThemeConfig.color.gray};
          }
        `}</style>
        </div>
      )
    }
  }
  render () {
    return (
      <Layout>
        {this.renderChildren()}
        <style global jsx>{`
          body {
            font-size: 14px;
          }
          .interview .weui-btn_primary,
          .interview .weui-btn_primary:not(.weui-btn_disabled):active {
            color: ${ThemeConfig.color.white};
            background-color: ${ThemeConfig.color.yellow};
          }
          .interview .disabled .weui-btn_primary,
          .interview .disabled .weui-btn_primary:not(.weui-btn_disabled):active{
            background: ${ThemeConfig.color.gray};
            color: rgba(0,0,0,0.2);
          }
        `}</style>
      </Layout>
    )
  }
}
