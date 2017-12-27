import React from 'react'
import Router from 'next/router'
import { MediaBox, MediaBoxTitle, MediaBoxDescription } from 'react-weui'
import Button from '../../../../xz-components/button'

export default class extends React.Component {
  jumpTo () {
    let {courseId, questionItem} = this.props
    let url = `/learn/course/detail?courseId=${courseId}&chapterId=${questionItem.chapterId}&pageNumber=${questionItem.pageNumber}`
    Router.push(url)
  }
  render () {
    return (
      <div>
        <div className='wx-text-center'>
          <Button size='small' onClick={() => { this.jumpTo() }}>提交作业</Button>
        </div>
      </div>
    )
  }
}
