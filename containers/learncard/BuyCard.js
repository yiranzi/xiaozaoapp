import React from 'react'
import Layout from '../../components/layout'
import Button from '../../xz-components/button'
import Theme from '../../config/theme'
import {ModalPop} from '../../xz-components/ModalBox'
import {Alert} from '../../xz-components/alert'

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
              <span onClick={() => { this.showPop('0') }}>{`>>购卡小指南`}</span>
              <span onClick={() => { this.showPop('1') }}>{`>>邀请朋友获取更多学习卡`}></span>
            </div>
            <div className='ad-img'>
              <img src={'/static/img/apollo/share-bg.png'} />
            </div>
            <div className='list'>{this.renderLearnCardList()}</div>
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
        `}</style>
      </Layout>
    )
  }

  showPop (type) {
    let content
    if (type === '0') {
      content = <div className='card-inner'>
        <h1>购卡小指南</h1>
        <ul>
          <li><p>据兴趣和需求，选择购小灶学习卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求，选择购小灶学习卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求，选择购小灶学习卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求，选择购</p></li>
          <li><p>伙伴可以根据兴趣和需求，选择购小小灶学习卡可以兑换2018年小灶能力学院的课程，小</p></li>
          <li><p>12灶学习卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求3123</p></li>
        </ul>
        <style jsx>{`
        .card-inner {
          padding: 10px;
        }
        .title {
          font-size: 20px;
        }
        ul{
          text-align: left;
          list-style: inside;
          color: blue;
          padding: 10px;
        }
        ul li {
          border: 1px solid black;
          padding: 0px;
        }
        ul p {
          display: inline;
          margin-left: 10px;
        }
        `}</style>
      </div>
    } else {

    }
    Alert({content: content, okText: '知道啦'})
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
        image: '/static/img/apollo/share-bg.png',
        url: '123'
      },
      {
        image: '/static/img/apollo/share-bg.png',
        url: '456'
      }
    ]
    return a
  }

  goRouter (url) {
    location.href = url
  }
}
