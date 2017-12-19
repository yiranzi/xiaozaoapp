import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='wx-text-center page-hd'>
        <h3>{this.props.title}</h3>
        <p><small>第{this.props.pageNumber}页/共{this.props.totalSize}页</small></p>
      </div>
    )
  }
}
