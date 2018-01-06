import React from 'react'
import {Panel, MediaBox, MediaBoxTitle, MediaBoxDescription} from 'react-weui'
import AxiosUtil from '/util/axios'
import HocRenderContent from '/containers/learn/main/hocRenderContent'
// 原始组件
class innerComponent extends React.Component {
  render () {
    let {data} = this.props
    if (data && data.length > 0) {
      return (<div className='introduce-div'>
        {data.map((ele, index) => {
          return (<div className='introduce-section' key={index}>
            <h1>{ele.title}</h1>
            <p className='content'>{ele.content}</p>
          </div>)
        })}
        <style jsx>{`
        .introduce-div {
          text-align: left;
          padding: 10px;
        }
        .introduce-section {
          margin: 10px auto;
        }
        .introduce-section h1 {
          font-size: 16px;
        }
        .introduce-section .content {
          font-size: 14px;
        }
      `}</style>
      </div>)
    } else {
      return (
        <Panel className='introduce'>
          <MediaBox>
            <MediaBoxTitle />
            <MediaBoxDescription style={{display: 'block'}}>
              本课程暂无概述
            </MediaBoxDescription>
          </MediaBox>
        </Panel>
      )
    }
  }
}
// 自定义拉取数据的方法
const getData = async function (courseId) {
  let courseSummaryJson = await AxiosUtil.get(`/api/learning/courseSummary/${courseId}`, true)
  return courseSummaryJson
}

// 返回包裹后的组件
export default class extends React.Component {
  RenderComponent = HocRenderContent(innerComponent, getData)
  render () {
    let RenderComponent = this.RenderComponent
    return (<RenderComponent {...this.props} />)
  }
}