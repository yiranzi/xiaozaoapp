<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import React from 'react';
export default class extends React.Component {
=======
import React from 'react'
import UserAction from '../../../../src/action/writtentestclock/user'
import AnswerAction from '../../../../src/action/writtentestclock/answer'
import { Toptips } from 'react-weui'
import classnames from 'classnames'
export default class extends React.Component {
  themeConfig = {
    color: '#fe5c4b',
    btnColor: '#fff08b'
  }
  constructor (props) {
    super(props)
    this.state = {
      showPage: false,
      checkedLevel: 0,
      tipsMsg: ''
    }
  }
  componentDidMount = async () => {
    try {
      const info = await UserAction.getInfo()
      const result = await AnswerAction.getTest()
      const { completeDay } = info
      const checkedList = completeDay.filter(item => item)
      let length = checkedList.length
      if (result.answerDTOList.length) length++

      let checkedLevel = 0

      if (length >= 3 && length < 5) {
        checkedLevel = 1
      } else if (length == 5) {
        checkedLevel = 2
      } else if (length > 5) {
        checkedLevel = 3
      }

      this.setState({
        checkedLevel,
        showPage: true
      })
    } catch (error) {
      this.setState({
        showPage: true,
        tipsMsg: error.message
      })
    }
  }

>>>>>>> update: eslinit code style
  renderGlobalCss () {
    return (
      <style global jsx>{`
          .written-test-clock {
              padding: 0!important;
          }
      `}</style>
    )
  }
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
  render () {
=======
  chooseCoupon = (v) => {
    const { checkedLevel } = this.state
    if (checkedLevel === v) {
      switch (v) {
        case 1:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=w0jbjbrm'
          break
        case 2:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=48jrv06d'
          break
        case 3:
          location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=37z6iy1k'
          break
        default:
      }
    }
  }
  render () {
    const { showPage, tipsMsg, checkedLevel } = this.state
    if (!showPage) return <div />
    if (tipsMsg) {
      return <Toptips type='warn' show> {tipsMsg} </Toptips>
    };
>>>>>>> update: eslinit code style
    return (
      <div>
        <img src='/static/writtentestclock/preview-prize-detail.jpeg' className='prize-detail-img' />
        <style jsx>{`
          .prize-detail-img {
            width: 100vw;
          }
        `}</style>
        {this.renderGlobalCss()}
      </div>
    )
  }
}
