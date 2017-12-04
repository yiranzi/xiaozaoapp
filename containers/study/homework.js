import React from 'react'
import AxiosUtil from '../../util/axios'
import HocRenderContent from '/containers/study/hocRenderContent'
// 原始组件
class innerComponent extends React.Component {
  render () {
    let {homeworkData, courseId} = this.props
    if (homeworkData && homeworkData.length > 0) {
      return (<div className='homework'>
        作业id{courseId}
        {homeworkData.map((ele, index) => {
          return (<div key={index}>
            <h1>{ele.title}</h1>
            <p>{ele.question}</p>
          </div>)
        })}
        <style jsx>{`
        .{
        }
      `}</style>
      </div>)
    } else {
      return null
    }
  }
}
// 自定义拉取数据的方法
const getData = async function (courseId) {
  let courseSummaryJson = await AxiosUtil.get(`/api/private/work/workList/${courseId}`)
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

