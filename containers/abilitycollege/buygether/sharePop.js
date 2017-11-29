import React from 'react'
import {ModalBoxPopFunc} from '../../../xz-components/modalbox'
/**
 * 分享弹窗
 * 传入时间，加上随机的秒
 * 如果是没有时间，就默认最大。（只有刚开团的自动弹窗没有设置时间）
 */
export default function (ele) {
  let leftHour = 23
  let leftMinute = 59
  if (ele) {
    ({leftHour, leftMinute} = ele)
  }
  let defaultStyle = {
    backgroundColor: 'rgba(0, 10, 49, 0.5)'
  }
  let randomSecond = parseInt(60 * Math.random())
  let dom = <div>
    <img className='img-style' src='/static/img/buygether/share-arrow.png' />
    <p className='title'>离成团只剩{leftHour}时{leftMinute}分{randomSecond}秒</p>
    <p className='title'>还差<strong className='strong'> 1 </strong>人，赶紧邀请好友来拼团吧~</p>
    <p className='title'>拼团人满后可拿成就卡</p>
    <style jsx>{`
      .title {
        font-size:20px;
        font-weight: bold;
      }
      .strong {
        font-size:28px;
        font-weight: bold;
        color: red;
      }
      .img-style {
        position: absolute;
        top: 0;
        right: 0;
        width: 150px;
        height: 300px;
      }
    `}</style>
  </div>
  let prop = {
    innerDiv: dom,
    style: defaultStyle
  }
  ModalBoxPopFunc({...prop})
}


