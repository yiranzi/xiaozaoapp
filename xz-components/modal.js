import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

class ModalDom extends React.Component {
  render () {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <div className='close' onClick={() => { close() }} />
          {this.props.children}
        </div>
        <style jsx>{`
          .modal {
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
          .modal .modal-content {
            margin: 40px 20px;
            padding: 40px 20px;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 6px;
            line-height: 32px;
            max-height: 90vh;
            overflow: scroll;
          }
          .modal .modal-content .close {
            width: 30px;
            height: 30px;
            margin-top: 10px;
            margin-right: 10px;
            position: relative;
            float: right;
          }
          .modal .modal-content .close::before {
            content: '';
            width: 2px;
            height: 30px;
            background: rgba(0,0,0,.43);
            transform: rotate(45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
          .modal .modal-content .close::after {
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
      </div>
    )
  }
}

function close () {
  const target = document.getElementById('xz-modal')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
  document.body.style.overflow = 'auto'
}

export function Modal (properties) {
  document.body.children[0].classList.add('xz-modal-blur')
  let divTarget = document.createElement('div')
  divTarget.id = 'xz-modal'
  document.body.appendChild(divTarget)
  document.body.style.height = '100vh'
  document.body.style.overflow = 'hidden'
  render(<ModalDom {...properties} />, divTarget)
}
