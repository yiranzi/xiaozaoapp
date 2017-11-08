import React from 'react'
import Layout from '../../components/layout'
import ThemeConfig from '../../config/theme'
import Button from '../../xz-components/button'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <div className='out'>
          <div className='buy-card-page'>
            <h1 className='header'>邀请好友购买，免费再得学习卡</h1>
            <p className='red-content'>1.09 -11.13 期间，成功购买学习卡后，享专属权利------邀请好友成功购买任意学习卡，马上获得 1 张课程学习卡（原价 ¥199），多邀多得！</p>
            <p className='main-content'>*好友购买时在推荐人一栏填写你的手机号即可。</p>
            <div className='share-button'>
              <Button half text={'立即邀请好友'} color={'white'} bg={ThemeConfig.color.blue} onClick={() => { this.props.setPopContent('1') }} />
            </div>
            <h1 className='header'>低至3折，购买任一学习卡即可<br />获得邀请权限</h1>
            <div className='main-content'>
              <p>小灶学习卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求，选择购买相应的学习卡。</p>
            </div>
            <div className='button-list'>
              <span onClick={() => { this.props.setPopContent('0') }}>{`>>购卡小指南`}</span>
            </div>
            <div className='ad-img'>
              <img src={'/static/img/learncard/buy_card_bg.jpg'} />
            </div>
            <div className='list'>{this.renderLearnCardList()}</div>
            <div className='my-card'>
              <span onClick={() => { this.goRouter('/ucenter/studycard') }}>{`查看我已获得的学习卡>`}</span>
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
            font-size: 22px;
          }
          .red-content {
            color: red;
            margin-top: 15px;
            font-size: 16px;
            text-align: left;
          }
          .main-content {
            margin-top: 10px;
            font-size: 16px;
            text-align: left;
          }
          .share-button {
            margin: 20px auto 30px auto;
          }
          .button-list {
            display: flex;
            justify-content: space-between;
            margin: 5px auto 10px auto;
            font-size: 16px;
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
      return (<div key={index} className='line'>
        <img src={ele.image} onClick={() => { this.goRouter(ele.url) }} />
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
