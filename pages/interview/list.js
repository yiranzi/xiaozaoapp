import React from 'react'
import AxiosUtil from '../../util/axios'
import ThemeConfig from '../../config/theme'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'

const intro = {
  'day1': '/static/img/interview/day1.png',
  'day2': '/static/img/interview/day2.png',
  'day3': '/static/img/interview/day3.png',
  'day4': '/static/img/interview/day4.png',
  'day5': '/static/img/interview/day5.png',
  'day6': '/static/img/interview/day6.png'
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: '',
      isRender: true,
      error: ''
    }
  }

  componentDidMount = async () => {
    try {
      let list = await AxiosUtil({method: 'get', url: '/api/interview/getList'})
      this.setState({
        list: list,
        isRender: false
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  renderLastDay (list) {
    let {day} = list
    if (day === 7) {
      return (
        <a href=''>
          <div className='interview-item'>
            <div className='icon'><img src='/static/img/interview/train.png'/></div>
            <div className='content'>
              <div className='top'>
                <div className='left'>
                  <div className='title'>解锁管卡 群面综合训练</div>
                </div>
              </div>
            </div>
            <div className='enter-icon'>
              <img src='/static/img/interview/lock.png'/>
            </div>
            <style jsx>{`
              .result {
                border-top: ${ThemeConfig.color.border_gray};
              }
              .sub span {
                background: ${ThemeConfig.color.border_gray};
                color: #fff;
                padding: 0.25rem 0.5rem;
                border-radius: 1rem;
              }
              .enter-icon img {
                width: 1.5rem;
              }
            `}</style>
          </div>
        </a>
      )
    } else {
      return (
        <div className='interview-item'>
          <div className='icon'><img src='/static/img/interview/train.png'/></div>
          <div className='content'>
            <div className='top'>
              <div className='left'>
                <div className='title'>解锁管卡 群面综合训练</div>
              </div>
            </div>
          </div>
          <div className='enter-icon'>
            <img src='/static/img/interview/lock.png'/>
          </div>
          <style jsx>{`
            .result {
              border-top: ${ThemeConfig.color.border_gray};
            }
            .sub span {
              background: ${ThemeConfig.color.border_gray};
              color: #fff;
              padding: 0.25rem 0.5rem;
              border-radius: 1rem;
            }
            .enter-icon img {
              width: 1.5rem;
            }
          `}</style>
        </div>
      )
    }

  }

  renderComplete (complete) {
    return (
      <div>
        {complete
          ? <div><img src='/static/img/interview/finish.png'/>已完成</div>
          : <div><img src='/static/img/interview/unfinish.png'/>未完成</div>
        }
      </div>
    )
  }

  toLink (past, topicKey) {
    if (past) {
      location.href = '/interview/review?topicKey=' + topicKey
    }
  }

  renderList (list) {
    let {clock, interviewListDetailDTOList} = list
    if (interviewListDetailDTOList) {
      return interviewListDetailDTOList.map((item, index) => {
        const {day, title, subTitle, topicKey} = item
        let past = item.day < day
        let complete = clock.indexOf(day) >= 0
        return (
          <div key={index} className='interview-item' onClick={() => {this.toLink(past, topicKey)}}>
            <div className='icon'><img src={intro[`day${day}`]}/></div>
            <div className='content'>
              <div className='top'>
                <div className='left'>
                  <div className='title'>第{day}天 {title}</div>
                  <div className='sub-title'>{subTitle}</div>
                </div>
                {past && <div className='right'>
                  {this.renderComplete(complete)}
                </div>}
              </div>
              {past && <div className='bottom'>
                <div className='left'>
                  <div className='sub'>打卡成绩：<span>{item.result}</span></div>
                </div>
                <div className='right'>
                  <div className='sub'><span>{item.completeUser}</span>人完成</div>
                </div>
              </div>}

            </div>
            <div className='enter-icon'> ></div>
            <style jsx>{`
              .result {
                border-top: ${ThemeConfig.color.border_gray};
              }
              .sub span {
                background: ${ThemeConfig.color.border_gray};
                color: #fff;
                padding: 0.25rem 0.5rem;
                border-radius: 1rem;
              }
            `}</style>
          </div>
        )
      })
    } else {
      return <div/>
    }
  }

  render () {
    const {list, isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <Back text='< 返回打卡主页' url='/interview/main'/>
        <div className='interview-list'>
          {this.renderList(list)}
          {this.renderLastDay(list)}
        </div>
        <style global jsx>{`
          .interview {
            padding: 1rem 0 !important;
          }
          .back {
            padding: 0 1rem;
          }
          .interview-list {
            margin-top: 2rem;
          }
          /* 列表样式 */
          .interview-item {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .interview-item:nth-child(odd) {
            background: #fff;
          }
          .interview-item .icon {
            flex: 1;
          }
          .interview-item .icon img {
            width: 100%;
          }
          .interview-item .content {
            flex: 4;
            padding: 0 1rem;
          }
          .interview-item .content .top,
          .interview-item .content .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .interview-item .content .bottom {
            border-top: 1px solid ${ThemeConfig.color.border_gray};
            margin-top: 0.5rem;
            padding-top: 0.5rem;
          }
          .interview-item .content .left {
            flex: 2;
          }
          .interview-item .content .right {
            flex: 1;
            text-align: right;
          }
          .interview-item .content .title {
            font-weight: bold;
          }
          .interview-item .content .sub-title {
            color: ${ThemeConfig.color.font_gray};
          }
          .interview-item .content .right img {
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
