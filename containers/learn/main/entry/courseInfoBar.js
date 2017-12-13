import React from 'react'
import {
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  MediaBoxInfo
} from 'react-weui'

// 渲染内容

export default class extends React.Component {
  goRouter () {
    location.href = `/learn/course/info?courseId=${this.props.courseId}`
  }

  render () {
    let {title, des, info, bgImg} = this.props
    let imgUrl = bgImg !== 'default' ? bgImg : '/static/img/study/buyBg_1.jpeg'
    return (<div style={{background: `url(${imgUrl})`}} className='course-info-bar'>
      <MediaBox onClick={() => { this.goRouter() }}>
        <MediaBoxTitle style={{color: 'white'}}>{title}</MediaBoxTitle>
        <MediaBoxDescription style={{color: 'white'}}>{des}</MediaBoxDescription>
        <MediaBoxInfo style={{color: 'white'}}>{info}</MediaBoxInfo>
      </MediaBox>
      <style jsx>{`
      .course-info-bar {
        color: white !important;
        flex: 1;
        max-width: 33%;
      }
      `}</style>
    </div>)
  }
}
