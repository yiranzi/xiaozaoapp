import React from 'react'
import MoreContent from '/xz-components/moreContent'
import {MediaBoxDescription} from 'react-weui'

/**
 * 内容。
 * canFold 可以点击折叠
 */

export default class extends React.Component {
  render () {
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
}
