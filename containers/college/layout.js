import React from 'react'
import { Toptips } from 'react-weui'
import Layout from '../../components/layout'
import Loading from '../../xz-components/loading'
import Tabbar from '../../components/footer'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      toptips: {
        type: 'default', /* default primary info warn */
        show: false,
        msg: null,
        callback: null
      }
    }
  }

  componentDidUpdate () {
    if (this.state.toptips.show) {
      const _this = this
      setTimeout(function () {
        if (typeof _this.state.toptips.callback === 'function') {
          _this.state.toptips.callback()
        }
        _this.setState({
          toptips: {
            show: false
          }
        })
      }, 1500)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.toptips && nextProps.toptips.show) {
      this.setState({
        toptips: nextProps.toptips
      })
    }
  }

  renderChildren () {
    const { isRender, error } = this.props
    if (isRender) {
      return <Loading />
    } else if (error) {
      const show = true
      return <Toptips type='warn' show={show} >{error}</Toptips>
    } else {
      return (
        <div className='college wx-line'>
          {this.props.children}
          <style jsx>{`
            .college {

            }
          `}</style>
        </div>
      )
    }
  }
  render () {
    return (
      <Layout>
        {this.state.toptips.show &&
          <Toptips type={this.state.toptips.type} show={this.state.toptips.show}>
            {this.state.toptips.msg}</Toptips>
        }
        {this.props.tabbar !== null &&
          <Tabbar tab={this.props.tabbar}>
            {this.renderChildren()}
          </Tabbar>
        }
        {!(this.props.tabbar !== null) && this.renderChildren()}
        <style global jsx>{`
          body {
            font-size: 14px;
          }
          .main {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        `}</style>
      </Layout>
    )
  }
}
