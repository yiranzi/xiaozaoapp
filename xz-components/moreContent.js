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
        overflowY: 'hidden',
        canRender: false
      },
      isShow: false
    }
    window.setTimeout(() => {
      this.setState({
        canRender: true
      })
    }, 100)
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

  // 多行显示蒙版
  isShowModal () {
    let {out, inner} = this.refs
    if (!this.state.isShow && out && inner && this.state.canRender) {
      if (inner.offsetHeight > this.LineHeight * this.props.height) {
        return (
          <div className='modal'>
            {this.props.modalFrom === 1 && <style>{`
          .modal {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 20px;
            width: 100%;
            z-index: 10;
            height: 20px;
            background: -moz-linear-gradient(bottom,rgba(255,255,255,.1),rgba(255,255,255,0));
            background: -webkit-gradient(linear,0 top,0 bottom,from(rgba(255,255,255,0)),to(rgba(255,255,255,1)));
          }
        `}</style>}

            {this.props.modalFrom === 2 && <style>{`
          .modal {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 20px;
            width: 100%;
            z-index: 10;
            height: 20px;
            background: -moz-linear-gradient(bottom,rgba(239,239,244,.1),rgba(239,239,244,0));
            background: -webkit-gradient(linear,0 top,0 bottom,from(rgba(239,239,244,0)),to(rgba(239,239,244,1)));
          }
        `}</style>}
            {true && <style>{`
          .modal::after {
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #c8c8cd;
            border-style: solid;
            transform: matrix(.71,.71,-.71,.71,0,0);
            position: absolute;
            bottom: -10px;
            left: 50%;
            margin-left: 3px;
            transition: transform .3s;
            transform: rotate(134deg);
          }
        `}</style>}
          </div>
        )
      }
    }
  }

  render () {
    const {style} = this.state
    return (
      <div ref='haha' className='more' onClick={() => { this.change() }}>
        <div className='title'>{this.props.title}</div>
        <div ref='out' className='content' style={style}><div className={'inner'} ref='inner'>{this.props.children}</div></div>
        {this.isShowModal()}
        <style jsx>{`
          .more {
            position: relative;
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



