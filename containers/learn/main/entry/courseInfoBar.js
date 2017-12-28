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
    let {title, des, info, bgImg, path} = this.props
    let boxStyle = {
      marginLeft: '5px',
      width: '170px',
      flexBasis: '170px',
      flexShrink: '0',
      flexGrow: '0'
    }
    let fontStyle = {color: 'white'}
    let bg = bgImg || '/static/img/learn/cover_little.png'
    // 3 复制到属性中
    boxStyle = Object.assign(boxStyle, {background: `url(${bg})`, backgroundSize: '100% 100%'})
    // 这里面考虑到seo还是用a标签的方式进入课程。不会有循环跳转的问题
    let pathname = path || '/learn/course/info'
    return (
      <Link key={title} href={{ pathname: pathname, query: { courseId: this.props.courseId } }}>
        <a style={boxStyle}>
          <div>
            <MediaBox>
              <MediaBoxTitle style={fontStyle}>{title}</MediaBoxTitle>
              <MediaBoxDescription style={fontStyle}>{des}</MediaBoxDescription>
              <MediaBoxInfo style={fontStyle}>{info}</MediaBoxInfo>
            </MediaBox>
            <style global jsx>{`
              .course-info-bar:first-child {
                margin-left: 0;
              }
              .weui-media-box {
                padding: 5px !important;
              }
              .course-info-bar .weui-media-box__title {
                margin-bottom: 0 !important;
              }
            `}</style>
          </div>
        </a>
      </Link>
    )
  }
}
