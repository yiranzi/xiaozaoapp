import React from 'react'
import classNames from 'classnames'
import { Gallery, GalleryDelete, Uploader, Form, Cell, CellBody } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    let imgFiles = this.props.defaultValue || []
    this.state = {
      gallery: false,
      imgFiles: imgFiles
    }
  }

  renderGallery () {
    if (!this.state.gallery) return false

    let srcs = this.state.imgFiles.map(file => file.url)

    return (
      <Gallery
        src={srcs}
        show
        defaultIndex={this.state.gallery.id}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          this.setState({gallery: false})
        }}
      >

        <GalleryDelete onClick={(e, id) => {
          this.setState({
            imgFiles: this.state.imgFiles.filter((e, i) => i !== id),
            gallery: this.state.imgFiles.length <= 1 ? true : false
          })
        }} />
      </Gallery>
    )
  }

  render () {
    const _this = this
    const {imgFiles} = this.state
    let {title, maxCount} = this.props
    maxCount = maxCount || 10 // 最多上传10张
    let canUpload = imgFiles.length < maxCount
    return (
      <div className={classNames({ 'max-up': !canUpload })}>
        { this.renderGallery() }
        <Form>
          <Cell>
            <CellBody>
              <Uploader
                title={title}
                capture={false}
                maxCount={maxCount}
                files={this.state.imgFiles}
                onError={msg => alert(msg)}
                onChange={(file, e) => {
                  let newFiles = [...this.state.imgFiles, {url: file.data}]
                  this.setState({
                    imgFiles: newFiles
                  }, () => {
                    _this.props.onChange(newFiles)
                  })
                }}
                onFileClick={
                  (e, file, i) => {
                    this.setState({
                      gallery: {
                        url: file.url,
                        id: i
                      }
                    })
                  }
                }
                lang={{
                  maxError: maxCount => `最多能上传 ${maxCount} 张图片`
                }}
              />
            </CellBody>
          </Cell>
        </Form>
        <style global jsx>{`
          .max-up .weui-uploader__input-box {
            display: none;
          }
        `}</style>
      </div>
    )
  }
}