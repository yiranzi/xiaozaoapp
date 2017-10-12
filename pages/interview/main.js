import React from 'react'
import classNames from 'classnames'
import ThemeConfig from '../../config/theme'
import {Button} from 'react-weui'
import InterviewLayout from '../../containers/interview/layout'
import More from '../../components/more'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRender: true,
      mainintro: '',
      error: ''
    }
  }

  componentDidMount = async () => {
    try {
      let mainintro = await AxiosUtil({
        method: 'get',
        url: '/api/interview/getList'
      })
      this.setState({mainintro: mainintro, isRender: false})
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  renderTop (mainintro) {
    if (mainintro) {
      let title
      const {day, interviewListDetailDTOList} = mainintro
      interviewListDetailDTOList.map((item, index) => {
        if (item.day === day) {
          title = item.title
        }
      })
      let currentDay = 10 + day - 1
      return (
        <div>
          <div className='no'>第{day}天 {title}</div>
          <div className='time'>打卡时间：10月{currentDay}09:00 ~ 23:59:59</div>
        </div>
      )
    }

  }

  renderPrevContent (mainintro) {
    if (mainintro) {
      const {clock, day, interviewListDetailDTOList} = mainintro
      let json = {}
      console.log(mainintro)
      let array = [1, 2, 3, 4, 5, 6, 7]
      return array.map((item, index) => {
        let today = item === day
        let complete = clock.indexOf(item) >= 0
        let noComplete = !complete && item <= day
        return (
          <div
            key={item}
            className={
              classNames(
                'circle',
                {'today': today,
                  'complete': complete,
                  'nocomplete': noComplete})}>
            {item}
            <style jsx>{`
            .circle {
              width: 2.5rem;
              height: 2.5rem;
              text-align: center;
              background: #fff;
              border: 1px solid ${ThemeConfig.color.border_gray};
              border-radius: 3rem;
              line-height: 2.5rem;
            }
            .nocomplete {
              color: #fff;
              background: ${ThemeConfig.color.border_gray}
            }
            .complete {
              color: #fff;
              background: ${ThemeConfig.color.yellow}
            }
          `}</style>
          </div>
        )
      })
    }

  }

  render () {
    const {isRender, mainintro, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div className='header'>
          <img src='/static/img/interview/interview.png'/>
        </div>
        <div className='interview-main'>
          <div className='intro'>
            {this.renderTop(mainintro)}
            <div className='sub'>
              <More
                title='模拟打卡介绍'
                content='模拟打卡内容，模拟打卡内模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，模拟打卡内容，'
                line='4'
              />
            </div>
            <a href='/interview/task'>
              <Button>今日打卡</Button>
            </a>
            <div className='complete'>已有{mainintro.totalUserCount}人完成</div>
            <div className='prev'>
              <div className='title'>往日打卡回顾</div>
              <div className='content'>{this.renderPrevContent(mainintro)}</div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .header img {
            width: 100%;
          }
          .interview-main {
            padding: 1rem;
          }
          .prev {
            margin-top: 2rem;
          }
          .title {
            font-weight: bold;
          }
          .content {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .interview {
            padding: 0 !important;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
