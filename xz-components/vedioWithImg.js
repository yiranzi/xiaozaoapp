import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPlay: false
    }
    this.clickTitle = this.clickTitle.bind(this)
  }

  clickTitle () {
    let {isPlay} = this.state
    if (isPlay) {
      this.setState({
        isPlay: false
      })
      this.refs.video.pause()
    } else {
      this.setState({
        isPlay: true
      })
      this.refs.video.play()
    }
  }

  render () {
    let hideStyle = {display: 'none'}
    let showStyle = {display: 'block'}
    console.log(this.state.isPlay)
    return (
      <div className='vedio-with-img' onClick={this.clickTitle}>
        <video ref='video' style={this.state.isPlay ? showStyle : hideStyle} src={'https://video.xiaozao.org/final.mp4'} />
        <div style={this.state.isPlay ? hideStyle : showStyle} >
          <img src={'/static/img/buygether/buyBg_1.png'} />
        </div>

        <style jsx>{`
          .vedio-with-img {
            height: 210px;
          }
          .vedio-with-img img {
            width: 100%;
            height: 100%;
          }
          .vedio-with-img video {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}
