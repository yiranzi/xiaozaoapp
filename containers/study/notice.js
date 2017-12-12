import React from 'react'
import AxiosUtil from '../../util/axios'
import HocRenderContent from '/containers/study/hocRenderContent'
import {
  Panel,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription
} from 'react-weui'
// 原始组件
class innerComponent extends React.Component {
  render () {
    let {data, courseId} = this.props
    if (data && data.length > 0) {
      return (<Panel className='introduce'>
        课程id{courseId}
        {data.map((ele, index) => {
          return (<MediaBox key={index}>
            <MediaBoxTitle>{ele.title}</MediaBoxTitle>
            <MediaBoxDescription>{ele.content}</MediaBoxDescription>
          </MediaBox>)
        })}
      </Panel>)
    } else {
      return null
    }
  }
}
// 自定义拉取数据的方法
const getData = async function (courseId) {
  let courseSummaryJson = await AxiosUtil.get(`/api/learning/courseNotice/${courseId}`)
  return courseSummaryJson
}

// 返回包裹后的组件
export default class extends React.Component {
  RenderComponent = HocRenderContent(innerComponent, getData)

  render () {
    let RenderComponent = this.RenderComponent
    return (<div>
      <RenderComponent courseId={this.props.courseId} />
    </div>)
  }
}