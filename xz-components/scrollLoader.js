import React from 'react'
import PropTypes from 'prop-types'

export default class ScrollLoader extends React.Component {
  scrollTimer = true
  finish = false
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
    this.scrollHandler = this.scrollHandler.bind(this)
    this.finish = this.finish.bind(this)
  }

  finish () {
    this.finish = true
  }

  resolveLoading () {
    this.setState({
      loading: false
    })
  }

  scrollHandler (e) {
    // 没在timer 没已完成 没loading
    if (this.scrollTimer && !this.finish && !this.state.loading) {
      let target = e.target
      let scrollPercent = Math.floor(( (target.scrollTop + target.clientHeight) / target.scrollHeight) * 100)
      console.log(scrollPercent)
      if (scrollPercent > 0.85) {
        this.setState({
          loading: true
        })
        this.props.onLoadMore(this.resolveLoading, this.finish)
      }
      console.log('123')
      this.scrollTimer = false
      window.setTimeout(() => {
        this.scrollTimer = true
      }, 500)
    }
  }

  render () {
    return (
      <div className='scroll' onScroll={this.scrollHandler}>
        {this.props.children}
        <style jsx>{`
          .scroll {
            height: 100vh;
            overflow: scroll;
          }
        `}</style>
      </div>
    )
  }
}
