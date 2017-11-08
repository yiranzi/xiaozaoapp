import React from 'react'
import classNames from 'classnames'
import Layout from '../../components/layout'
import BuyCard from '../../containers/learncard/BuyCard'
import Experience from '../../containers/learncard/experience'
import Theme from '../../config/theme'
import FixFooter from '../../xz-components/fixfooter'
import {ModalPop} from '../../xz-components/ModalBox'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 1
    }
    this.setPopContent = this.setPopContent.bind(this)
  }
  onChange (e) {
    this.setState({current: e})
  }
  render () {
    const {current} = this.state
    return (
      <Layout>
        <div className='learn-card'>
          <div className='header'>
            <div className={classNames('tab', {current: current === 1})} onClick={() => { this.onChange(1) }}>课程体验</div>
            <div className={classNames('tab', {current: current === 2})} onClick={() => { this.onChange(2) }}>小灶学习卡</div>
          </div>
          {current === 1 && <Experience />}
          {current === 2 && <BuyCard setPopContent={this.setPopContent} />}
          <div className='logo-line'>
            <img src='/static/img/footer.png' />
          </div>
          <FixFooter content={(
            <div className='footer'>
              <div className='online'><img src='/static/img/learncard/icon.png' /><span>在线咨询</span></div>
              <div className='invite' onClick={() => { this.setPopContent('1') }}>邀请好友</div>
              <div className='buy'>抢购特惠学习卡</div>
            </div>
          )} />
          <style jsx>{`
            .header {
              background: url('/static/img/learncard/headbg.png');
              display: flex;
              padding: 2rem 0.5rem 0rem 0.5rem;
            }
            .header .tab {
              color: #fff;
              background-color: #1a59c0;
              text-align: center;
              font-weight: bold;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              border-top-left-radius: 0.25rem;
              border-top-right-radius: 0.25rem;
              flex: 1;
            }
            .header .current {
              color: #218ee9;
              background-color: #fff;
            }
            .header .tab + .tab{
              margin-left: 0.5rem;
            }
            .logo-line {
              margin-bottom: 5rem;
            }
            .logo-line img {
              width: 100%;
            }
            .footer {
              display: flex;
              justify-content: space-around;
              font-size: 14px;
            }
            .footer .online,
            .footer .invite {
              text-align: center;
              color: #218ee9;
              border: 1px solid #218ee9;
              border-radius: 0.25rem;
              padding: 0.25rem;
              flex: 1;
            }
            .footer .online img,
            .footer .online span {
              width: 1rem;
              vertical-align: middle;
            }
            .footer .online img {
              margin-right: 0.5rem;
            }
            .footer .invite {
              margin-left: 0.5rem;
              margin-right: 0.5rem;
            }
            .footer .buy {
              text-align: center;
              background-color: red;
              color: #fff;
              border-radius: 0.25rem;
              padding: 0.25rem;
              flex: 1;
            }
          `}</style>
        </div>
      </Layout>
    )
  }

  //
  setPopContent (type) {
    let localClass = <style jsx>{`
        .card-inner {
          padding: 0px 10px 5px 30px;
        }
        ul{
          font-size: 14px;
          text-align: left;
          list-style: outside;
          color: ${Theme.color.blue};
          line-height: 22px;
        }
        ul li {
          margin-bottom: 5px;
        }
        ul p {
          display: inline;
          color: ${Theme.color.content};
        }
        ul strong {
          font-weight: bold;
          color: ${Theme.color.blue};
        }
        .qrcode {
          width: 50%;
          margin-bottom: 5px;
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
      let content = <div >
        <div className='card-inner'>
          <ul>
            <li><p>【邀请奖励规则】11.09-11.13期间，超大邀请奖励！购买学习卡后，即可获得 5 张 9 折优惠券，你可以赠送好友或自己使用。邀请好友购买学习卡，你将立即获得 1 张课程学习卡（原价 ¥199），多邀多得！</p></li>
            <li><p>扫码添加小灶能力顾问Ted（微信：xiaozao025）,备注：“邀请好友”，让他帮你解锁邀请权吧！</p></li>
          </ul>
          {localClass}
        </div>
        <img className='qrcode' src='/static/img/learncard/tedCode.jpeg' />
      </div>
      let title = '邀请朋友，获取更多学习卡'
      return this.setModalPop(title, content, '知道啦')
    }
  }

  // 调用弹框
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
            {/*position: absolute;*/}
            {/*top: 10px;*/}
            {/*left: 0px;*/}
          }
          .title {
            font-weight: bold;
            font-size: 20px;
            color: ${Theme.color.content};
          }
          .dialog {
            padding: 10px 10px 10px 10px;
            margin: 10px;
            background-color: #fff;
            border-radius: 6px;
            line-height: 32px;
          }
          .dialog .action {
            padding-top: 5px;
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
}
