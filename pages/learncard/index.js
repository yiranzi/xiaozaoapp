import React from 'react'
import classNames from 'classnames'
import Layout from '../../components/layout'
import BuyCard from '../../containers/learncard/BuyCard'
import Experience from '../../containers/learncard/experience'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 1
    }
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
          {current === 2 && <BuyCard />}
          <div className='logo-line'>
            <img src='/static/img/apollo/logoLine.png' />
          </div>
          <div className='footer'>
            <div className='online'>在线咨询</div>
            <div className='invite'>邀请好友</div>
            <div className='buy'>抢购学习卡</div>
          </div>
          <style jsx>{`
            .header {
              background: url('/static/img/learncard/headbg.png');
              display: flex;
              padding: 1rem 0.5rem 0rem 0.5rem;
            }
            .header .tab {
              color: #fff;
              background-color: #1a59c0;
              text-align: center;
              font-weight: bold;
              padding-top: 0.5rem;
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
            .logo-line img {
              width: 100%;
            }
            .footer {
              padding: 1rem;
              display: flex;
              justify-content: space-around;
            }
            .footer .online,
            .footer .invite {
              flex: 1;
              text-align: center;
              color: #218ee9;
              border: 1px solid #218ee9;
              border-radius: 0.25rem;
              padding: 0.25rem;
            }
            .footer .invite {
              margin-left: 1rem;
              margin-right: 1rem;
            }
            .footer .buy {
              flex: 1;
              text-align: center;
              background-color: red;
              color: #fff;
              border-radius: 0.25rem;
              padding: 0.25rem;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}
