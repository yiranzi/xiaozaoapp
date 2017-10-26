import React from 'react'// 库
import {Button} from 'react-weui'// 组件库
import Back from '../../containers/interviewvip/back'
import Tabbar from '../../components/tabbar'
import InterviewLayout from '../../containers/interviewvip/layout'// container
import AxiosUtil from '../../util/axios'


export default class extends React.Component {
  staticIndex = {} // map of {index : date}
  contentArr = []// 文本
  buttonStatusArr = [] // 状态
  buttonDivArr = [] // 按钮

  constructor (props) {
    super(props)
    this.state = {
      isRender: true,
      error: '',
      doubleCheck: null, // 确认状态?
      canSignUp: null, // 能否报名
      stage: null,
      currentSelectStage: null// 当前tabbar选中的
    }
  }

  componentDidMount = async () => {
    try {
      let result = await AxiosUtil.get('/api/interview/stageList')
      let {canSignUp, stage, interviewStageListDTOList} = result
      // 提取并包装数据
      console.log(result)
      this.makeStaicDate(interviewStageListDTOList)
      this.setState({
        canSignUp: canSignUp,
        dateList: interviewStageListDTOList,
        stage: stage
      })
    } catch (e) {
      // 未付费 渲染报错信息.不渲染列表
      this.setState({
        error: e.message
      })
    }
    this.setState({
      isRender: false
    })
  }

  // 制作静态的日期数组
  makeStaicDate (dateList) {
    let content
    this.staticIndex = {}
    this.contentArr = []
    this.buttonStatusArr = []
    this.buttonDivArr = []
    dateList.forEach((data, index) => {
      content = `${data.year}月${data.day}日`
      // 1保存日期
      this.staticIndex[data.id] = content

      // 2保存button内容
      this.contentArr.push(`${content}群面模拟(${data.limitUser})`)

      // 3保存选中状态
      if (!this.state.canSignUp) {
        // 如果未完成 修饰为不可选中
        this.buttonStatusArr.push(false)
      } else {
        // 如果完成 直接复制
        this.buttonStatusArr.push(data.canSignUp)
      }
    })
    // 4制作按钮列表
    this.makeDivByContent()
    // console.log(this.staticIndex)
    // console.log(this.contentArr)
    // console.log(this.buttonStatusArr)
    // console.log(this.buttonDivArr)
  }

  makeDivByContent () {
    let style = {
      backgroundColor: 'red'
    }
    // 1 渲染button样式
    this.buttonDivArr = this.contentArr.map((content, index) => {
      return (<div style={style}>{content}</div>)
    })
  }

  // 根据index返回日期
  indexToDate (index) {
    return this.staticIndex[index]
  }

  render () {
    const {isRender, error} = this.state
    return (
      // 如果异常.在这里处理
      <InterviewLayout isRender={isRender} error={error}>
        <Back text='< 返回' url='/interviewvip/list' />
        {this.renderContent()}
      </InterviewLayout>
    )
  }

  renderContent () {
    console.log('renderContent')
    let view
    // 判定界面类型
    if (this.state.doubleCheck) {
      view = this.renderDoubleCheck()
    } else {
      // 是否已近选中
      if (this.state.stage) {
        view = this.renderHaveChoose()
      } else {
        view = this.renderNotChoose()
      }
    }
    return view
  }

  /*
   已经选中
   */
  renderHaveChoose () {
    console.log('renderHaveChoose')
  }

  /*
   未选中
   */
  renderNotChoose () {
    console.log('renderNotChoose')
    return (<div>
      {this.addTitle()}
      {this.addTabbar()}
      {this.addRuleContent()}
      {this.addBottom()}
    </div>)
  }

  // 添加标题
  addTitle () {
    console.log('addTitle')
    if (this.state.canSignUp) {
      return (
        <div>
          <p>恭喜您已完成所有模块任务，</p>
          <p>赶快选择线上群面模拟时间吧~</p>
        </div>
      )
    } else {
      return (<div>
        <p>您尚未完成所有模块任务，</p>
        <p>无法选择线上群面模拟时间哦~</p>
      </div>)
    }
  }

  // 添加tabbar
  addTabbar () {
    console.log('addTabbar')
    let normalStyle = {

    }
    let chooseStyle = {

    }
    let disabledStyle = {

    }
    return (
      <Tabbar
        currentSelect={this.state.currentSelect}
        buttonStatus={this.buttonStatusArr}
        divArr={this.buttonDivArr}
        normalStyle={normalStyle}
        chooseStyle={chooseStyle}
        disabledStyle={disabledStyle}
        onClickTabbar={this.onClickTabbar}
      />
    )
  }

  onClickTabbar (index) {
    console.log(index)
  }

  // 介绍文本
  addRuleContent () {
    console.log('addRuleContent')
    return (<div>
      <p>群面方式：线上微信群，6 人一组</p>
    </div>)
  }

  // 返回按钮
  addBottom () {
    if (this.state.canSignUp) {
      return (<div>
        <p>返回</p>
        <p>确定</p>
      </div>)
    } else {
      return (
        <div>
          <p>返回</p>
        </div>
      )
    }
  }

  /*
   确认选择页
   */
  renderDoubleCheck () {
    return (
      <div>
        <p>您选择的登录时间傻逼</p>
      </div>
    )
  }
}
