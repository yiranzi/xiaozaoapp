import React from 'react'
import Button from '../../xz-components/button'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.renderModalBoxImageStyle = this.renderModalBoxImageStyle.bind(this)
    this.renderModalBoxDiv = this.renderModalBoxDiv.bind(this)
  }

  render () {
    return (
      <div className='up'>
        <div className='title'>Modal：</div>
        <Button onClick={this.renderModalBoxDiv}>点击弹出弹窗1</Button>
        <Button onClick={this.renderModalBoxImageStyle}>点击弹出弹窗2</Button>
      </div>
    )
  }

  // 默认内置div
  renderModalBoxDiv () {
    let imageProps = {
      cancelCallBack: () => { console.log('点击背景关闭回调1') },
      innerDiv: <div>
        <p style={{color: 'red'}}>123</p>
        <img style={{width: '100%', height: '100%'}} src='/static/img/apollo/share-icon.jpg' />
      </div>
    }
    return (ModalBoxPopFunc(imageProps))
  }

  // 自定义样式的内置div
  renderModalBoxImageStyle () {
    let imageProps = {
      cancelCallBack: () => { console.log('点击背景关闭回调') },
      innerDiv: <img style={{position: 'relative', top: '-200px'}} src='/static/img/apollo/share-icon.jpg' />,
      style: {backgroundColor: 'rgba(0,0,0, 0.5)'}
    }
    return (ModalBoxPopFunc(imageProps))
  }
}
