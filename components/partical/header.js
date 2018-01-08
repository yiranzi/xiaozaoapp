import React from 'react'
import Head from 'next/head'

export default class Header extends React.Component {
  render () {
    return (
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0' />
        <script src='/static/js/jweixin.js' />
        <link href='/static/js/video-js.css' rel='stylesheet' />
        <script src='/static/js/video.js' />
        <script src='/static/js/videojs-contrib-hls.min.js' />
        <title>小灶能力学院</title>
      </Head>
    )
  }
}
