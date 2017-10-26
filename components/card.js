import React from 'react'
import ThemeConfig from '../config/theme'

export default class extends React.Component {
  render () {
    const { title, content } = this.props
    return (
      <div className='card'>
        {title && <div className='title'>{title}</div>}
        {content && <div className='content'>{content}</div>}
        <style jsx>{`
          .card {
            background-color: ${ThemeConfig.color.gray};
            box-shadow: 0 1px 10px rgba(0,0,0,.2);
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 6px;
            line-height: 32px;
          }
          .card .title {
            font-size: ${ThemeConfig.size.normal};
            font-weight: bold;
            color: #242223;
          }
          .card .content {
            color: #646464;
            line-height: 24px;
          }
        `}</style>
      </div>
    )
  }
}
