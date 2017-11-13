import React from 'react'
import ThemeConfig from '../config/theme'

export default class extends React.Component {
  render () {
    return <div className={'navbar wx-clearfix ' + (
      this.props.fixed ? 'wx-top-fixed' : '')}>
      {this.props.leftbar &&
        <a className='wx-pull-left left'
          href={this.props.leftbar.href || 'javascript:;'}
          onClick={this.props.leftbar.onclick}>
          <span className=''> &lsaquo; {this.props.leftbar.name}</span>
        </a>
      }
      {!this.props.leftbar && <span className='wx-pull-left left' />}
      {this.props.navtitle && <span className='title'>{this.props.navtitle}</span>}
      {this.props.rightbar &&
        <a className='wx-pull-right right'
          href={this.props.rightbar.href || 'javascript:;'}
          onClick={this.props.rightbar.onclick}>
          <span className=''>{this.props.rightbar.name}</span>
        </a>
      }
      {!this.props.rightbar && <span className='wx-pull-right right' />}
      <style jsx>{`
        .navbar {
          border-bottom: 1px solid ${ThemeConfig.color.gray};
          text-align: center;
        }
        .left, .right {
          padding: 10px;
        }
        .title {
          line-height: 40px;
          font-size: 16px;
        }
      `}</style>
    </div>
  }
}
