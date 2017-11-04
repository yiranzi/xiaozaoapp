import React from 'react'

export default class MyBack extends React.Component {
  render () {
    const {direct, text} = this.props
    return (
      <div>
        {direct === 'left' && <span className='left'>{text}</span>}
        {direct === 'right' && <span className='right'>{text}</span>}
        <style jsx>{`
          span {
            border: 1px solid #117ee9;
            padding: 1px 5px 1px 12px;
            border-radius: 1rem;
            display: inline-block;
            position: relative;
            font-size: 14px;
            color: #117ee9;
          }
          span.left::before {
            content: '◂';
            position: absolute;
            left: 4px;
            top: 0;
          }
          span.right {
            padding: 1px 12px 1px 5px;
          }
          span.right::before {
            content: '▸';
            position: absolute;
            right: 4px;
            top: 0;
          }
        `}</style>
      </div>
    )
  }
}
