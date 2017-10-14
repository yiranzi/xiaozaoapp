import React from 'react'
import AxiosUtil from '../../util/axios'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'
import IntroContent from '../../containers/interview/introcontent'

const intro = IntroContent;

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lastDay: null,
      isLoaded: false
    }
  }

  componentDidMount = async () => {
    this.queryResultData()
  }

  queryResultData = async () => {
    try {
      let lastDay = await AxiosUtil({
        method: 'get',
        url: '/api/interview/getLatest'
      })
      console.log(lastDay)
      this.setState({
        lastDay: lastDay,
        isLoaded: true
      })
    } catch (e) {
      console.log(e)
      this.setState({
        lastDay: e,
        isLoaded: true
      })
    }
  }

  render () {
    return (
      <InterviewLayout >
        <Back text='< 返回打卡主页' url='/interview/main' />
        <div className='intro-content'>
          <h4 className='center'>群面说明</h4>
          <br/>
          <p>重要!本次小灶群面7天闪电计划，前六天是以群面技能为主的自主学习训练，我们期望同学们可以通过技能训练，对群面能够有更直观的入门认知；</p>
          <br/>
          <p>第七天，我们会筛选安排一次在线的群面模拟，为保证群面模拟质量，只有能够连续完成前6天打卡且正确率达到 70% 以上前的500名同学，才能最终解锁第7天线上模拟群面参与权限。（前500名同学，以做题正确率及做题所用时间作为排名标准，在正确率相同的情况下，以同学们的答题时间为标准，答题时间越短，则排名越靠前）同学们的排名获得参与权限后，获得精选案例材料，在小灶的组织下和同学们进行线上模拟。</p>
          <br/>
          <p className='text-left'><a href='https://shimo.im/doc/irJ89r3BN2cbpTXn?r=9GPEG9' target='_blank'>点击查看群面模拟规则</a></p>
          <br/>
          <div>
            {(this.state.isLoaded && this.state.lastDay == null) &&
              <p className='center'>{this.state.lastDay.message}</p>
            }
            {(this.state.isLoaded && this.state.lastDay != null) &&
              <div>
                {this.state.lastDay.classUrl &&
                  <div className='center'>
                    <h4>专属二维码</h4>
                    <p><b>您的总正确率为{this.state.lastDay.accuracy}%，总答题时间进入前500名，恭喜您获得第七天打卡资格，下面是您的专属二维码</b></p>
                    <br/>
                    <p><img className='qr-code' src={this.state.lastDay.classUrl}/></p>
                  </div>
                }
                {!this.state.lastDay.classUrl &&
                  <div>
                    <p><b>您的总正确率为{this.state.lastDay.accuracy}%，总答题时间未进入前500名，很遗憾未获得第七天打卡资格</b></p>
                  </div>
                }
              </div>
            }
          </div>
        </div>
        <style jsx>{`
          .center {
            text-align: center;
          }
          .text-left {
            text-left: left;
          }
          .qr-code {
            width: 150px;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
