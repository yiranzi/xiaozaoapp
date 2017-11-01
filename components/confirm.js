import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: true
    }
  }
  ok () {
    const {ok} = this.props
    if (ok) {
      ok()
    } else {
      this.setState({isShow: false})
    }
  }
  cancel () {
    const {cancel} = this.props
    if (cancel) {
      cancel()
    } else {
      this.setState({isShow: false})
    }
  }
  render () {
    let {isShow} = this.state
    let { content, okText, cancelText } = this.props
    okText = okText || '确认'
    cancelText = cancelText || '取消'
    if (!isShow) return <div />
    return (
      <div className='confirm'>
        <div className='dialog'>
          {content && <div className='content'>{content}</div>}
          <div className='action'>
            <div className='cancel' onClick={() => { this.cancel() }}>{cancelText}</div>
            <div className='ok' onClick={() => { this.cancel() }}>{okText}</div>
          </div>
        </div>
        <style jsx>{`
          .confirm {
            width: 100%;
            height: 100%;
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
