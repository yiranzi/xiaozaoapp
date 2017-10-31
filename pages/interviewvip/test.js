import React from 'react'
import InterviewLayout from '../../containers/interview/layout'

export default class extends React.Component {
  constructor (props) {
    super(props)
    console.log('构造函数')
    // 初始化了我们的state，这是被推荐的语法
    this.state = {
      value: 'value',
      value1: 'value1',
      value2: 'value2'
    }
  }
  // 组件将要被渲染到真实的dom节点中
  componentWillMount () {
    console.log('componentWillMount')
  }
  // 组件已经插入到真实的dom节点中
  componentDidMount () {
    console.log('componentDidMount')
    console.log('-------------接下来的是重新setState后执行的------------------------')

    const _this = this
    setTimeout(() => {
      _this.setState({
        value: 'value00',
        value1: 'value11',
        value2: 'value22'
      })
    }, 1 * 1000)

    // const _this = this

    // setTimeout(function () {
    //   _this.setState({value: 'value00１'})
    // }, 1 * 1000)

    // setTimeout(function () {
    //   _this.setState({value1: 'value11１'})
    // }, 1 * 1000)

    // setTimeout(function () {
    //   _this.setState({value2: 'value22２'})
    // }, 1 * 1000)
  }
  // 组件是否要被重新渲染
  shouldComponentUpdate () {
    console.log('shouldComponentUpdate')
    return true
  }
  // 组件将要被重新渲染
  componentWillUpdate () {
    console.log('componentWillUpdate')
  }
  // 组件已经被重新渲染
  componentDidUpdate () {
    console.log('componentDidUpdate')
    console.log('-------------------componentDidUpdate-------------------')
  }
  // 组件将要接收到新属性
  componnentWillReceiveProps () {
    console.log('componnentWillReceiveProps')
  }

  render () {
    console.log('render')
    const {value, value1, value2} = this.state
    return (
      <InterviewLayout>
        <div>value: {value}</div>
        <div>value1: {value1}</div>
        <div>value2: {value2}</div>
      </InterviewLayout>
    )
  }
}
