import React from 'react'
import classNames from 'classnames'
import Layout from '../../components/layout'
import BuyCard from '../../containers/learncard/BuyCard'
import Experience from '../../containers/learncard/experience'
import Theme from '../../config/theme'
import FixFooter from '../../xz-components/fixfooter'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import ToolsUtil from '../../util/tools'
import WxShare from '../../xz-components/wxshare'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: '2', // 默认tab为2
      userInfo: {},
      canRender: false
    }
    this.setPopContent = this.setPopContent.bind(this)
  }
  componentDidMount = async function () {
    const tabKey = ToolsUtil.getQueryString('tab')
    if (tabKey) {
      this.setState({
        current: tabKey
      })
    }
    // 设置完tab后 可以渲染。
    this.setState({
      canRender: true
    })
    let userInfo = await AxiosUtil.get('/api/user')
    this.setState({
      userInfo: userInfo
    })
  }

  onChange (tabIndex) {
    this.setState({current: tabIndex})
  }

  // 设置分享
  setWxShare () {
    let {userInfo} = this.state
    let prop
    prop = {
      desc: '2018课表全新上线！三大类能力，26个专题课，报名后再邀请好友购买，你再免费获得能力卡！',
      title: '灶邀请你一起成为能力派！能力卡特惠低至2折，兑换2018能力课！',
      link: 'http://wx.xiaozao.org/learncard/redirect',
      imgUrl: 'http://wx.xiaozao.org/static/img/learncard/shareLogo.jpg',
      success: function () {
        AxiosUtil.get('/api/interview/getWXConfig?url=onLearnCardDetail')
      }
    }
    if (userInfo && userInfo.nickname) {
      prop.title = `${userInfo.nickname}邀请你一起成为能力派！能力卡特惠低至2折，兑换2018能力课！`
    }
    return (<WxShare {...prop} />)
  }

  // 点击按钮 购卡小指南
  setBuyModalContent () {
    let content = <div className='card-inner'>
      <ul>
        <li><p>如果你想提高任意一个核心通用能力，可以选择你最需要的课程，仅需购买1张学习卡；</p></li>
        <li><p>如果你要准备实习、校招或者提高多个能力，可以选择你最需要和最感兴趣的课程，购买相应数量的学习卡，比如3张；</p></li>
        <li><p>如果你准备求职某一行业，
          <strong>可以选择目标行业的求职能力课和核心通用能力课</strong>
          ，一举两得，购买相应数量的学习卡，比如7张；</p></li>
        <li><p>如果你想
          <strong>全面提升核心通用能力和职场关键技能</strong>
          ，仅需 15 张学习卡，将会解锁这两类能力中的所有课程，期待你成为能力专家；</p></li>
        <li><p>如果你想
          <strong>学习所有课程</strong>
          ，今天，1439=7164！可以解锁全场课程！原本 1439 元只够买 6-8 个学习卡哦，今天可以买36张！速速行动啦！</p></li>
      </ul>
      <style jsx>{`
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
      `}</style>
    </div>
    let title = '购卡小指南'
    return this.setBuyModal(title, content, '知道啦')
  }

  // 调用弹框
  setBuyModal (title, content, buttonTxt) {
    let defaultStyle = {
      backgroundColor: 'rgba(0,0,0, 0.5)'
    }
    let dom = <div>
      <div className='dialog'>
        <h1 className='title'>{title}</h1>
        {content}
        <div className='action'>
          <div>{buttonTxt}</div>
        </div>
      </div>
      <style jsx>{`
        .dialog {
          padding: 10px 10px 10px 10px;
          margin: 10px;
          background-color: #fff;
          border-radius: 6px;
          line-height: 32px;
        }
        .title {
          font-weight: bold;
          font-size: 20px;
          color: ${Theme.color.content};
        }
        .action {
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
      innerDiv: dom,
      style: defaultStyle
    }
    ModalBoxPopFunc({...prop})
  }

  setShareModal (type) {
    let defaultStyle = {
      backgroundColor: 'rgba(0, 10, 49, 0.5)'
    }
    let imgStyle = {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '150px',
      height: '300px'
    }
    let innerContent = {
      position: 'absolute',
      top: '288px',
      right: '10px'
    }
    let dom = <div>
      <img style={imgStyle} src='/static/img/apollo/shareArrow.png' />
      <p style={innerContent}>点击右上角发给好友<br />再得能力卡！！</p>
    </div>
    let prop = {
      innerDiv: dom,
      style: defaultStyle
    }
    ModalBoxPopFunc({...prop})
  }

  setPopContent (type) {
    if (type === '0') {
      this.setBuyModalContent()
    } else if (type === '1') {
      this.setShareModal()
    }
  }

  render () {
    const {current} = this.state
    return (
      <Layout>
        {this.state.canRender && <div className='learn-card'>
          {this.setWxShare()}
          <div className='header'>
            <div className={classNames('tab', {current: current === '2'})}
              onClick={() => { this.onChange('2') }}>小灶能力卡</div>
            <div className={classNames('tab', {current: current === '1'})}
              onClick={() => { this.onChange('1') }}>{`2018课表&课程体验`}</div>
          </div>
          {current === '2' && <BuyCard setPopContent={this.setPopContent} />}
          {current === '1' && <Experience />}
          <div className='logo-line'>
            <img src='/static/img/footer.png' />
          </div>
          <FixFooter>
            <div className='footer'>
              <div className='online'>
                <a href='https://shimo.im/doc/LQWZzIKVVkIeLMXl?r=L5KPGD/'>
                  <img src='/static/img/learncard/icon.png' /><span>在线咨询</span>
                </a>
              </div>
              <div className='invite'
                onClick={() => { this.setPopContent('1') }}>邀请好友</div>
              <div className='buy'><a href='https://kdt.im/eDS-Qh'>抢购特惠能力卡</a></div>
            </div>
          </FixFooter>
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
            .footer a {
              display: inline-block;
              color: #218ee9;
            }
            .footer .online,
            .footer .invite {
              text-align: center;
              color: #218ee9;
              border: 1px solid #218ee9;
              border-radius: 0.25rem;
              padding: 0.25rem;
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
            .footer .buy a {
              display: inline-block;
              color: #fff;
            }
          `}</style>
        </div>}
      </Layout>
    )
  }
}