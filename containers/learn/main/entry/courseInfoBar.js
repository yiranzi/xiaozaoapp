import React from 'react'
import {
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  MediaBoxInfo
} from 'react-weui'
import Link from 'next/link'

// 渲染内容

export default class extends React.Component {
  render () {
    let {title, des, info, bgImg, category} = this.props
    let boxStyle = {
      marginLeft: '5px',
      width: '150px'
    }
    let fontStyle = {}
    if (category === 'mine') {
      // let bg = bgImg ? bgImg : '#EAEAEA'
      let bg = '/static/img/learn/cover_little.png'
      boxStyle = Object.assign(boxStyle, {background: `url(${bg})`})
      fontStyle = {color: 'white'}
    } else {
      boxStyle = Object.assign(boxStyle, {backgroundColor: '#efeff4'})
    }

    return (
      <Link href={{ pathname: '/learn/course/info', query: { courseId: this.props.courseId } }}>
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
