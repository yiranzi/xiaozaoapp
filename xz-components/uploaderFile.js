import React, { Component } from 'react'
import classNames from 'classnames'
import DataUtil from '../util/data'
import ToolUtil from '../util/tools'

export default class Uploader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: '',
      dataURL: ''
    }
  }
  handleFile (e) {
    const _this = this
    let file = e.target.files[0]
    let reader = new FileReader()

    reader.readAsDataURL(file) // 读出 base64
    reader.onloadend = function () {
      // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
      let dataURL = reader.result
      _this.setState({file: file.name, dataURL: dataURL})
      let formdata = new FormData()
      formdata.append('file', file)
      _this.props.onChange({name: file.name, formdata: formdata})
    }
  }
  renderFileList (file) {
    if (ToolUtil.isImg(file)) {
      return <img style={{maxWidth: '100%'}} src={this.state.dataURL} />
    } else {
      return <div>{file}</div>
    }
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
