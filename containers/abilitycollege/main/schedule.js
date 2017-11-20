import React from 'react'
import Button from '../../../xz-components/button'
import {Modal} from '../../../xz-components/modal'
import ModalContent from './modal'
import Card from './card'

export default class extends React.Component {
  renderContent (detail, bg) {
    return <Card detail={detail} bg={bg} showTitle />
  }
  openModal (item) {
    Modal({children: <ModalContent data={item} />})
  }
  render () {
    const {exchangeDetail} = this.props
    const {currency, work, job} = exchangeDetail
    return (
      <div className='schedule'>
        <h1>小灶能力学院课程体系</h1>
        <div className='detail'>
          <div className='currency'>{this.renderContent(currency, '#241d66')}</div>
          <div className='work'>{this.renderContent(work, '#4873b3')}</div>
          <div className='job'>{this.renderContent(job, '#465978')}</div>
          <div className='tips'>*以上课程均可使用小灶能力卡兑换</div>
          <div className='button-group'>
            <Button style={{backgroundColor: 'red', fontSize: '16px'}}>
              <img src='/static/img/abilitycollege/fire.png' />能力卡火热拼团中 <strong style={{marginLeft: '0.5rem'}}>立即获取</strong>
            </Button>
          </div>
        </div>
        <style jsx>{`
          .schedule {
            margin-top: 3rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .schedule .tips {
            margin-top: 3rem;
            text-align: center;
          }
          .schedule .work,
          .schedule .job {
            margin-top: 3rem;
          }
          .schedule .button-group {
            padding: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .schedule .content .slick-list {
            padding: 0px !important;
          }
          .schedule button {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .schedule button img {
            width: 2rem;
            margin-right: 1rem;
          }
        `}</style>
      </div>
    )
  }
}