import React from 'react'// 库
import {Button} from 'react-weui'// 组件库
import Card from '../../components/card'
import Back from '../../containers/interviewvip/back'
import Tabbar from '../../components/tabbar'
import InterviewLayout from '../../containers/interviewvip/layout'// container
import AxiosUtil from '../../util/axios'

import ThemeConfig from '../../config/theme'


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
      classUrl: null, // 面试二维码
      currentSelect: null// 当前tabbar选中的
    }
  }

  postInterviewTime = async () => {
    // 发送请求1
    let stageId = this.state.interviewInfoList[this.state.currentSelect].id
    try {
      await AxiosUtil.get(`/api/interview/signUp/${stageId}`)
    } catch (e) {
      alert(e.message)
    }
    // 回到主界面
    this.setState({
      doubleCheck: false
    })
    // 如果正常 重新请求
    await this.updataStatus()
  }

  componentDidMount = async () => {
    try {
      await this.updataStatus()
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
    this.setState({
      isRender: false
    })
  }

  // 获取面试信息 并且更新静态数据
  updataStatus = async () => {
    let result = await AxiosUtil.get('/api/interview/stageList')
    let {canSignUp, stage, interviewStageListDTOList, classUrl} = result
    // 提取并包装数据
    this.setState({
      canSignUp: canSignUp,
      interviewInfoList: interviewStageListDTOList,
      stage: stage,
      currentSelect: null,
      classUrl: classUrl
    }, () => {
      this.makeStaicDate()
    })
  }

  // 制作静态的日期数组
  makeStaicDate () {
    let {interviewInfoList} = this.state
    let content
    this.staticIndex = {}
    this.contentArr = []
    this.buttonStatusArr = []
    this.buttonDivArr = []
    interviewInfoList.forEach((data, index) => {
      content = `${data.month}月${data.day}日`
      // 1保存日期
      this.staticIndex[data.id] = content

      // 2保存button内容
      this.contentArr.push(`${content}群面模拟(${data.limitUser - data.signUpUser})`)

      // 3保存选中状态
      if (!this.state.canSignUp) {
        // 如果未完成 修饰为不可选中
        this.buttonStatusArr.push(false)
      } else {
        // 如果完成 直接复制
        this.buttonStatusArr.push(data.canSignUp)
      }
    })
    // 4制作按钮列表tt
    this.makeDivByContent()
  }

  makeDivByContent () {
    // 1 渲染button样式
    this.buttonDivArr = this.contentArr.map((content, index) => {
      return (this.renderButton(content))
    })
  }

  renderButton (content) {
    let style2 = {
      color: 'inherit',
      backgroundColor: 'inherit',
      borderRadius: '5px',
      borderColor: 'inherit',
      borderStyle: 'solid',
      borderWidth: '1px',
      textAlign: 'center',
      lineHeight: '2rem',
    }
    return (<div style={style2}>{content}</div>)
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
        {!isRender && this.renderContent()}
      </InterviewLayout>
    )
  }

  renderContent () {
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
    let backButton = {
      borderRadius: '10px',
      width: '40%',
      borderColor: `${ThemeConfig.color.blue}`,
      backgroundColor: `${ThemeConfig.color.blue}`,
      color: 'white',
      margin: 'auto'
    }

    let chooseStyle = {
      borderRadius: '10px',
      backgroundColor: `${ThemeConfig.color.yellow}`,
      borderColor: `${ThemeConfig.color.yellow}`,
      color: 'white',
      margin: 'auto'
    }

    // 获取stage
    // 用stage 换取
    let date = this.indexToDate(this.state.stage)
    let dateDiv = <div style={chooseStyle}>{this.renderButton(`${date}群面模拟`)}</div>

    return (
      <div className='main'>
        <div className='title'>
          {this.addTitleFactory(`您选择的模拟面试时间是`)}
        </div>
        <Card content={dateDiv} />
        <div className='intro'>
          <p>我们会在您选择群面模拟日期的</p>
          <p><span className='red'>上午 9:00 </span>上线案例模拟群二维码</p>
          <p>请到时查看并加群哦！</p>
        </div>
        <img className='qr-code' src={this.state.classUrl} />
        <div className='bottom'>
          <div className='button-bar' key={1} style={backButton} onClick={this.buttonClick.bind(this, 'back')}>
            {this.renderButton('确定')}
          </div>
        </div>
        <style jsx>
          {
            `
            .qr-code {
              width: 80%;
            }
            .red {
              color: red;
            }
            .intro{
              margin: 10px auto 10px auto;
            }
            .main{
              text-align: center;
            }
            .title {
              margin: 10px auto 20px auto;
            }
            .bottom{
              {/*position: fixed;*/}
              {/*left: 0;*/}
              {/*bottom: 10px;*/}
              width: 100%;
              display: flex;
              justify-content: center;
            }
            .button-bar{
            }
            `
          }
        </style>
      </div>
    )
  }

  /*
   未选中
   */
  renderNotChoose () {
    return (<div>
      <div className='title'>{this.addTitle()}</div>

      {this.addTabbar()}
      {this.addRuleContent()}
      <div className='button'>{this.addBottom()}</div>
      <style jsx>
        {`
        .button{
          margin-top: 10px;
          {/*position: fixed;*/}
          {/*left: 0;*/}
          {/*bottom: 10px;*/}
          width: 100%
          }
        .title {
          margin: 10px auto 20px auto;
        }`}
      </style>
    </div>)
  }

  // 添加标题
  addTitle () {
    let divStyle = {
      textAlign: 'center',
      color: `${ThemeConfig.color.dark_black}`,
      fontWeight: 'bold',
      fontSize: `${ThemeConfig.size.large}`
    }
    if (this.state.canSignUp) {
      return (this.addTitleFactory('恭喜您已完成所有模块任务，', '赶快选择线上群面模拟时间吧~'))
    } else {
      return (this.addTitleFactory('您尚未完成所有模块任务，', '无法选择线上群面模拟时间哦~'))
    }
  }

  // 添加标题
  addTitleFactory (line1, line2) {
    let divStyle = {
      textAlign: 'center',
      color: `${ThemeConfig.color.dark_black}`,
      fontWeight: 'bold',
      fontSize: `${ThemeConfig.size.large}`
    }
    return (
      <div style={divStyle}>
        <p>{line1}</p>
        <p>{line2}</p>
      </div>
    )
  }

  // 添加tabbar
  addTabbar () {
    let normalStyle = {
      borderRadius: '10px',
      borderColor: `${ThemeConfig.color.yellow}`,
      backgroundColor: `white`
    }
    let chooseStyle = {
      borderRadius: '10px',
      backgroundColor: `${ThemeConfig.color.yellow}`,
      borderColor: `${ThemeConfig.color.yellow}`,
      color: 'white'
    }
    let disabledStyle = {
      borderRadius: '10px',
      borderColor: `${ThemeConfig.color.border}`,
      backgroundColor: `white`,
      color: `${ThemeConfig.color.content}`
    }
    return (<Card
      content={
        <Tabbar
          currentSelect={this.state.currentSelect}
          buttonStatus={this.buttonStatusArr}
          divArr={this.buttonDivArr}
          normalStyle={normalStyle}
          chooseStyle={chooseStyle}
          disabledStyle={disabledStyle}
          onClickTabbar={this.onClickTabbar.bind(this)}
        />
      }
    />)
  }

  // tabbar回调
  onClickTabbar (index) {
    if (this.state.canSignUp) {
      if (this.state.interviewInfoList[index].canSignUp) {
        this.setState({
          currentSelect: index
        })
      }
    }
  }

  // 介绍文本
  addRuleContent () {
    return (<div className='text'>
      <p>群面方式：线上微信群，6 人一组</p>
      <p>群面时间：多时段可选，任选一期</p>
      <p>参与规则：参加线上模拟需要先完成所有模块的学习，学完后模拟更有效哦</p>
      <p>人数限制：每个时间段开放 300 个名额，若报满 300 人，则该期无法再选择；若报名人数不到6人，则该期取消，可选择其他期数</p>
      <style jsx>{
        `
        .text {
          line-height: 1.5rem;
          margin-left: 15px;
          color: ${ThemeConfig.color.content};
        }
        `
      }</style>
    </div>)
  }

  // 返回按钮
  addBottom () {
    let backButton1 = {
      borderRadius: '10px',
      width: '45%',
      backgroundColor: `${ThemeConfig.color.yellow}`,
      color: `${ThemeConfig.color.dark_black}`,
      margin: 'auto',
      borderColor: `${ThemeConfig.color.yellow}`
    }

    let backButton2 = {
      borderRadius: '10px',
      width: '45%',
      borderColor: `${ThemeConfig.color.content}`,
      backgroundColor: `${ThemeConfig.color.gray}`,
      margin: 'auto',
      color: `${ThemeConfig.color.content}`
    }

    let sureButon = {
      borderRadius: '10px',
      width: '45%',
      borderColor: `${ThemeConfig.color.blue}`,
      backgroundColor: `${ThemeConfig.color.blue}`,
      margin: 'auto',
      color: 'white'
    }

    let arr = []

    if (this.state.canSignUp) {
      arr.push(
        <div key={1} style={backButton2} onClick={this.buttonClick.bind(this, 'back')}>
          {this.renderButton('返回')}
        </div>)
      arr.push(
        <div key={2} style={sureButon} onClick={this.buttonClick.bind(this, 'sure')}>
          {this.renderButton('确定')}
        </div>)
    } else {
      arr.push(
        <div key={3} style={backButton1} onClick={this.buttonClick.bind(this, 'back')}>
          {this.renderButton('返回')}
        </div>)
    }

    return (
      <div className='button-bar'>
        {arr}
        <style>
          {`
          .button-bar{
            display: flex;
            justify-content: space-between;
          }
          `}
        </style>
      </div>)
  }

  buttonClick (type) {
    switch (type) {
      case 'double-cancel':
        this.setState({
          doubleCheck: false
        })
        break
      case 'double-sure':
        this.postInterviewTime()
        break
      case 'sure':
        if (this.state.currentSelect === null) {
          alert('选择一个面试时间')
          break
        }
        this.setState({
          doubleCheck: true
        })
        break
      case 'back':
        location.href = '/interviewvip/list'
        break
      default:
        console.log(type)
    }
  }

  /*
   确认选择页
   */
  renderDoubleCheck () {
    let stageId = this.state.interviewInfoList[this.state.currentSelect].id
    return (
      <div>
        <div className='title'>
          {this.addTitleFactory(`您当前选择的是${this.indexToDate(stageId)}群面模拟`, '请再次确认,一旦确认无法更改时间哦!')}
        </div>
        {this.renderDoubleSureButton()}
        <style jsx>
          {
            `
            .title {
              margin: 10px auto 20px auto;
            }
            `
          }
        </style>
      </div>
    )
  }

  renderDoubleSureButton () {
    let backButton = {
      borderRadius: '10px',
      width: '45%',
      borderColor: `${ThemeConfig.color.content}`,
      backgroundColor: `${ThemeConfig.color.gray}`,
      margin: 'auto',
      color: `${ThemeConfig.color.content}`
    }

    let sureButon = {
      borderRadius: '10px',
      width: '45%',
      borderColor: `${ThemeConfig.color.blue}`,
      backgroundColor: `${ThemeConfig.color.blue}`,
      margin: 'auto',
      color: 'white'
    }

    let arr = []
    arr.push(
      <div key={1} style={backButton} onClick={this.buttonClick.bind(this, 'double-cancel')}>
        {this.renderButton('再看看')}
      </div>)
    arr.push(
      <div key={2} style={sureButon} onClick={this.buttonClick.bind(this, 'double-sure')}>
        {this.renderButton('确定了')}
      </div>)
    return (
      <div className='button-bar'>
        {arr}
        <style>
          {`
          .button-bar{
            display: flex;
            justify-content: space-between;
          }
          `}
        </style>
      </div>)
  }
}
