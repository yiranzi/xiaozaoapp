import React from 'react'
/**
 * 滚屏
 * 初始化数组
 * 时间间隔
 *
 */
export default class extends React.Component {
  schoolStaticName = [
    '广东外语外贸大学',
    '江西财经大学',
    '首都经济贸易大学',
    '厦门大学'
  ]
  classStaticNmae = [
    '商业敏感度课程',
    'PPT 课程',
    'EXCEL 课程',
    'Desk research课程'
  ]
  cardCount = [1, 3, 7, 36]
  staticDate = []

  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0
    }
    this.setInterval = this.setInterval.bind(this)
    this.makeArr = this.makeArr.bind(this)
  }

  makeArr () {
    let stringA = this.schoolStaticName
    let stringB = this.classStaticNmae
    let stringC = this.cardCount
    let count = 10
    let arr = []
    while (count > 0) {
      count--
      let randomValueA = parseInt(stringA.length * Math.random())
      let randomValueB = parseInt(stringB.length * Math.random())
      let randomValueC = parseInt(stringC.length * Math.random())
      arr.push(<div>{`来自${stringA[randomValueA]}大学的同学购买了${stringC[randomValueC]}张能力卡`}<br />{`预报名${stringB[randomValueB]}。`}</div>)
    }
    this.staticDate = arr
  }

  componentDidMount () {
    this.makeArr()
    this.setInterval()
  }

  setInterval () {
    window.setInterval(() => {
      let {currentIndex} = this.state
      currentIndex++
      if (currentIndex > this.staticDate.length - 1) {
        currentIndex = 0
      }
      this.setState({
        currentIndex: currentIndex
      })
    }, this.props.interval)
  }

  render () {
    console.log(this.staticDate[this.state.currentIndex])
    return (<div className='content'>
      {this.staticDate.length > 0 && this.staticDate[this.state.currentIndex]}
      <style jsx>{`
        .content {
          font-size: 12px
        }
      `}</style>
    </div>)
  }
}
