import React from 'react'
import AxiosUtil from '/util/axios'
import HocRenderContent from '/containers/learn/main/hocRenderContent'
// 原始组件
class innerComponent extends React.Component {
  render () {
    let {data, courseId} = this.props
    if (data && data.length > 0) {
      return (<div className='introduce'>
        课程id{courseId}
        {data.map((ele, index) => {
          return (<div key={index}>
            <h1 className='title'>{ele.title}</h1>
            <p className='content'>{ele.content}</p>
          </div>)
        })}
        <style jsx>{`
        .introduce {
          text-align: left
        }
        .introduce .title {
          font-size: 16px;
        }
        .introduce .content {
          font-size: 14px;
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
  let courseSummaryJson = await AxiosUtil.get(`/api/learning/courseSummary/${courseId}`)
  return courseSummaryJson
}

// 返回包裹后的组件
export default class extends React.Component {
  RenderComponent = HocRenderContent(innerComponent, getData)
  render () {
    let RenderComponent = this.RenderComponent
    return (<RenderComponent courseId={this.props.courseId} />)
  }
}