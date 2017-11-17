import React from 'react'
import PropTypes from 'prop-types'
import {render, unmountComponentAtNode} from 'react-dom'

class ConfirmDom extends React.Component {
  static propTypes = {
    okText: PropTypes.string,
    ok: PropTypes.func,
    cancelText: PropTypes.string,
    cancel: PropTypes.func
  }
  static defaultProps = {
    okText: '确认',
    ok: function () {},
    cancelText: '取消',
    cancel: function () {}
  }
  ok () {
    this.props.ok()
    close()
  }
  cancel () {
    this.props.cancel()
    close()
  }
  render () {
    const { content, okText, cancelText } = this.props

    return (
      <div className='confirm'>
        <div className='dialog'>
          <div className='content'>{content}</div>
          <div className='action'>
            <div className='cancel' onClick={this.cancel()}>{cancelText}</div>
            <div className='ok' onClick={this.ok()}>{okText}</div>
          </div>
        </div>
        <style jsx>{`
          .confirm {
            width: 100%;
            height: 100%;
            font-size: 14px;
            background: rgba(0,0,0, 0.5);
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .confirm .dialog {
            width: 70%;
            background-color: #fff;
            border-radius: 6px;
            line-height: 32px;
          }
          .confirm .dialog .content {
            color: #242223;
            padding: 0.5rem 1rem;
          }
          .confirm .dialog .action {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #e5e5e5;
          }
          .confirm .dialog .action .cancel,
          .confirm .dialog .action .ok {
            flex: 1;
            text-align: center;
          }
          .confirm .dialog .action .ok {
            border-left: 1px solid #e5e5e5;
            color: #117ee9;
          }
        `}</style>
      </div>
    )
  }
}

function close () {
  const target = document.getElementById('xz-confirm')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
}

export function Confirm (properties) {
  document.body.children[0].classList.add('xz-confirm-blur')
  let divTarget = document.createElement('div')
  divTarget.id = 'xz-confirm'
  document.body.appendChild(divTarget)
  render(<ConfirmDom {...properties} />, divTarget)
}
