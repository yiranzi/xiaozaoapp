import React from 'react'
import Button from '../../xz-components/button'
import {Confirm} from '../../xz-components/confirm'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      action: ''
    }
  }
  openConfirm () {
    const _this = this
    Confirm({
      title: '标题',
      content: '确认提交？确认提交？确认提交？',
      okText: '确定',
      cancelText: '取消',
      ok: () => _this.setState({action: 'ok'}),
      cancel: () => _this.setState({action: 'cancel'})
    })
  }
  render () {
    return (
      <div className='up'>
        <div className='title'>Confirm弹框：</div>
        <Button onClick={() => { this.openConfirm() }}>Confirm弹框</Button>
        {this.state.action && <div>点击了{this.state.action}</div>}
      </div>
    )
  }
}