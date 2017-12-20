import React, { Component } from 'react'
import classNames from 'classnames'
import DataUtil from '../util/data'

export default class Uploader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: ''
    }
  }
  handleFile (e) {
    let _files = e.target.files

    let formdata = new FormData()
    for (let key in _files) {
      if (!_files.hasOwnProperty(key)) continue
      let file = _files[key]
      this.setState({file: file.name})
      formdata.append('file', file)
    }
    this.props.onChange(formdata)
  }
  renderFileList (file) {
    return <div>{file}</div>
  }
  renderUploader () {
    const { className } = this.props

    const cls = classNames({
      'weui-uploader': true,
      [className]: className
    })
    return (
      <div className={cls}>
        <div className='weui-uploader__bd'>
          <div className='weui-uploader__input-box'>
            <input
              className='weui-uploader__input'
              type='file'
              onChange={(e) => this.handleFile(e)}
            />
          </div>
        </div>
      </div>
    )
  }
  render () {
    const { file } = this.state

    if (DataUtil.isEmpty(file)) {
      return this.renderUploader()
    } else {
      return this.renderFileList(file)
    }
  }
}
