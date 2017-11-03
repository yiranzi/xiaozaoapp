import React from 'react'
import Audio from '../../xz-components/audio'
import Video from '../../xz-components/video'
import ToolsUtil from '../../util/tools'

export default class extends React.Component {
  renderMaterialItem (item) {
    if (!item) { return item }
    // 图片材料
    if (ToolsUtil.isImg(item)) {
      return <img src={item} />
    } else if (ToolsUtil.isMp3(item)) {
      // 音频材料
      let idTag = `audio-${Math.random().toString(36).substr(2)}`
      return <Audio idTag={idTag} audioUrl={item} />
    } else if (ToolsUtil.isMp4(item)) {
      // 视频材料
      return <Video videoUrl={item} />
    } else if (ToolsUtil.isString(item)) {
      // 文字材料
      return <div dangerouslySetInnerHTML={{__html: item}} />
    }
  }
  renderMaterial (material) {
    const _this = this
    try {
      // meterial 返回结果有两种，一种是文字材料(字符串)，另一种是“['mp3', 'img', 'mp4']”
      // eslint-disable-next-line
      let meterialArray = eval(material)
      if (meterialArray) {
        // 是一个数组
        return meterialArray.map((item, index) => {
          return (
            <div key={index} className='meterial-item'>
              {_this.renderMaterialItem(item)}
            </div>
          )
        })
      } else {
        // 字符串
        return (
          <div className='meterial-item'>
            {_this.renderMaterialItem(material)}
          </div>
        )
      }
    } catch (e) {
      return (
        <div className='meterial-item'>
          {_this.renderMaterialItem(material)}
        </div>
      )
    }
  }
  render () {
    return (
      <div className='material'>{this.renderMaterial(this.props.content)}</div>
    )
  }
}
