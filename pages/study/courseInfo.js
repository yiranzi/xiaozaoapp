import React from 'react'
import {Tabbar, TabItem} from '/xz-components/tabbar'
import Notice from '/containers/study/notice'
import Homework from '/containers/study/homework'
import Discuss from '/containers/study/discuss'
import Achieve from '/containers/study/achieve'
import Introduce from '/containers/study/introduce'

import ToolsUtil from '../../util/tools'


export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      payStatus: undefined,
      courseId: undefined
    }
  }

  componentDidMount () {
    // 1 获取课程id
    let courseId = ToolsUtil.getQueryString('courseId')
    // 2 根据id拉取数据
    this.setState({
      courseId: 1001
    })
    this.set()
  }

  set = async () => {
    // 2 获取课程的付费状态
    let a = new Promise((resolve) => {
      window.setTimeout(() => {
        console.log('get')
        resolve(true)
      }, 1000)
    })
    await a
    // 3 根据状态设置
    this.setState({
      payStatus: false
    })
    console.log('finish')
  }

  renderTabbar () {
    let tabStyle = {
      display: 'flex'
    }
    return (<div className='course-tab-bar'>
      <Tabbar style={tabStyle}>
        {this.renderByPayStatus()}
        <TabItem title='作业'><Homework /></TabItem>
        <TabItem title='讨论'><Discuss /></TabItem>
        <TabItem title='成就' disabled><Achieve /></TabItem>
      </Tabbar>
      <style jsx>{`
        .course-tab-bar1 {
          display: flex;
          width: 100%;
        }
      `}</style>
    </div>)
  }

  renderByPayStatus () {
    console.log('starttttt')
    console.log(this.state.payStatus)
    if (this.state.payStatus === undefined) {
      console.log('1')
    } else {
      console.log('2')
    }

    if (this.state.payStatus) {
      return (<TabItem title='公告'><Notice /></TabItem>)
    } else {
      return (<TabItem title='概述'><Introduce /></TabItem>)
    }
  }

  renderTopImg () {
    let {payStatus} = this.state
    let content
    if (payStatus) {
      content = <a href={`/study/introduce`}>开始学习</a>

    } else {
      {/*content = <a href={`/payment/buygether`}>报名课程</a>*/}
      content = <a href={`/study/introduce`}>开始学习</a>
    }
    return (<div>
      <img />
      {content}
    </div>)
  }

  render () {
    return (<div>
      {this.renderTopImg()}
      {this.renderTabbar()}
    </div>)
  }
}
