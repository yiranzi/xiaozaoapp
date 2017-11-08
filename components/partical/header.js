import React from 'react'
import Head from 'next/head'

export default class Header extends React.Component {
  render () {
    return (
      <div>
        <Head>
          <meta charSet='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, user-scalable=0'
          />
          <title>小灶能力学院</title>
        </Head>
      </div>
    )
  }
}
