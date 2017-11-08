import React from 'react'
import Layout from '../../components/layout'
import Theme from '../../config/theme'
import {ModalPop} from '../../xz-components/ModalBox'

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

  // 成功弹窗弹窗
  // 标题
  // 内容
  // 按钮
  setModalPop (title, content, buttonTxt) {
    let defaultStyle = {
      backgroundColor: 'rgba(0,0,0, 0.5)'
    }
    let dom = <div className='out'>
      <div className='dialog'>
        <h1 className='title'>{title}</h1>
        {content}
        <div className='action'>
          <div className='ok'>{buttonTxt}</div>
        </div>
      </div>
      <style jsx>{`
          .out {
            position: absolute;
            top: 50px;
          }
          .title {
            font-weight: bold;
            font-size: 20px;
            color: ${Theme.color.content};
          }
          .dialog {
            padding: 10px 10px 30px 10px;
            margin: 10px;
            background-color: #fff;
            border-radius: 6px;
            line-height: 32px;
          }
          .dialog .action {
            padding-top: 10px;
            border-top: 1px solid #e5e5e5;
            text-align: center;
            color: ${Theme.color.content}
            font-weight: bold;
            font-size: 20px;
          }
        `}</style>
    </div>
    let prop = {
      inner: dom,
      style: defaultStyle
    }
    ModalPop({...prop})
  }

  showPop (type) {
    let localClass = <style jsx>{`
        .card-inner {
          padding: 10px 10px 10px 30px;
        }

        ul{
          font-size: 14px;
          text-align: left;
          list-style: outside;
          color: ${Theme.color.blue};
        }
        ul li {
          margin-bottom: 10px;
        }
        ul p {
          display: inline;
          color: ${Theme.color.content};
          line-height: 20px;
        }
        ul strong {
          font-weight: bold;
          color: ${Theme.color.blue};
        }
        `}</style>
    if (type === '0') {
      let content = <div className='card-inner'>
        <ul>
          <li><p>如果你想提高任意一个核心通用能力，可以选择你最需要的课程，仅需购买1张学习卡；</p></li>
          <li><p>如果你要准备实习、校招或者提高多个能力，可以选择你最需要和最感兴趣的课程，购买相应数量的学习卡，比如3张；</p></li>
          <li><p>如果你准备求职某一行业，<strong>可以选择目标行业的求职能力课和核心通用能力课</strong>，一举两得，购买相应数量的学习卡，比如7张；</p></li>
          <li><p>如果你想<strong>全面提升核心通用能力和职场关键技能</strong>，仅需 15 张学习卡，将会解锁这两类能力中的所有课程，期待你成为能力专家；</p></li>
          <li><p>如果你想<strong>学习所有课程</strong>，今天，1699=7164！可以解锁全场课程！原本 1699 元只够买 6-8 个学习卡哦，今天可以买36张！速速行动啦！</p></li>
        </ul>
        {localClass}
      </div>
      let title = '购卡小指南'
      return this.setModalPop(title, content, '知道啦')
    } else {
      let content = <div className='card-inner'>
        <ul>
          <li><p>【邀请奖励规则】11.09-11.13期间，超大邀请奖励！购买学习卡后，即可获得 5 张 9 折优惠券，你可以赠送好友或自己使用。邀请好友购买学习卡，你将立即获得 1 张课程学习卡（原价 ¥199），多邀多得！</p></li>
          <li><p>扫码添加小灶能力顾问Ted（微信：xiaozao025）,备注：“邀请好友”，让他帮你解锁邀请权吧！</p></li>
        </ul>
        {localClass}
      </div>
      let title = '邀请朋友，获取'
      return this.setModalPop(title, content, '知道啦')
    }
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
