import React from 'react'
import Slider from 'react-slick'
import Button from '../../../xz-components/button'
import {Modal} from '../../../xz-components/modal'
import ModalContent from './modal'

export default class extends React.Component {
  renderContent (detail, bg) {
    if (!detail) return null
    let settings = {
      arrows: false,
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '10px',
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500
    }
    return (
      <div className='wrapper'>
        <div className='title'>{detail.title}</div>
        <div className='content'>
          <Slider {...settings}>
            {detail.content.map((item, index) => {
              return (
                <div key={index} className='card' onClick={() => this.openModal(item)}>
                  <div className='header' style={{backgroundColor: bg}}>
                    <div className='sub-title'>{item.subTitle}</div>
                    <div className='group'>
                      <div className='need-card'><img src='/static/img/abilitycollege/card-intro.png' />{item.cardCount}张能力卡兑换</div>
                      <div className='price'>
                        <div className='before'>￥{item.onePrice}</div>
                        <div className='now'>￥{item.twoPrice}</div>
                      </div>
                    </div>
                  </div>
                  <div className='sub-content'>
                    <div className='main'>核心内容：{item.oneContent}</div>
                    <div className='get'>你的收获：{item.twoContent}</div>
                    <div className='publish-date'>课程预计上线时间：{item.publishDate}</div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
        <style jsx>{`
          .wrapper {
            max-width: 640px;
            overflow-x: hidden;
          }
          .title {
            font-size: 18px;
            margin: 0.5rem 1rem 1rem 1rem;
          }
          .card {
            padding: 0 0.5rem;
            box-sizing: border-box;
            border-radius: 10px;
            box-shadow: 0 8px 10px -9px #3c4454
          }
          /* header 样式 */
          .card .header {
            color: #fff;
            padding: 0.5rem 1rem;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .card .header .sub-title {
            font-size: 24px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .card .header .group {
            margin-top: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .card .header .group .need-card {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .card .header .group .need-card img {
            margin-right: 0.5rem;
          }
          .card .header .group .price {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .card .header .group .price .before {
            text-decoration: line-through;
          }
          .card .header .group .price .now {
            font-size: 1.25rem;
            margin-left: 0.5rem;
          }
          /* ------------ */
          /* content 样式 */
          .card .sub-content {
            padding: 0 1rem 1rem 1rem;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #fff;
          }
          .card .sub-content .main,
          .card .sub-content .get {
            padding-top: 1rem;
            overflow:hidden; 
            text-overflow:ellipsis;
            display:-webkit-box; 
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
          }
          .card .sub-content .publish-date {
            margin-top: 1rem;
            position: relative;
            padding-left: 1.5rem;
          }
          .card .sub-content .publish-date::before {
            content: '';
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
            background-color: red;
            position: absolute;
            left: 0;
            top: 0.3rem
          }
        `}</style>
      </div>
    )
  }
  openModal (item) {
    console.log(item)
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