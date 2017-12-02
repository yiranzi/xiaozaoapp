import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'react-weui'

export default class extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    onRequestClose: PropTypes.func,
    crossIcon: PropTypes.object
  }
  static defaultProps = {
    show: false,
    onRequestClose: () => {}
  }
  renderStyle () {
    const {position} = this.props
    if (position === 'left') {
      return (
        `
          transform: translate(-100%, 0);
        `
      )
    }
    // 显示正确
    if (position === 'right') {
      return (
        `
          transform: translate(100%, 0);
        `
      )
    }
    if (position === 'top') {
      return (
        `
          transform: translate(0, -100%);
        `
      )
    }
    // 显示正确
    if (position === 'bottom') {
      return (
        `
          transform: translate(0, 100%);
        `
      )
    }
  }
  render () {
    const {show, onRequestClose, crossIcon} = this.props
    return (
      <Popup
        show={show}
        onRequestClose={(e) => onRequestClose()}
      >
        <span className='crossIcon' onClick={() => onRequestClose()}>
          {crossIcon ? <div dangerouslySetInnerHTML={{__html: crossIcon}} /> : <span className='close'/>}
        </span>
        {this.props.children}
        <style global jsx>{`
          .react-weui-infiniteloader {
            overflow: scroll;
            -webkit-overflow-scrolling:touch;
          }
          .weui-popup {
            height: 100vh;
            overflow-y: scroll;
            position: fixed;
            left: 0;
            bottom: 0;
            ${this.renderStyle()}
            backface-visibility: hidden;
            z-index: 5000;
            width: 100%;
            background-color: #EFEFF4;
            transition: transform .3s;
          }
          .weui-popup_toggle {
            transform: translate(0, 0);
          }
          .close {
            width: 30px;
            height: 30px;
            margin-top: 10px;
            margin-right: 10px;
            position: relative;
            float: right;
          }
          .close::before {
            content: '';
            width: 2px;
            height: 30px;
            background: rgba(0,0,0,.43);
            transform: rotate(45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
          .close::after {
            content: '';
            width: 2px;
            height: 30px;
            background: rgba(0,0,0,.43);
            transform: rotate(-45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
        `}</style>
      </Popup>
    )
  }
}
