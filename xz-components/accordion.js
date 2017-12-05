import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    show: PropTypes.bool
  }
  static defaultProps = {
    show: false
  }

  constructor (props) {
    super(props)
    this.state = {
      showContent: this.props.show
    }
  }

  handleClick (e) {
    this.setState({
      showContent: !this.state.showContent
    })
  }

  render () {
    const { children, header } = this.props
    let content = this.state.showContent ? children : ''
    return (
      <div className='xz-accordion-item'>
        <div className='xz-accordion-header' onClick={() => this.handleClick()}>{header}</div>
        {content && <div className='xz-accordion-content'>{content}</div>}
        <style jsx>{`
          .xz-accordion-item {
            border-radius: 2px;
            margin: 5px 0;
          }
          .xz-accordion-header {
            background-color: #fff;
            padding: 5px 8px;
            align-items: center;
            transition: .3s;
          }
          .xz-accordion-content {
            padding: 5px 10px;
            align-items: center;
            background-color: #e5e5e5;
          }
        `}</style>
      </div>
    )
  }
}
