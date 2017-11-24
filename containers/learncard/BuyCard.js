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
            <h1 className='header'>邀请好友购买，免费再得能力卡</h1>
            <p className='red-content'>成功购买能力卡后，享专属权利------邀请好友成功购买任意能力卡，马上获得 1 张课程能力卡（原价 ¥199），多邀多得！</p>
            <div className='share-button'>
              <Button onClick={() => { this.props.setPopContent('1') }}
              >立即邀请好友</Button>
            </div>
            <h1 className='header'>购买任一能力卡即可获得邀请权限</h1>
            <div className='main-content'>
              <p>小灶能力卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求，选择购买相应的能力卡。</p>
            </div>
            <div className='button-list'>
              <span onClick={() => { this.props.setPopContent('0') }}>{`>>购卡小指南`}</span>
            </div>
            <div className='ad-img'>
              <img src={'/static/img/learncard/buy_card_bg.jpg'} />
            </div>
            <div className='list'>{this.renderLearnCardList()}</div>
            <div className='my-card'>
              <span onClick={() => { this.goRouter('/ucenter/studycard') }}>{`查看我已获得的能力卡>`}</span>
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
    let dataList
    dataList = this.getLineList()
    let arr = dataList.map((ele, index) => {
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
    return arr
  }

  getLineList () {
    let list = [
      {
        image: '/static/img/learncard/buy_card_1.jpg',
        url: 'https://kdt.im/RnxZWh'
      },
      {
        image: '/static/img/learncard/buy_card_2.jpg',
        url: 'https://kdt.im/Xn4-Qh'
      },
      {
        image: '/static/img/learncard/buy_card_3.jpg',
        url: 'https://kdt.im/eU4-Qh'
      },
      {
        image: '/static/img/learncard/buy_card_4.jpg',
        url: 'https://kdt.im/ekp-Qh'
      },
      {
        image: '/static/img/learncard/buy_card_5.jpg',
        url: 'https://kdt.im/yJ3-Qh'
      }
    ]
    return list
  }

  goRouter (url) {
    location.href = url
  }
}