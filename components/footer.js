import React from 'react'
import ClassNames from 'classnames'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      college: false,
      pai: false,
      hr: false,
      me: false
    }
  }
  render () {
    const {type} = this.props
    return (
      <div className='footer'>
        {/* <div
          className={ClassNames('item', {'current': this.state.college || type === 'college'})} 
          onTouchStart={() => { this.setState({college: true}) }}
          onTouchEnd={() => { this.setState({college: false}, () => { location.href = '/abilitycollege/main' }) }}
        >
          <div className='icon'>
            {(this.state.college || type === 'college') ? <img src='/static/img/abilitycollege/college_active.png' /> : <img src='/static/img/abilitycollege/college.png' />}
          </div>
          <div className='text'>能力学院</div>
        </div> */}
        {/* <div
          className={ClassNames('item', {'current': this.state.pai || type === 'pai'})}
          onTouchStart={() => { this.setState({pai: true}) }}
          onTouchEnd={() => { this.setState({pai: false}) }}
        >
          <div className='icon'>
            {(this.state.pai || type === 'pai') ? <img src='/static/img/abilitycollege/pai_active.png' /> : <img src='/static/img/abilitycollege/pai.png' />}
          </div>
          <div className='text'>能力派</div>
        </div> */}
        <div
          className={ClassNames('item', {'current': this.state.hr || type === 'hr'})}
          onTouchStart={() => { this.setState({hr: true}) }}
          onTouchEnd={() => { this.setState({hr: false}, () => { location.href = '/job/internship' }) }}
        >
          <div className='icon'>
            {(this.state.hr || type === 'hr') ? <img src='/static/img/abilitycollege/hr_active.png' /> : <img src='/static/img/abilitycollege/hr.png' />}
          </div>
          <div className='text'>HR直聘</div>
        </div>
        <div
          className={ClassNames('item', {'current': this.state.me || type === 'me'})}
          onTouchStart={() => { this.setState({me: true}) }}
          onTouchEnd={() => { this.setState({me: false}, () => { location.href = '/ucenter/portal' }) }}
        >
          <div className='icon'>
            {(this.state.me || type === 'me') ? <img src='/static/img/abilitycollege/me_active.png' /> : <img src='/static/img/abilitycollege/me.png' />}
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