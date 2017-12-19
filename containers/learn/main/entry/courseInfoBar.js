import React from 'react'
import {
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  MediaBoxInfo
} from 'react-weui'
import Link from 'next/link'
import ToolsUtil from '/util/tools'

export default class extends React.Component {
  render () {
    let {title, des, info, bgImg, category} = this.props
    let boxStyle = {
      marginLeft: '5px',
      width: '150px'
    }
    let fontStyle = {color: 'white'}
    // if (category === 'mine') {
    //   let bg = '/static/img/learn/cover_little.png'
    //   boxStyle = Object.assign(boxStyle, {background: `url(${bg})`, backgroundSize: 'cover'})
    //   fontStyle = {color: 'white'}
    // } else {
    //   // bgImg = null
    //   let bg = bgImg ? `url(${bgImg})` : '#efeff4'
    //   boxStyle = Object.assign(boxStyle, {background: bg, backgroundSize: 'cover'})
    // }
    let bg
    if (bgImg) {
      // 1 传入完成拼接
      bgImg = ToolsUtil.addByType(bgImg, 'native')
      // 2 设置
      bg = bgImg
    } else {
      bg = '/static/img/learn/cover_little.png'
    }
    // 3 复制到属性中
    boxStyle = Object.assign(boxStyle, {background: `url(${bg})`, backgroundSize: 'cover'})
    return (
      <Link key={title} href={{ pathname: '/learn/course/info', query: { courseId: this.props.courseId } }}>
        <a>
          <div className='course-info-bar'>
            <MediaBox style={boxStyle}>
              <MediaBoxTitle style={fontStyle}>{title}</MediaBoxTitle>
              <MediaBoxDescription style={fontStyle}>{des}</MediaBoxDescription>
              <MediaBoxInfo style={fontStyle}>{info}</MediaBoxInfo>
            </MediaBox>
            <style jsx>{`
              .course-info-bar {
                flex-basis: 100px;
                flex-shrink: 0;
                flex-grow: 0;
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
        </a>
      </Link>
    )
  }
}
