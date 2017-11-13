
import React from 'react'
import {Button} from 'react-weui'// 组件库
import ThemeConfig from '../config/theme'

// divArr 数组
// currentSelect //当前选中的按钮
// buttonStatus //描述每个按钮的状态
// disabledStyle  //不可选中状态按钮
// chooseStyle  // 选中状态按钮
// normalStyle // 正常状态按钮

export default class extends React.Component {
  render () {
    return (
      <div className='tabbar'>
        {this.renderMe()}
        {/* tabbar样式 */}
        <style jsx>{`
          .tabbar {
            width: 250px;
            margin: auto;
          }
        `}</style>
      </div>
    )
  }

  // 渲染容器
  // 填充容器
  // 判定状态
  // 指定回调
  renderMe () {
    let style
    let clickBoxArr = this.props.divArr.map((ele, index) => {
      style = this.calcStyle(index)
      return <div className='contain' key={index} style={style} onClick={this.onClickTabbar.bind(this, index)}>
        {this.props.divArr[index]}
        {/* 内部元素 */}
        <style jsx>{`
          .contain {
            margin: 20px auto 20px auto;
          }
        `}</style>
      </div>
    })
    return clickBoxArr
  }

  calcStyle (index) {
    // 1 是否是选中
    let {currentSelect, buttonStatus, normalStyle, chooseStyle, disabledStyle} = this.props
    if (index === currentSelect) {
      return chooseStyle
    } else {
      if (buttonStatus[index]) {
        return normalStyle
      } else {
        return disabledStyle
      }
    }
  }

  onClickTabbar (index) {
    this.props.onClickTabbar(index)
  }
}
