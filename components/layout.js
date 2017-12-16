import React from 'react'
import Header from './partical/header'
import ToolsUtil from '../util/tools'
import {Toptips} from 'react-weui'
import weui from 'weui'
import rweui from 'react-weui/build/dist/react-weui.css'
import DefaultCss from '../config/defaultCss'

export default class Layout extends React.Component {
  renderChild () {
    const {error} = this.props
    if (error) {
      return (
        <div className='main'>
          <Toptips type='warn' show>{error.message}</Toptips>
        </div>
      )
    } else {
      return <div className='main'>{this.props.children}</div>
    }
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
        .main {
          max-width: 640px;
          margin: auto;
          overflow-x: hidden;
        }
      `}</style>
    )
  }

  render () {
    return (
      <div {...this.props}>
        {ToolsUtil.isProd() && <script src='/static/js/retcode.js' />}
        {ToolsUtil.isProd() && <script async src='https://www.googletagmanager.com/gtag/js?id=UA-110942316-1' />}
        <Header />
        <style dangerouslySetInnerHTML={{__html: weui}} />
        <style dangerouslySetInnerHTML={{__html: rweui}} />
        <DefaultCss />
        {this.renderChild()}
        {this.renderGlobalCss()}
        <script src='/static/js/jweixin.js' />
        {ToolsUtil.isProd() && <script src='/static/js/baidutongji.js' />}
        <link href='/static/js/video-js.css' rel='stylesheet' />
        <script src='/static/js/video.js' />
        <script src='/static/js/videojs-contrib-hls.min.js' />
        <style global jsx>{`
          body {
            font-size: 12pt;
            font-family: PingFang SC,Helvetica Neue,Helvetica,Arial,Hiragino Sans GB,Microsoft Yahei,sans-serif !important;
          }
        `}</style>
      </div>
    )
  }
}
