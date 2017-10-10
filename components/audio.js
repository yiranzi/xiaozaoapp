import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      audioObject: {},
      isPlaying: false,
      duration: 0,
      progress: 0
    }
  }

  componentDidMount () {
    const _this = this
    let audio = new Audio(this.props.src)
    audio.oncanplay = function () {
      _this.setState({
        audioObject: audio,
        duration: audio.duration
      })
    }
  }

  play () {
    const {isPlaying, audioObject} = this.state
    if (isPlaying) {
      audioObject.pause()
      this.setState({isPlaying: false})
    } else {
      audioObject.play()
      this.setState({isPlaying: true})
      this.renderProgress()
    }
  }

  renderProgress () {
    const _this = this
    const {audioObject, duration} = this.state
    let interval = setInterval(function () {
      let currentTime = audioObject.currentTime
      let progress = parseInt(currentTime / duration * 100)
      _this.setState({progress: progress})

      if (progress > 99) {
        _this.setState({progress: 100})
        setTimeout(function () {
          _this.setState({progress: 0, isPlaying: false})
        }, 500)
        clearInterval(interval)
      }
    }, 1000)
  }

  render () {
    const {isPlaying, progress} = this.state
    return (
      <div className='audio-wrapper'>
        <div className='play-btn' onClick={() => {
          this.play()
        }}>
          {isPlaying
            ? <img src='/static/img/audio/pause.png' />
            : <img src='/static/img/audio/play.png' />
          }
        </div>
        <div className='progress'>
          <div className='current' style={{width: `${progress}%`}} />
        </div>
        <style jsx>{`
          .audio-wrapper {
            display: flex;
            align-items: center;
          }
          .play-btn {
            width: 2rem;
            height: 2rem;
            background-color: #2b3a64;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .play-btn img {
            width: 0.75rem;
            height: 1rem;
          }
          .progress {
            background-color: #fdc23e;
            width: 200px;
            height: 5px;
            flex: 1;
            border-top-right-radius: 1em;
            border-bottom-right-radius: 1rem;
          }
          .current {
            background-color: #2b3a64;
            height: 5px;
            border-top-right-radius: 1em;
            border-bottom-right-radius: 1rem;
          }
        `}</style>
      </div>
    )
  }
}
