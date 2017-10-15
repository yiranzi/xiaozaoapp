import React from 'react'
import ThemeConfig from '../../config/theme'

export default class extends React.Component {
  render () {
    const {text, url} = this.props
    return (
      <div className='back'>
        <a href={url}>{text}</a>
        <style jsx>{`
          a {
            color: ${ThemeConfig.color.black};
          }
        `}</style>
      </div>
    )
  }
}
