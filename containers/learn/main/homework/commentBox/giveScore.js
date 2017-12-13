import React from 'react'
import AxiosUtil from '/util/axios'
import LoadingIcon from '/xz-components/loadingicon'

export default class extends React.Component {
  maxScore = 5
  constructor (props) {
    super(props)
    this.state = {
      score: false,
      canEvaluate: false
    }
  }

  componentDidMount = async () => {
    let {score} = this.props
    if (score) {
      this.setState({
        score: score,
        canEvaluate: false
      })
    } else {
      this.setState({
        score: 0,
        canEvaluate: true
      })
    }
  }

  evaluateScore = async () => {
    let {evaluateId} = this.props
    let {score} = this.state
    await AxiosUtil.get(`/api/work/evaluateFeedback/${evaluateId}?score=${score}`)
    this.setState({canEvaluate: false})
  }

  renderStar () {
    let {score} = this.state
    let starsdiv = []
    for (let i = 0; i < this.maxScore; i++) {
      starsdiv.push(<div key={i} onClick={() => { this.setScore(i + 1) }}>
        <img src={i < score ? '/static/img/study/homework-score-on.png' : '/static/img/study/homework-score-off.png'} />
      </div>)
    }
    return (<div className='star-line'>
      {starsdiv}
      <style>{`
      .star-line {
          display: flex;
          flex-wrap: nowrap;
          justify-content: flex-end;
        }
      .star-line img {
        width: 30px;
      }
      `}</style>
      </div>
    )
  }

  setScore (index) {
    let {canEvaluate} = this.state
    if (canEvaluate) {
      this.setState({
        score: index
      })
    }
  }

  renderButton () {
    let {canEvaluate, score} = this.state
    if (canEvaluate && score) {
      return (<div onClick={this.evaluateScore}>提交评分</div>)
    } else {
      return null
    }
  }

  render () {
    let {score} = this.state
    if (score !== null && score !== undefined) {
      return (<div className='evaluate-div' onClick={(e) => { e.stopPropagation() }}>
        {this.renderStar()}
        {this.renderButton()}
        <style jsx>{`
          .evaluate-div {
            width: 100%;
            text-align: right;
          }
        `}</style>
      </div>)
    } else {
      return <LoadingIcon />
    }
  }
}





