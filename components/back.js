import React from 'react'

export default class MyBack extends React.Component {
  render () {
    const {direct, text} = this.props
    return (
      <div>
        {direct === 'left' && <span className='left'>◂{text}</span>}
        {direct === 'right' && <span className='right'>{text}▸</span>}
        <style jsx>{`
          span {
            border: 1px solid #117ee9;
            padding: 0.1rem 0.5rem;
            border-radius: 1rem;
            display: inline-block;
          }
        `}</style>
      </div>
    )
  }
}
