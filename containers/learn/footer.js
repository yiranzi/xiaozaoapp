import React from 'react'
import ClassNames from 'classnames'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      learn: false,
      test: false,
      source: false
    }
  }
  render () {
    const {type, courseId} = this.props
    return (
      <div className='footer'>
        <div
          className={ClassNames('item', {'current': this.state.learn || type === 'learn'})}
          onTouchStart={() => { this.setState({learn: true}) }}
          onTouchEnd={() => { this.setState({learn: false}, () => { location.href = '/learn/course/detail?courseId=' + courseId }) }}
        >
          <div className='icon'>
            {(this.state.learn || type === 'learn') ? <img src='/static/img/abilitycollege/college_active.png' /> : <img src='/static/img/abilitycollege/college.png' />}
          </div>
          <div className='text'>学习</div>
        </div>
        <div
          className={ClassNames('item', {'current': this.state.test || type === 'test'})}
          onTouchStart={() => { this.setState({test: true}) }}
          onTouchEnd={() => { this.setState({test: false}, () => { location.href = '/learn/course/testList?courseId=' + courseId }) }}
        >
          <div className='icon'>
            {(this.state.test || type === 'test') ? <img src='/static/img/abilitycollege/hr_active.png' /> : <img src='/static/img/abilitycollege/hr.png' />}
          </div>
          <div className='text'>测试</div>
        </div>
        <div
          className={ClassNames('item', {'current': this.state.source || type === 'source'})}
          onTouchStart={() => { this.setState({source: true}) }}
          onTouchEnd={() => { this.setState({source: false}, () => { location.href = '/course/source' }) }}
        >
          <div className='icon'>
            {(this.state.source || type === 'source') ? <img src='/static/img/abilitycollege/me_active.png' /> : <img src='/static/img/abilitycollege/me.png' />}
          </div>
          <div className='text'>我的</div>
        </div>
        <style jsx>{`
          .footer {
            font-size: 10pt;
            text-align: center;
            background-color: #f0f2f6;
            display: flex;
            justify-content: space-between;
            position: fixed;
            bottom: 0;
            border-top: 1px solid #F9F9F9;
            width: 100%;
          }
          .footer .item {
            padding: 5px 0;
            flex: 1;
          }
          .footer .current {
            background-color: #241d66;
            color: #fff;
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
