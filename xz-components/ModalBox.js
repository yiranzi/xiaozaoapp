import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

// cancelCallBack
// imageBg
// innerDiv
// style 用于修改默认样式
class ModalBox extends React.Component {
  constructor (props) {
    super(props)
    this.cancelClick = this.cancelClick.bind(this)
    this.renderBg = this.renderBg.bind(this)
    this.renderInnerDiv = this.renderInnerDiv.bind(this)
  }
  render () {
    // 没有暴露接口的全屏默认样式
    let outDivStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: '9999',
      top: 0,
      left: 0
    }
    // 渲染全屏图 或者 自定义居中组件
    return (<div onClick={this.cancelClick} style={outDivStyle}>
      {this.props.imageBg ? this.renderBg() : this.renderInnerDiv()}
    </div>)
  }

  cancelClick () {
    const {cancelCallBack} = this.props
    if (cancelCallBack) {
      cancelCallBack()
    }
    close()
  }

  renderInnerDiv () {
    // 可以修改的内部div样式
    let innerDivDefaultStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(35,24,21,0.5)',
      textAlign: 'center',
      color: 'white'
    }
    let style = Object.assign(innerDivDefaultStyle, this.props.style)
    return (<div style={style}>
      {this.props.inner}
    </div>)
  }

  renderBg () {
    // 可以修改样式的全屏图
    let bgDefaultStyle = {
      width: '100%',
      height: '100%'
    }
    let style = Object.assign(bgDefaultStyle, this.props.style)
    return (<img style={style} src={this.props.imageBg} />)
  }
}

function close () {
  const target = document.getElementById('modal-pop')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
}

export function ModalPop (props) {
  let divTarget = document.createElement('div')
  divTarget.id = 'modal-pop'
  document.body.appendChild(divTarget)
  render(<ModalBox {...props} />, divTarget)
}