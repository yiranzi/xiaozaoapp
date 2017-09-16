import React from 'react'
import Header from './header'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:components/school/schoolNavLayout.js
import { Toptips } from 'react-weui'
=======
import {Toptips} from 'react-weui'
>>>>>>> update: eslinit code style:src/components/school/schoolNavLayout.js
import weui from 'weui'

export default class Layout extends React.Component {
  renderChild () {
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
    const {error} = this.props
    if (error) {
      return <div className='main'><Toptips type='warn' show>{error.message}</Toptips></div>
    } else {
      return <div className='main'>{this.props.children}</div>
>>>>>>> update: eslinit code style:src/components/school/schoolNavLayout.js
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
        <style dangerouslySetInnerHTML={{ __html: weui }} />
        {this.renderChild()}
        {this.renderGlobalCss()}
      </div>
    )
  }
}
