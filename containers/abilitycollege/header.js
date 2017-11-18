import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='header'>
        <div className='invite'>
          <div className='icon'><img src='/static/img/abilitycollege/invite.png' /></div>
          <div className='text'>邀请好友</div>
        </div>
        <div className='chat'>
          <div className='icon'><img src='/static/img/abilitycollege/chat.png' /></div>
          <div className='text'>在线咨询</div>
        </div>
        <div className='card'>
          <div className='icon'><img src='/static/img/abilitycollege/card.png' /></div>
          <div className='text'>获取能力卡</div>
        </div>
        <style jsx>{`
          .header {
            font-size: 14px;
            padding: 0.5rem 0;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
          }
          .header div {
            text-align: center;
          }
          .header .icon img {
            width: 2rem;
          }
          .header .invite {
            padding-left: 2rem;
          }
          .header .card {
            padding-right: 2rem;
          }
        `}</style>
      </div>
    )
  }
}