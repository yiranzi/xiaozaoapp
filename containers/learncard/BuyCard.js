import React from 'react'
import Layout from '../../components/layout'
import ThemeConfig from '../../config/theme'
import Button from '../../xz-components/button'
import {Alert} from '../../xz-components/alert'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      studyCard: null
    }
    this.paddingIsBuy = this.paddingIsBuy.bind(this)
  }

  componentDidMount = async function () {
    try {
      const studyCard = await AxiosUtil.get('/api/vip/getStudyCard')
      this.setState({
        studyCard: studyCard
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  render () {
    return (
      <Layout>
        <div className='out'>
          <div className='buy-card-page'>
            <h1 className='header'>邀请好友购买，免费再得能力卡</h1>
            <p className='red-content'>11.09 -11.13 期间，成功购买能力卡后，享专属权利------邀请好友成功购买任意能力卡，马上获得 1 张课程能力卡（原价 ¥199），多邀多得！</p>
            <p className='main-content'>*好友购买时在推荐人一栏填写你的手机号即可。</p>
            <div className='share-button'>
              <Button text={'立即邀请好友'} color={'white'} bg={ThemeConfig.color.blue} onClick={ () => {this.props.setPopContent('1')}} />
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

  paddingIsBuy () {
    const {studyCard} = this.state
    if (studyCard && studyCard.buyCount > 0) {
      this.props.setPopContent('1')
    } else {
      Alert({content: '购买任一能力卡，即可获得邀请权限哦~能力卡限时特惠，低至2折，购买后即可邀请好友，多邀多得！', okText: '知道了'})
    }
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
        url: 'https://h5.youzan.com/v2/goods/3nizxrw2xpaq9?showsku=true'
      },
      {
        image: '/static/img/learncard/buy_card_2.jpg',
        url: 'https://h5.youzan.com/v2/goods/3nizxrw2xpaq9?showsku=true'
      },
      {
        image: '/static/img/learncard/buy_card_3.jpg',
        url: 'https://h5.youzan.com/v2/goods/3nizxrw2xpaq9?showsku=true'
      },
      {
        image: '/static/img/learncard/buy_card_4.jpg',
        url: 'https://h5.youzan.com/v2/goods/3nizxrw2xpaq9?showsku=true'
      },
      {
        image: '/static/img/learncard/buy_card_5.jpg',
        url: 'https://h5.youzan.com/v2/goods/3nizxrw2xpaq9?showsku=true'
      }
    ]
    return a
  }

  goRouter (url) {
    location.href = url
  }
}
