import React from 'react'
import Router from 'next/router'
import ClassNames from 'classnames'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    }
  }
  componentDidMount () {
    this.setState({search: location.search})
  }
  jumpTo (url) {
    Router.replace(`${url}${this.state.search}`)
  }
  render () {
    const {type} = this.props
    return (
      <div className='footer'>
        <div onClick={() => { this.jumpTo('/learn/course/detail') }} className={ClassNames({'current': type === 'learn'})}>
          <div className='icon'>
            {(type === 'learn') ? <img src='/static/img/learn/course/learn_active.png' /> : <img src='/static/img/learn/course/learn.png' />}
          </div>
          <div className='text'>学习</div>
        </div>
        <div onClick={() => { this.jumpTo('/learn/course/testList') }} className={ClassNames({'current': type === 'test'})}>
          <div className='icon'>
            {(type === 'test') ? <img src='/static/img/learn/course/test_active.png' /> : <img src='/static/img/learn/course/test.png' />}
          </div>
          <div className='text'>测试</div>
        </div>
        <div onClick={() => { this.jumpTo('/learn/course/download') }} className={ClassNames({'current': type === 'source'})}>
          <div className='icon'>
            {(type === 'source') ? <img src='/static/img/learn/course/source_active.png' /> : <img src='/static/img/learn/course/source.png' />}
          </div>
          <div className='text'>资料</div>
        </div>
        <style jsx>{`
          .footer {
            font-size: 10pt;
            text-align: center;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            position: fixed;
            bottom: 0;
            border-top: 1px solid #e5e5e5;
            width: 100%;
            padding: 5px 30px;
            box-sizing: border-box;
          }
          .footer .current {
            color: #1296db;
          }
          .footer .icon {
            font-size: 0;
          }
          .footer .icon img {
            width: 16pt;
          }
        `}</style>
      </div>
    )
  }
}
