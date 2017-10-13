import React from 'react'
import classNames from 'classnames'
import ThemeConfig from '../../config/theme'
import {Button} from 'react-weui'
import InterviewLayout from '../../containers/interview/layout'
import Card from '../../components/card'
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
          <div className='time'>打卡时间：10月{currentDay}日 09:00 ~ 23:59:59</div>
          <div className='join'>已有{mainintro.totalUserCount}人报名</div>
          <style jsx>{`
            .no {
              font-size: 1.5rem;
            }
            .time {
              color: ${ThemeConfig.color.font_gray}
            }
            .join {
              text-align: right;
              font-size: 0.9rem;
            }
          `}</style>
        </div>
      )
    }

  }

  goToList (complete) {
    if (complete) {
      location.href = '/interview/list'
    }
  }

  renderPrevContent (mainintro) {
    if (mainintro) {
      const {clock, day} = mainintro
      let array = [1, 2, 3, 4, 5, 6, 7]
      return array.map((item, index) => {
        let today = item === day
        let complete = clock.indexOf(item) >= 0
        let noComplete = !complete && item <= day
        return (
          <div
            key={item}
            onClick={() => {
              this.goToList(complete || noComplete)
            }}
            className={
              classNames(
                'circle',
                {
                  'today': today,
                  'complete': complete,
                  'nocomplete': noComplete
                })}>
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

  renderCompleteUser (mainintro) {
    if (mainintro) {
      const {day, interviewListDetailDTOList} = mainintro
      let array = [1, 2, 3, 4, 5, 6, 7]
      return array.map((item, index) => {
        let today = item === day
        if (today) {
          return interviewListDetailDTOList[index].completeUser
        }
      })
    }

  }

  renderContent (){
    return (
      <div>
        <div className='before'>
          <strong>前六天</strong>：每天一项群面核心技能入门训练，将案例要点快速剖析、强化逻辑思维、商业知识认知、团队分工协作、英文表述突破、英文听力训练六大群面核心技能进行模块化拆分训练，带领大家快速学习，完成群面入门认知！
        </div>
        <div className='last'>
          <strong>第七天</strong>：<span className='important'>重要！</span>连续六天打卡且<span className='important'>正确率达到 70% 以上且答题时间最短的前500名同学</span>，<span>才能</span>最终解锁第7天线上模拟群面参与权限。
        </div>
        <div className='faq'><a href='https://shimo.im/doc/DnOFD1WodlgABtwm?r=NZOD95'><span>更多Q&A</span></a></div>
        <style jsx>{`
          .last {
            margin-top: 1rem;
          }
          .important {
            color: red;
          }
          .faq {
            text-align: right;
          }
          .faq a {
            color: ${ThemeConfig.color.font_gray};
          }
          .faq span {
            border: 1px solid ${ThemeConfig.color.border_gray};
            padding: 0.5rem;
            border-radius: 1rem;
          }
        `}</style>
      </div>
    )
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
              <Card
                title='小灶群面7天闪电计划(初级)'
                content={this.renderContent()}/>
            </div>
            <a href={`/interview/intro?day=${mainintro.day}`}>
              <Button>今日打卡</Button>
            </a>
            <div className='complete'>
              <div className='blank'/>
              <div className='text'>已有{this.renderCompleteUser(mainintro)}人完成</div>
              <div className='blank'/>
            </div>
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
            margin: 2rem 0;
          }
          .title {
            font-weight: bold;
          }
          .content {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
          }
          .sub {
            margin-top: 2rem;
            padding: 0.5rem 0;
            border-top: 1px solid ${ThemeConfig.color.border_gray};
          }
          .complete {
            display: flex;
            justify-content: center;
            font-size: 0.9rem;
            margin-top: 1rem;
          }
          .complete .blank,
          .complete .text {
            flex: 1;
            text-align: center;
          }
          .complete .blank {
            border-top: 1px solid ${ThemeConfig.color.border_gray};
            margin-top: 0.6rem;
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
