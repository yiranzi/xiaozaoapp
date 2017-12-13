import React from 'react'
import DateUtil from '/util/date'
import {MediaBoxTitle, Cell, CellHeader, CellBody, CellFooter} from 'react-weui'
import GiveAgree from '/containers/learn/main/homework/commentBox/giveAgree'

/**
 * 题目。
 * 如果有点赞的题目id 则显示点赞
 */

export default class extends React.Component {
  render () {
    let {headimgurl, nickname, time, starCount, star, starId} = this.props
    if (headimgurl) {
      return (<MediaBoxTitle>
        <Cell style={{padding: '0'}}>
          <CellHeader>
            <img src={headimgurl} style={{display: `block`, width: `20px`, marginRight: `5px`}} />
          </CellHeader>
          <CellBody>
            <span>{nickname} {time && DateUtil.format(time, 'yyyy-MM-dd')}</span>
          </CellBody>
          {starId && <CellFooter>
            <GiveAgree starCount={starCount} star={star} id={starId} />
          </CellFooter>}
        </Cell>
      </MediaBoxTitle>)
    } else {
      return null
    }
  }
}
