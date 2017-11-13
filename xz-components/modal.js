import React from 'react'

// interface StateTypes {
// onClickBg  点击背景任意位置回调
// isShow    是否显示
// imageBg   全屏背景图
// cbfOkClick 确定回调(未实现)
// }

export default class extends React.Component {
  render () {
    console.log(this.props)
    if (!this.props.isShow) {
      return (<div />)
    }
    let style = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: '9999',
      top: 0,
      left: 0
    }
    // eslint-disable-next-line
    let styleClick = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      zIndex: '-1'
    }

    return (<div onClick={this.props.onClickBg} style={style} >
      {this.props.imageBg ? this.renderBg() : this.props.children}
    </div>)
  }

  renderBg () {
    let style = {
      width: '100%',
      height: '100%'
    }
    return (<img style={style} src={this.props.imageBg} />)
  }
}
