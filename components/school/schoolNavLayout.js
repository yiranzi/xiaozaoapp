import React from 'react'
import Header from './header'
import { Toptips } from 'react-weui'
import weui from 'weui'

export default class Layout extends React.Component {
  renderChild () {
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
