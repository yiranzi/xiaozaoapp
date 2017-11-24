import React from 'react'
import PropTypes from 'prop-types'

/**
 * 这是选择bar。用户从多个选项中选择一个选项。不可选，选中，未选中。
 * by yiran
 */

export class ChooseItem extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool

  }
  static defaultProps = {
    title: '123', // 按钮名称
    style: {}, // 自定义样式
    disabled: false // 禁止选 （禁止选中 需要自己添加上对应的style样式）
  }
}

export class ChooseBar extends React.Component {
  static propTypes = {
    defaultActiveKey: PropTypes.number,
    style: PropTypes.object,
    chooseStyle: PropTypes.object,
    onTabClick: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    defaultActiveKey: -1, // 初始选中
    style: {}, // chooseBar样式
    chooseStyle: {backgroundColor: 'red'}, // 选中后 chooseItem的样式
    onTabClick: function () {}, // 点击chooseBar的回调
    onChange: function () {} // 选择发生变化的回调
  }

  constructor (props) {
    super(props)
    this.state = {
      currentSelect: -1
    }
    this.onChange = this.onChange.bind(this)
    this.onTabClick = this.onTabClick.bind(this)
    this.renderChooseList = this.renderChooseList.bind(this)
    this.getTabs = this.getTabs.bind(this)
    this.calcStyle = this.calcStyle.bind(this)
    this.objectAssign = this.objectAssign.bind(this)
  }

  componentDidMount () {
    this.setState({
      currentSelect: this.props.defaultActiveKey
    })
  }

  render () {
    // chooseBar默认样式
    let tabStyle = {
      boxSizing: 'border-box',
      margin: 'auto',
      width: '100%',
      padding: '0px 10px'
    }
    let finalStyle = this.objectAssign(tabStyle, this.props.style)
    return (
      <div style={finalStyle}>
        {this.renderChooseList()}
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

  renderChooseList () {
    let finalStyle
    const tabsData = this.getTabs()
    if (tabsData && tabsData.length > 0) {
      const content = tabsData.map((cProps, index) => {
        finalStyle = this.calcStyle(cProps.style, index)
        return <div key={index} style={finalStyle} onClick={() => { this.onTabClick(cProps.disabled, index) }}>
          {cProps.children || <p>{cProps.title}</p>}
        </div>
      })
      return content
    } else {
    }
  }

  calcStyle (propsStyle, index) {
    // 按钮默认样式
    let tabStyle = {
      width: '100%',
      minHeight: '30px',
      backgroundColor: 'white',
      borderRadius: '5px',
      border: '1px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px auto',
      boxSizing: 'border-box'
    }
    // 默认样式
    let finalStyle = this.objectAssign(tabStyle, propsStyle)
    if (index === this.state.currentSelect) {
      return this.objectAssign(finalStyle, this.props.chooseStyle)
    } else {
      return finalStyle
    }
  }

  objectAssign (oldObj, addObj) {
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
    onTabClick(index)
    this.onChange(disabled, index)
  }

  // change
  onChange (disabled, index) {
    let {onChange} = this.props
    if (index !== this.state.currentSelect && !disabled) {
      this.setState({
        currentSelect: index
      }, () => {
        onChange(index)
      })
    }
  }
}
