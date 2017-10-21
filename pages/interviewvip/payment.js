import React from 'react'
import InterviewLayout from '../../containers/interviewvip/layout'
import Back from '../../containers/interviewvip/back'
import GetPayInfo from '../../util/getPayInfo'

// 报名付费页

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      payInfo: null,
      canBuy: null,
      payStatus: null,
      isRender: true,
      error: ''
    }
  }

  componentDidMount = async () => {
    try {
      // 获取付费价格
      let payInfo = await GetPayInfo.getPayInfo()
      this.setState({
        payInfo: payInfo,
      })
      let payStatus = GetPayInfo.getPayStatus()
      if (payStatus === true) {
        // 如果已经付费 跳转
        this.goPath('list')
      } else {
        this.setState({
          isRender: false,
          payStatus: payStatus,
          canBuy: GetPayInfo.getCanBuy(),
        })
      }
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <Back text='< 返回介绍页' url='/interviewvip/introPage' />
        {!isRender && <div className='page'>
          <p>payment page</p>
        </div>}
        <style jsx>{`
        .page{
          padding-bottom: 50px;
          width: 100%;
        }
      `}</style>
      </InterviewLayout>
    )
  }

}
