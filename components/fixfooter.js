import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='fixFooter'>
        <div className='content'>{this.props.content}</div>
        <style jsx>{`
          .fixFooter {
            background-color: #F9F9F9;
            border-top: 1px solid #e5e5e5;
            position: fixed;
            width: 100%;
            padding: 1rem;
            box-sizing: border-box;
            z-index: 100;
            bottom: 0;
            left: 0;
          }
        `}</style>
      </div>
    )
  }
}
