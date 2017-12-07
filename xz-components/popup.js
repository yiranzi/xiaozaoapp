import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'react-weui'

export default class extends React.Component {
  static propTypes = {
    close: PropTypes.bool,
    show: PropTypes.bool,
    position: PropTypes.string,
    onRequestClose: PropTypes.func,
    crossIcon: PropTypes.object
  }
  static defaultProps = {
    close: true,
    show: false,
    position: 'left',
    onRequestClose: () => {}
  }
  renderStyle () {
    const {position} = this.props
    if (position === 'left') {
      return {
        'left': 0,
        'transform': 'translate(-100%, 0)'
      }
    }
    if (position === 'right') {
      return {
        'right': 0,
        'transform': 'translate(100%, 0)'
      }
    }
    if (position === 'top') {
      return {
        'transform': 'translate(0, -100%)'
      }
    }
    if (position === 'bottom') {
      return {
        'transform': 'translate(0, 100%)'
      }
    }
  }
  renderToggle () {
    const {position} = this.props
    if (position === 'left') {
      return {
        'left': 0,
        'transform': 'translate(0, 0)'
      }
    }
    if (position === 'right') {
      return {
        'right': 0,
        'transform': 'translate(0, 0)'
      }
    }
    if (position === 'top') {
      return {
        'transform': 'translate(0, -100%)'
      }
    }
    if (position === 'bottom') {
      return {
        'transform': 'translate(0, 100%)'
      }
    }
  }
  getStyle () {
    let style = this.renderStyle()
    if (this.props.show) {
      Object.assign(style, this.renderToggle())
    }
    return style
  }
  render () {
    const {show, close, onRequestClose, crossIcon} = this.props
    return (
      <Popup
        style={this.getStyle()}
        show={show}
        onRequestClose={(e) => onRequestClose()}
      >
        {close && (
          <span className='crossIcon' onClick={() => onRequestClose()}>
            {crossIcon ? <div dangerouslySetInnerHTML={{__html: crossIcon}} /> : <span className='close'/>}
          </span>
        )}
        {this.props.children}
        <style global jsx>{`
          .react-weui-infiniteloader {
            overflow: scroll;
            -webkit-overflow-scrolling:touch;
          }
          .weui-popup {
            width: 80%;
            height: 100%;
            background-color: #fff;
            padding: 15px 10px;
            box-sizing: border-box;
            overflow-y: scroll;
            position: fixed;
            bottom: 0;
            backface-visibility: hidden;
            z-index: 5000;
            transition: transform .3s;
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
