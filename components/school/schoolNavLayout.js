<<<<<<< 7561a7441aeacdb8c2ba06ad57cc673154a71b81
import React from 'react'
import Header from './header'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:components/school/schoolNavLayout.js
import { Toptips } from 'react-weui'
=======
import {Toptips} from 'react-weui'
>>>>>>> update: eslinit code style:src/components/school/schoolNavLayout.js
=======
import {Toptips} from 'react-weui'
>>>>>>> update: project constructor
import weui from 'weui'
=======
import React from 'react';
import Header from './partical/header';
import {Toptips} from 'react-weui';
import weui from 'weui';
import styles from '../scss/global.scss';
>>>>>>> style: add scss loader

export default class Layout extends React.Component {
  renderChild () {
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:components/school/schoolNavLayout.js
    const { error } = this.props
    if (error) {
      return (
        <div className='main'>
          <Toptips type='warn' show>
            {error.message}
          </Toptips>
        </div>
      )
    } else {
      return (
        <div className='main'>
          {this.props.children}
        </div>
      )
=======
=======
>>>>>>> update: project constructor
    const {error} = this.props
    if (error) {
      return <div className='main'><Toptips type='warn' show>{error.message}</Toptips></div>
    } else {
      return <div className='main'>{this.props.children}</div>
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
>>>>>>> update: eslinit code style:src/components/school/schoolNavLayout.js
=======
>>>>>>> update: project constructor
    }
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
        .main {
          max-width: 640px;
          margin: auto;
        }
        .my-text-rowsingle {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    )
  }

  render () {
    return (
      <div>
        <Header />
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
        <style dangerouslySetInnerHTML={{ __html: weui }} />
=======
        <style dangerouslySetInnerHTML={{__html: weui}} />
<<<<<<< 7561a7441aeacdb8c2ba06ad57cc673154a71b81
>>>>>>> update: project constructor
=======
        <style dangerouslySetInnerHTML={{__html: styles}} />
>>>>>>> style: add scss loader
        {this.renderChild()}
        {this.renderGlobalCss()}
      </div>
    )
  }
}
