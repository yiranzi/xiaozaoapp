import React from 'react'
import Slider from 'react-slick'
import {Modal} from '../../../xz-components/modal'
import ModalContent from './modal'

export default class extends React.Component {
  openModal (item) {
    Modal({children: <ModalContent data={item} />})
  }
  renderItem (detail, bg, showTitle) {
    return (
      <div className='card' onClick={() => this.openModal(detail)}>
        <div className='header' style={{backgroundColor: bg}}>
          <div className='sub-title'>{detail.subTitle}</div>
          <div className='group'>
            <div className='need-card'><img src='/static/img/abilitycollege/card-intro.png' />{detail.cardCount}张能力卡兑换</div>
            <div className='price'>
              <div className='before'>￥{detail.onePrice}</div>
              <div className='now'>￥{detail.twoPrice}</div>
            </div>
          </div>
        </div>
        <div className='sub-content'>
          <div className='main'>核心内容：{detail.oneContent}</div>
          <div className='get'>你的收获：{detail.twoContent}</div>
          <div className='publish-date'>课程预计上线时间：{detail.publishDate}</div>
        </div>
      </div>
    )
  }
  renderSlider (detail, bg, showTitle) {
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
    )
  }
  render () {
    const {detail, bg, showTitle} = this.props
    if (!detail) return null
    return (
      <div className='wrapper'>
        {showTitle && <div className='title'>{detail.title}</div>}
        <div className='content'>
          {Array.isArray(detail.content) ? this.renderSlider(detail, bg, showTitle) : this.renderItem(detail, bg)}
        </div>
        <style global jsx>{`
          .wrapper {
            max-width: 640px;
            overflow-x: hidden;
          }
          .wrapper .title {
            font-size: 1rem;
            margin: 0.5rem 1rem 1rem 1.5rem;
          }
          .wrapper .card {
            padding: 0 0.5rem;
            box-sizing: border-box;
            border-radius: 10px;
          }
          /* header 样式 */
          .wrapper .card .header {
            color: #fff;
            padding: 0.5rem 1rem;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .wrapper .card .header .sub-title {
            width: 80%;
            font-family: 'SimSun';
            font-size: 1.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .wrapper .card .header .group {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .wrapper .card .header .group .need-card {
            font-size: 0.85rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .wrapper .card .header .group .need-card img {
            margin-right: 0.5rem;
            width: 1.5rem;
          }
          .wrapper .card .header .group .price {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .wrapper .card .header .group .price .before {
            font-size: 0.85rem;
            text-decoration: line-through;
          }
          .wrapper .card .header .group .price .now {
            margin-left: 0.5rem;
          }
          /* ------------ */
          /* content 样式 */
          .wrapper .card .sub-content {
            background: url('/static/img/abilitycollege/shadow.png');
            background-size: 100% 100%;
            font-size: 14px;
            color: #241d66;
            padding: 0 1rem 1rem 1rem;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          .wrapper .card .sub-content .main,
          .wrapper .card .sub-content .get {
            font-size: 0.75rem;
            line-height: 150%;
            padding-top: 0.5rem;
            overflow:hidden; 
            text-overflow:ellipsis;
            display:-webkit-box; 
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
          }
          .wrapper .card .sub-content .publish-date {
            margin-top: 0.75rem;
            font-size: 0.75rem;
            position: relative;
            padding-left: 18px;;
            font-size: 14px;
          }
          .wrapper .card .sub-content .publish-date::before {
            content: '';
            width: 14px;
            height: 14px;
            border-radius: 1rem;
            background-color: #c41616;
            position: absolute;
            left: 0;
            top: 3px;
          }
        `}</style>
      </div>
    )
  }
}
