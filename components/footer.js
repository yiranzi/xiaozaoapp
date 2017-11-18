import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='footer'>
        <div className='college'>
          <div className='icon'><img src='/static/img/abilitycollege/college.png' /></div>
          <div className='text'>能力学院</div>
        </div>
        <div className='pai'>
          <div className='icon'><img src='/static/img/abilitycollege/pai.png' /></div>
          <div className='text'>能力派</div>
        </div>
        <div className='hr'>
          <div className='icon'><img src='/static/img/abilitycollege/hr.png' /></div>
          <div className='text'>HR直聘</div>
        </div>
        <div className='me'>
          <div className='icon'><img src='/static/img/abilitycollege/me.png' /></div>
          <div className='text'>我的</div>
        </div>
        <style jsx>{`
          .footer {
            font-size: 14px;
            padding: 0.5rem 0;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            position: fixed;
            bottom: 0;
            width: 100%;
          }
          .footer div {
            text-align: center;
          }
          .footer .icon img {
            width: 2rem;
          }
          .footer .college {
            padding-left: 2rem;
          }
          .footer .me {
            padding-right: 2rem;
          }
        `}</style>
      </div>
    )
  }
}