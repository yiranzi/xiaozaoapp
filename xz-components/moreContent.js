import React from 'react'
import ThemeConfig from '../config/theme'

export default class extends React.Component {
  LineHeight = 20
  constructor (props) {
    super(props)
    const {height} = this.props
    this.state = {
      style: {
        lineHeight: `${this.LineHeight}px`,
        maxHeight: `${height * this.LineHeight}px`,
        overflowY: 'hidden'
      },
      isShow: false
    }
  }

  change () {
    let {isShow} = this.state
    if (isShow) {
      const {height} = this.props
      this.setState({
        isShow: false,
        style: {
          lineHeight: `${this.LineHeight}px`,
          maxHeight: `${height * this.LineHeight}px`,
          overflowY: 'hidden'
        }
      })
    } else {
      this.setState({
        isShow: true,
        style: {
          lineHeight: `${this.LineHeight}px`,
          height: 'auto'
        }
      })
    }
  }

  render () {
    const {style} = this.state
    return (
      <div className='more' onClick={() => { this.change() }}>
        <div className='title'>{this.props.title}</div>
        <div className='content' style={style}><div>{this.props.children}</div></div>
        <style jsx>{`
          .more {
            {/*background-color: ${ThemeConfig.color.gray};*/}
            {/*box-shadow: 0 1px 6px rgba(0,0,0,.2);*/}
            {/*padding: 1rem;*/}
            {/*margin: 1rem 0;*/}
            {/*border-radius: 10px;*/}
          }
          .more .title {
            font-size: ${ThemeConfig.size.normal};
            font-weight: bold;
            color: #242223;
          }
          .more .content {
            margin: 5px 0;
            color: #646464;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            word-break:break-all;
            text-overflow: ellipsis;
          }
        `}</style>
      </div>
    )
  }
}
