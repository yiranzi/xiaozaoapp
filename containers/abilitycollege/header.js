import React from 'react'
import ClassNames from 'classnames'
import { Confirm } from '../../xz-components/confirm'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      invite: false,
      chat: false,
      get: false
    }
  }
  share () {
    const {coupon} = this.props
    if (coupon.length > 0) {
      location.href = '/abilitycollege/coupon'
    } else {
      Confirm({
        content: '没有优惠券',
        okText: '去购买',
        cancelText: '不去了',
        ok: () => { location.href = '/payment/buygether' }
      })
    }
  }
  render () {
    return (
      <div className='header'>
        <div
          className={ClassNames('item', {'current': this.state.invite})}
          onTouchStart={() => { this.setState({invite: true}) }}
          onTouchEnd={() => { this.setState({invite: false}, () => { this.share() }) }}
        >
          <div className='icon'><img src='/static/img/abilitycollege/invite.png' /></div>
          <div className='text'>邀请好友</div>
        </div>
        <div
          className={ClassNames('item', {'current': this.state.chat})}
          onTouchStart={() => { this.setState({chat: true}) }}
          onTouchEnd={() => { this.setState({chat: false}, () => { location.href = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=63917&agentid=ed8f6b7c96fc339a6fcd6f8985624f82' }) }}
        >
          <div className='icon'><img src='/static/img/abilitycollege/chat.png' /></div>
          <div className='text'>在线咨询</div>
        </div>
        <div
          className={ClassNames('item', {'current': this.state.get})}
          onTouchStart={() => { this.setState({get: true}) }}
          onTouchEnd={() => { this.setState({get: false}, () => { location.href = '/payment/buygether' }) }}
        >
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
            padding: 5px 0;
            flex: 1;
          }
          .header .current {
            background-color: #f0f2f6;
          }
          .header .icon img {
            width: 2rem;
          }
          .header .text {
            font-size: 0.85rem;
          }
        `}</style>
      </div>
    )
  }
}