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
    location.href = `/study/courseInfo?courseId=${this.props.courseId}`
  }

  render () {
    let {title, des, info} = this.props
    return (<div className='course-info-bar'>
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
        background-image: url('/static/img/study/buyBg_1.jpeg')
      }
      `}</style>
    </div>)
  }
}
