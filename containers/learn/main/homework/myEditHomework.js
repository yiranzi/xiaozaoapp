import React from 'react'
import Router from 'next/router'
import Button from '../../../../xz-components/button'

export default class extends React.Component {
  jumpTo () {
    let {questionItem, courseId} = this.props
    let {chapterId, pageNumber, sectionId} = questionItem
    Router.push(`/learn/course/detail?courseId=${courseId}&chapterId=${chapterId}&pageNumber=${pageNumber}&sectionId=${sectionId}`)
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
