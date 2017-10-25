import React from 'react'
import ThemeConfig from '../config/theme'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      needShowBotton: true,
      style: {
        lineHeight: '24px',
        overflow: 'hidden',
        WebkitLineClamp: this.props.line
      },
      isShow: false
    }
  }
  componentDidMount () {
    let clientHeight = this.refs.content.clientHeight
    let lineHeight = this.refs.content.style.lineHeight
    let lines = clientHeight / lineHeight.replace('px', '')
    if (lines > this.props.line) {
      this.setState({
        needShowBotton: true
      })
    }
  }
  hide () {
    this.setState({
      isShow: false,
      style: {lineHeight: '24px', overflow: 'hidden', 'WebkitLineClamp': this.props.line}
    })
  }
  showAll () {
    this.setState({
      isShow: true,
      style: {lineHeight: '24px', overflow: 'visible'}
    })
  }

  renderButton () {
    const { isShow } = this.state
    return (
      <div className='show-all'>
        {isShow && <span onClick={() => { this.hide() }}>收起</span>}
        {!isShow && <span onClick={() => { this.showAll() }}>查看全部</span>}
        <style jsx>{`
          .show-all {
            text-align: right;
          }
          .show-all span {
            color: #117ee9;
            border: 1px solid #117ee9;
            border-radius: 1rem;
            padding: 0.2rem 0.5rem;
          }
        `}</style>
      </div>
    )
  }

  render () {
    const {style, needShowBotton} = this.state
    return (
      <div className='more'>
        <div className='title'>{this.props.title}</div>
        <div className='content' style={style} ref='content'>{this.props.content}</div>
        {needShowBotton && this.renderButton()}
        <style jsx>{`
          .more {
            background-color: ${ThemeConfig.color.gray};
            box-shadow: 0 1px 6px rgba(0,0,0,.2);
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 10px;
          }
          .more .title {
            font-size: ${ThemeConfig.size.normal};
            font-weight: bold;
            color: #242223;
          }
          .more .content {
            margin: 1rem 0;
            color: #646464;
            font-size: 0.9rem;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        `}</style>
      </div>
    )
  }
}
