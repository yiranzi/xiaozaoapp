import React from 'react'
import AxiosUtil from '/util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      starClick: false
    }
  }

  componentDidMount = async () => {
    console.log('componentDidMount seemywork')
  }

  componentWillReceiveProps = async (nextProps) => {
    this.setState({
      starClick: false
    })
  }

  answerClickStar (workAnswerId) {
    // 发送请求。
    AxiosUtil.get(`/api/work/answerStar/${workAnswerId}`)
    // 如果成功则成功。还是直接成功？
    this.setState({
      starClick: true
    })
  }

  render () {
    let {starCount, star, id} = this.props
    if (id) {
      let jsxStyle = <style>{`
      .comment-title-good {
        display: flex;
        align-items: center;
      }
      .comment-title-good img{
        margin: auto 5px auto 5px;
        width: 20px
      }
    `}</style>
      // 如果已经点击
      if (this.state.starClick) {
        return (<div className='comment-title-good'>
          <span>{starCount + 1} </span>
          <img src={'/static/img/study/homework-good-on.png'} />
          {jsxStyle}
        </div>)
      }
      // 如果未点击 但是有star
      if (star) {
        return (<div className='comment-title-good'>
          <span>{starCount}</span>
          <img src={'/static/img/study/homework-good-on.png'} />
          {jsxStyle}
        </div>)
      } else {
        return (<div onClick={() => { this.answerClickStar(id) }} className='comment-title-good'>
          <span>{starCount} </span>
          <img src={'/static/img/study/homework-good-off.png'} />
          {jsxStyle}
        </div>)
      }
    } else {
      return null
    }
  }
}





