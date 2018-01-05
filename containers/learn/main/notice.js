import React from 'react'
import AxiosUtil from '/util/axios'
import HocRenderContent from '/containers/learn/main/hocRenderContent'
import {
  Panel,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription
} from 'react-weui'
import DateUtil from '/util/date'
// 原始组件
class innerComponent extends React.Component {
  goRouter (path) {
    if (path) {
      location.href = path
    }
  }

  render () {
    let {data} = this.props
    let fontSize = '14px'
    if (data && data.length > 0) {
      return (<Panel className='introduce'>
        {data.map((ele, index) => {
          let createTime = DateUtil.format(ele.createTime, 'yyyy-MM-dd')
          return (<MediaBox key={index} onClick={() => { this.goRouter(ele.path) }}>
            {ele.type && <MediaBoxTitle style={{fontSize: fontSize, fontWeight: 'bold'}}>
              {ele.type}
            </MediaBoxTitle>}
            <div className='introduce-title' style={{fontSize: fontSize}}>
              <p>{ele.title}</p>
              <p className='create-time'>{createTime}</p>
              <style jsx>{`
                .introduce-title {
                  display: flex;
                  justify-content: space-between;
                  margin: 8px auto;
                }
              `}</style>
            </div>
            <MediaBoxDescription style={{display: 'block', fontSize: fontSize}}>
              <span dangerouslySetInnerHTML={{__html: ele.content}} />
            </MediaBoxDescription>
          </MediaBox>)
        })}
      </Panel>)
    } else {
      return (
        <Panel className='introduce'>
          <MediaBox>
            <MediaBoxTitle />
            <MediaBoxDescription style={{display: 'block'}}>
            暂无公告
            </MediaBoxDescription>
          </MediaBox>
        </Panel>
      )
    }
  }
}
// 自定义拉取数据的方法
const getData = async function (courseId) {
  let courseSummaryJson = await AxiosUtil.get(`/api/learning/courseNotice/${courseId}`, true)
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