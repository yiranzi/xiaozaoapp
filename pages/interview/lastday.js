import React from 'react'
import {Button} from 'react-weui'
import AxiosUtil from '../../util/axios'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'
import IntroContent from '../../containers/interview/introcontent'

const intro = IntroContent;

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lastDay: null
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
      this.setState({
        lastDay: lastDay
      })
    } catch (e) {
      console.log(e)
      this.setState({
        lastDay: e
      })
    }
  }

  render () {
    return (
      <InterviewLayout >
        <Back text='< 返回打卡主页' url='/interview/main' />
        <div className='intro-content'>
          <h4 className='center'>群面说明</h4>
          <br/>{this.state.lastDay}
          <p>[{this.state.lastDay == null}]</p>
          {this.state.lastDay &&
            <div>
              {(this.state.lastDay.status == '10001' || this.state.lastDay.status == '10002') &&
                <p>{this.state.lastDay.message}</p>
              }
              {(this.state.lastDay.status == '200' && this.state.lastDay.response.classUrl) &&
                <div>
                  <h4>专属二维码</h4>
                  <p><img src={this.state.lastDay.response.classUrl}/></p>
                  <p>完成率{this.state.lastDay.response.accuracy}</p>
                </div>
              }
              {(this.state.lastDay.status == '200' && !this.state.lastDay.response.classUrl) &&
                <div>
                  <p>完成率{this.state.lastDay.response.accuracy}</p>
                </div>
              }
            </div>
          }
          <a href='/interview/task'><Button>开始打卡</Button></a>
        </div>
        <style jsx>{`
          .center {
            text-align: center;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
