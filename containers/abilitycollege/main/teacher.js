import React from 'react'
import Slider from 'react-slick'

export default class extends React.Component {
  render () {
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
      <div className='teacher'>
        <h1>严选导师和顾问团队</h1>
        <div className='detail'>
          <div className='content'>
            <Slider {...settings}>
              <div className='wrap'>
                <img src='/static/img/abilitycollege/Marc.png' />
              </div>
              <div className='wrap'>
                <img src='/static/img/abilitycollege/Grace.png' />
              </div>
              <div className='wrap'>
                <img src='/static/img/abilitycollege/Laila.png' />
              </div>
              <div className='wrap'>
                <img src='/static/img/abilitycollege/Nino.png' />
              </div>
              <div className='wrap'>
                <img src='/static/img/abilitycollege/Mandy.png' />
              </div>
            </Slider>
          </div>
        </div>
        <style jsx>{`
          .teacher {
            margin-top: 2rem;
          }
          .content img {
            width: 100%;
          }
          .wrap {
            padding: 0 0.5rem 0 0;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
}