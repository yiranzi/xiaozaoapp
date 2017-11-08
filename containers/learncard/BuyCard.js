import React from 'react'
import Layout from '../../components/layout'
import Theme from '../../config/theme'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <div className='out'>
          <div className='buy-card-page'>
            <h1 className='header'>立即获取小灶学习卡</h1>
            <div className='main-content'>
              <p>小灶学习卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求，选择购买相应的学习卡。</p>
            </div>
            <div className='button-list'>
              <span onClick={() => { this.props.setPopContent('0') }}>{`>>购卡小指南`}</span>
              <span onClick={() => { this.props.setPopContent('1') }}>{`>>邀请朋友获取更多学习卡`}></span>
            </div>
            <div className='ad-img'>
              <img src={'/static/img/learncard/buy_card_bg.jpg'} />
            </div>
            <div className='list'>{this.renderLearnCardList()}</div>
            <div className='my-card'>
              <span onClick={() => { this.goRouter() }}>{`查看我已获得的学习卡>`}</span>
            </div>
          </div>
        </div>
        <style jsx>{`
          .out {
            margin: 0;
            padding: 0;
            font-size: 0;
          }
          .buy-card-page {
            padding: 20px;
            text-align: center;
          }
          .header {
            font-size: 20px;
          }
          .main-content {
            margin-top: 10px;
            font-size: 18px;
            text-align: left;
          }
          .button-list {
            display: flex;
            justify-content: space-between;
            margin: 20px auto 20px auto;
            font-size: 14px;
          }
          .ad-img img{
            width: 100%;
          }
          .list {
            margin: 10px auto auto auto;
            padding: 10px;
          }
          .my-card {
            font-size: 14px;
            margin-top: -20px;
          }
        `}</style>
      </Layout>
    )
  }

  renderLearnCardList () {
    let arr
    arr = this.get()
    let newarr = arr.map((ele, index) => {
      return (<div className='line'>
        <img key={index} src={ele.image} onClick={() => { this.goRouter(ele.url) }} />
        <style jsx>{`
          .line {
            margin-bottom: 30px;
          }
          .line img {
            width: 100%
          }
        `}</style>
      </div>)
    })
    return newarr
  }

  get () {
    let a = [
      {
        image: '/static/img/learncard/buy_card_1.jpg',
        url: '123'
      },
      {
        image: '/static/img/learncard/buy_card_2.jpg',
        url: '123'
      },
      {
        image: '/static/img/learncard/buy_card_3.jpg',
        url: '123'
      },
      {
        image: '/static/img/learncard/buy_card_4.jpg',
        url: '123'
      },
      {
        image: '/static/img/learncard/buy_card_5.jpg',
        url: '123'
      }
    ]
    return a
  }

  goRouter (url) {
    location.href = url
  }
}
