
import React from 'react'


/**
 * param
 * disabledStyle  //不可选中状态按钮
 * chooseStyle  // 选中状态按钮
 * normalStyle // 正常状态按钮
 * onChange // 变动回调
 * onTabClick // 点击tabbar回调
 *
 * by yiran
 */

export class Tabbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSelect: 0
    }
    this.onChange = this.onChange.bind(this)
    this.onTabClick = this.onTabClick.bind(this)
    this.renderMe = this.renderMe.bind(this)
  }

  componentDidMount () {
    this.setState({
      currentSelect: this.props.defaultActiveKey
    })
  }

  render () {
    return (
      <div style={this.props.tabStyle} onClick={()=>{console.log('tag!!!!!')}}>
        {this.renderMe()}
      </div>
    )
  }

  renderMe () {
    let {tabs} = this.props
    let style
    let tabsArray = tabs.map((ele, index) => {
      style = this.calcStyle(ele, index)
      return <div key={index} style={style} onClick={() => { this.onTabClick(ele, index) }}>
        <p>{ele.title}</p>
      </div>
    })
    return tabsArray
  }

  calcStyle (ele, index) {
    // 1 是否是选中
    // eslint-disable-next-line
    let {normalStyle, chooseStyle, disabledStyle} = this.props
    if (index === this.state.currentSelect) {
      return this.myNew(normalStyle, chooseStyle)
    } else {
      if (ele.disabled) {
        return this.myNew(normalStyle, disabledStyle)
      } else {
        return normalStyle
      }
    }
  }

  myNew (oldObj, addObj) {
    let a = JSON.parse(JSON.stringify(oldObj))
    Object.assign(a, addObj)
    return a
  }

  // click
  onTabClick (ele, index) {
    console.log('!~!!!')
    let {onTabClick} = this.props
    onTabClick && onTabClick(index)
    this.onChange(ele, index)
  }

  // change
  onChange (ele, index) {
    let {onChange} = this.props
    if (index !== this.state.currentSelect && !ele.disabled) {
      console.log('onChange')
      console.log(index)
      this.setState({
        currentSelect: index
      }, () => {
        onChange && onChange(index)
      })
    }
  }
}
