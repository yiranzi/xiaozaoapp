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
    let {title, des, info, bgImg, category} = this.props
    let style = {}
    if (category === 'mine') {
      // let bg = bgImg ? bgImg : '#EAEAEA'
      let bg = '/static/img/learn/cover.png'
      style = {background: `url(${bg})`, color: 'white'}
    } else {
      style = {backgroundColor: '#efeff4'}
    }
    
    return (
      <div style={style} className='course-info-bar'>
        <MediaBox onClick={() => { this.goRouter() }}>
          <MediaBoxTitle>{title}</MediaBoxTitle>
          <MediaBoxDescription>{des}</MediaBoxDescription>
          <MediaBoxInfo>{info}</MediaBoxInfo>
        </MediaBox>
        <style jsx>{`
        .course-info-bar {
          flex: 1;
          max-width: 33%;
          margin-left: 5px;
        }
        `}</style>
        <style global jsx>{`
          .course-info-bar:first-child {
            margin-left: 0;
          }
          .weui-media-box {
            padding: 10px !important;
          }
        `}</style>
      </div>
    )
  }
}
