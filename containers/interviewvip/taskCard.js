import React from 'react'
import ThemeConfig from '../../config/theme'

export default class extends React.Component {
  render () {
    return (
      <div className='card'>
        {this.props.children}
        <style jsx>{`
          .card {
            background-color: ${ThemeConfig.color.gray};
            box-shadow: 0 1px 10px rgba(0,0,0,.2);
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 18px;
            line-height: 32px;
            width: 100%
          }
          .card .title {
            text-align: center;
            font-size: ${ThemeConfig.size.normal};
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }
}
