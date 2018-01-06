import React from 'react'
import AxiosUtil from '/util/axios'
import HocRenderContent from '/containers/learn/main/hocRenderContent'

import ChapterList from './chapterList'

// 自定义拉取数据的方法
const getData = async function (courseId) {
  console.log('getData')
  let menuContent = await AxiosUtil.get(`/api/learning/course/${courseId}`)
  return menuContent
}

// 返回包裹后的组件
export default class extends React.Component {
  RenderComponent = HocRenderContent(ChapterList, getData)
  render () {
    console.log(this.props)
    let RenderComponent = this.RenderComponent
    return (<RenderComponent {...this.props} />)
  }
}