import React from 'react'
import classNames from 'classnames'
import Layout from '../../components/layout'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 1
    }
  }
  onChange (e) {
    this.setState({index: e})
  }
  render () {
    const {index} = this.state
    return (
      <Layout>
        <div className='learn-card'>
          <div className='header'>
            <div className={classNames('tab', {current: index === 1})} onClick={() => {this.onChange(1)}}>课程体验</div>
            <div className={classNames('tab', {current: index === 2})} onClick={() => {this.onChange(2)}}>小灶学习卡</div>
          </div>
          {index === 1 && <div>课程体验内容</div>}
          {index === 2 && <div>小灶学习卡</div>}
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

          `}</style>
        </div>
      </Layout>
    )
  }
}
