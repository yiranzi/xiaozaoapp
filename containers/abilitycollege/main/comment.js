import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='comment'>
        <h1>用户这样评价能力学院</h1>
        <div className='detail'>
        </div>
        <style jsx>{`
          .comment {
            margin-top: 2rem;
          }
        `}</style>
      </div>
    )
  }
}