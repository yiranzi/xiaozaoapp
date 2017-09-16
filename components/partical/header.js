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
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:components/partical/header.js
            content='width=device-width,initial-scale=1.0,user-scalable=no'
=======
            content='width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
>>>>>>> update: eslinit code style:src/components/partical/header.js
          />
          <title>小灶求职</title>
        </Head>
      </div>
    )
  }
}
