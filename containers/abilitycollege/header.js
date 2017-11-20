import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='header'>
        <div className='item'>
          <div className='icon'><img src='/static/img/abilitycollege/invite.png' /></div>
          <div className='text'>邀请好友</div>
        </div>
        <div className='item'>
          <div className='icon'><img src='/static/img/abilitycollege/chat.png' /></div>
          <div className='text'>在线咨询</div>
        </div>
        <div className='item'>
          <div className='icon'><img src='/static/img/abilitycollege/card.png' /></div>
          <div className='text'>获取能力卡</div>
        </div>
        <style jsx>{`
          .header {
            font-size: 14px;
            background-color: #fff;
            text-align: center;
            display: flex;
            justify-content: space-between;
          }
          .header .item {
            padding: 0.5rem 0;
            flex: 1;
          }
          .header .item:hover {
            background-color: #f0f2f6;
          }
          .header .icon img {
            width: 2rem;
          }
        `}</style>
      </div>
    )
  }
}