import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='teacher'>
        <h1>严选导师和顾问团队</h1>
        <div className='detail'>
          <div className='content'>
            <img src='/static/img/abilitycollege/Marc.png' />
          </div>
        </div>
        <style jsx>{`
          .teacher {
            margin-top: 2rem;
          }
          .content img {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}