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
            font-size: 1rem;
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
            font-size: 1.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .card .header .group {
            font-size: 14px;
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
            font-size: 14px;
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
            padding-left: 18px;;
            font-size: 14px;
          }
          .card .sub-content .publish-date::before {
            content: '';
            width: 14px;
            height: 14px;
            border-radius: 1rem;
            background-color: red;
            position: absolute;
            left: 0;
            top: 3px;
          }
        `}</style>
      </div>
    )
  }
  openModal (item) {
    Modal({children: <ModalContent data={item} />})
  }
  render () {
    const {exchangeDetail} = this.props
    const {hot, _new} = exchangeDetail
    return (
      <div className='course'>
        <div className='hot'>
          <h1>最热课程</h1>
          <div className='detail'>
            <div className='content'>{this.renderContent(hot, '#241d66')}</div>
          </div>
        </div>
        <div className='new'>
          <h1>最新课程</h1>
          <div className='detail'>
            <div className='content'>{this.renderContent(_new, '#241d66')}</div>
          </div>
        </div>
        <style jsx>{`
          .course {
            margin-top: 3rem;
          }
          .new {
            margin-top: 3rem;
          }
          .detail {
            padding-left: 1rem;
            margin-top: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .course .content .slick-list {
            padding: 0px !important;
          }
        `}</style>
      </div>
    )
  }
}
