import React from 'react'
import MoreContent from '/xz-components/moreContent'
import {MediaBoxDescription} from 'react-weui'
import DataUtil from '/util/data'

/**
 * 内容。
 * canFold 可以点击折叠
 */

export default class extends React.Component {
  renderByType () {
    let {answerDataType} = this.props
    // type = 3
    switch (answerDataType) {
      case 3:
        return (this.renderImg())
      case 5:
        return (this.renderImg())
      default:
        return (this.renderTxt())
    }
  }

  renderAudio () {

  }

  renderImg () {
    let {content: imgUrl} = this.props
    imgUrl = `http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/learning/workFile/${imgUrl}`
    return (
      <img style={{width: '100%'}} src={imgUrl} />
    )
  }

  renderTxt () {
    let {content, canFold} = this.props
    if (content) {
      if (canFold) {
        return (<MediaBoxDescription>
          <MoreContent height={2}><div dangerouslySetInnerHTML={{__html: content}} /></MoreContent>
        </MediaBoxDescription>)
      } else {
        return (<MediaBoxDescription style={{display: 'block'}}>
          <div><div dangerouslySetInnerHTML={{__html: content}} /></div>
        </MediaBoxDescription>)
      }
    } else {
      return null
    }
  }

  render () {
    let {content} = this.props
    if (content) {
      return (this.renderByType())
    } else {
      return null
    }
  }
}
