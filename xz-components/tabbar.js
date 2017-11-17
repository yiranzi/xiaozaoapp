
import React from 'react'
export class Tab extends React.Component {
  render () {
    return (<div>{this.props.children}</div>)
  }
}

/**
 * param
 * onChange // 变动回调
 * onTabClick // 点击tabbar回调
 *
 * by yiran
 */

export class Tabbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSelect: -1
    }
    this.onChange = this.onChange.bind(this)
    this.onTabClick = this.onTabClick.bind(this)
    this.renderMe = this.renderMe.bind(this)
    this.getTabs = this.getTabs.bind(this)
    this.calcStyle = this.calcStyle.bind(this)
    this.myNew = this.myNew.bind(this)
  }

  componentDidMount () {
    if (this.props.defaultActiveKey) {
      this.setState({
        currentSelect: this.props.defaultActiveKey
      })
    }
  }

  render () {
    // tabbar默认样式
    let tabStyle = {
    }
    let finalStyle = this.myNew(tabStyle, this.props.style)
    return (
      <div style={finalStyle}>
        {this.renderMe()}
      </div>
    )
  }

  getTabs () {
    return React.Children.map(this.props.children, (c) => {
      return {
        ...c.props
      }
    })
  }

  renderMe () {
    let finalStyle
    const tabsData = this.getTabs()
    if ( tabsData && tabsData.length > 0) {
      const content = tabsData.map((cProps, index) => {
        finalStyle = this.calcStyle(cProps.style, index)
        return <div key={index} style={finalStyle} onClick={() => { this.onTabClick(cProps.disabled, index) }}>
          <p>{cProps.title}</p>
        </div>
      })
      return content
    } else {
      console.log(tabsData)
    }
  }

  calcStyle (propsStyle, index) {
    // 按钮默认样式
    let tabStyle = {
      width: '100%',
      height: '40px',
      color: 'red',
      backgroundColor: 'white',
      borderRadius: '5px',
      border: '2px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '3px auto'
    }
    // 默认样式
    let finalStyle = this.myNew(tabStyle, propsStyle)

    let chooseStyle = this.props.chooseStyle
    if (index === this.state.currentSelect) {
      return this.myNew(finalStyle, chooseStyle)
    } else {
      return finalStyle
    }
  }

  myNew (oldObj, addObj) {
    if (addObj !== undefined && addObj !== null) {
      let a = JSON.parse(JSON.stringify(oldObj))
      Object.assign(a, addObj)
      return a
    } else {
      return oldObj
    }
  }

  // click
  onTabClick (disabled, index) {
    let {onTabClick} = this.props
    onTabClick && onTabClick(index)
    this.onChange(disabled, index)
  }

  // change
  onChange (disabled, index) {
    let {onChange} = this.props
    if (index !== this.state.currentSelect && !disabled) {
      this.setState({
        currentSelect: index
      }, () => {
        onChange && onChange(index)
      })
    }
  }
}
