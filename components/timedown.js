import React from 'react'

export default class Loading extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timedown: this.props.limitTime * 60
    }
  }

  componentDidMount () {
    let interval = setInterval(() => {
      let {timedown} = this.state
      if (timedown >= 1) {
        this.setState({
          timedown: timedown - 1
        })
      } else {
        clearInterval(interval)
        this.props.timeDown()
      }
    }, 1 * 1000)
  }

  renderLeftTime () {
    let {timedown} = this.state
    let minute = parseInt(timedown / 60)
    let second = timedown % 60
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second
    return `${minute} : ${second}`
  }

  render () {
    return (
      <div className='timedown'>
        {this.renderLeftTime()}
      </div>
    )
  }
}
