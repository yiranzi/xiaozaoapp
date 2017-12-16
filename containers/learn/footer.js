import React from 'react'
import Link from 'next/link'
import ClassNames from 'classnames'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      learn: false,
      test: false,
      source: false
    }
  }
  componentDidMount () {
    this.setState({search: location.search})
  }
  render () {
    const {type} = this.props
    return (
      <div className='footer'>
        <Link href={`/learn/course/detail${this.state.search}`}>
          <div
            className={ClassNames('item', {'current': this.state.learn || type === 'learn'})}
            onTouchStart={() => { this.setState({learn: true}) }}
            onTouchEnd={() => { this.setState({learn: false}) }}
          >
            <div className='icon'>
              {(this.state.learn || type === 'learn') ? <img src='/static/img/learn/course/learn_active.png' /> : <img src='/static/img/learn/course/learn.png' />}
            </div>
            <div className='text'>学习</div>
          </div>
        </Link>
        <Link href={`/learn/course/testList${this.state.search}`}>
          <div
            className={ClassNames('item', {'current': this.state.test || type === 'test'})}
            onTouchStart={() => { this.setState({test: true}) }}
            onTouchEnd={() => { this.setState({test: false}) }}
          >
            <div className='icon'>
              {(this.state.test || type === 'test') ? <img src='/static/img/learn/course/test_active.png' /> : <img src='/static/img/learn/course/test.png' />}
            </div>
            <div className='text'>测试</div>
          </div>
        </Link>
        <Link href={`/learn/course/download${this.state.search}`}>
          <div
            className={ClassNames('item', {'current': this.state.source || type === 'source'})}
            onTouchStart={() => { this.setState({source: true}) }}
            onTouchEnd={() => { this.setState({source: false}) }}
          >
            <div className='icon'>
              {(this.state.source || type === 'source') ? <img src='/static/img/learn/course/source_active.png' /> : <img src='/static/img/learn/course/source.png' />}
            </div>
            <div className='text'>资料</div>
          </div>
        </Link>
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
          }
          .footer .index {
            line-height: 1rem;
            background-color: #e5e5e5;
            padding: 10px;
          }
          .footer .item {
            padding: 5px 0;
            flex: 1;
          }
          .footer .current {
            color: #3ea6f7;
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
