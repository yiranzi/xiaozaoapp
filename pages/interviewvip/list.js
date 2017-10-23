import React from 'react'
import ThemeConfig from '../../config/theme'
import InterviewLayout from '../../containers/interviewvip/layout'
import CourseInfo from '../../util/getCourseInfo'

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
      let list = await CourseInfo.getList('list')
      this.setState({
        list: list
      })
    } catch (e) {
      // 未付费 渲染报错信息.不渲染列表
      this.setState({
        error: e.message
      })
    }
    this.setState({
      isRender: false
    })
    // result page
    // let result = CourseInfo.isLast('1-1')
  }

  toLastDay () {
    location.href = '/interview/lastday'
  }

  renderLastDay (list) {
    return (
      <div className='interview-item' onClick={() => {
        this.toLastDay()
      }}>
        <div className='icon'><img src='/static/img/interview/train.png' /></div>
        <div className='content'>
          <div className='top'>
            <div className='left'>
              <div className='title'>解锁关卡 群面综合训练</div>
            </div>
          </div>
        </div>
        <div className='enter-icon'>
          <img src='/static/img/interview/lock.png' />
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

  renderComplete (complete) {
    return (
      <div>
        {complete
          ? <div className='icon'><img src='/static/img/interview/finish.png' />已完成</div>
          : <div className='icon'><img src='/static/img/interview/unfinish.png' />未完成</div>
        }
      </div>
    )
  }

  toLink (showResult, topicKey) {
    location.href = '/interview/review?topicKey=' + topicKey
  }

  renderGroupTitle (groupName) {
    return (<div>{groupName}</div>)
  }

  renderGroupContain (topic) {
    return( <div>{topic.subTitle}</div>)
  }

  renderProcess (topic) {
    let content = topic.finishIcon
    switch (topic.finishIcon) {
      case 'done':
        break
      case 'doing':
        break
      case 'not-do':
        break
      default:
        console.log(topic.finishIcon)
    }
    return( <div>{content}</div>)
  }

  renderList () {
    let list = this.state.list
    let arr = []
    console.log(list)
    list.forEach((groups, index) => {
      // 1 将组填入
      let {group, groupName} = groups
      arr.push(this.renderGroupTitle(groupName))
      // 2 遍历 将内容填入
      group.forEach((topic, index)=>{
        arr.push(this.renderGroupContain(topic))
        arr.push(this.renderProcess(topic))
      })
    })
    return arr

      return list.map((item, index) => {
        const {day, title, subTitle, topicKey} = item
        let past = item.day < currentDay
        if (past) {
        }
        let complete = clock.indexOf(day) >= 0
        let showResult = past || complete
        return (
          <div key={index} className='interview-item' onClick={() => {
            this.toLink(showResult, topicKey)
          }}>
            <div className='icon'><img src={intro[`day${day}`]} /></div>
            <div className='content'>
              <div className='top'>
                <div className='left'>
                  <div className='title'>第{day}天 {title}</div>
                  <div className='sub-title'>{subTitle}</div>
                </div>
                {showResult && <div className='right'>
                  {this.renderComplete(complete)}
                </div>}
              </div>
              {showResult && <div className='bottom'>
                {complete && (
                  <div className='left'>
                    <div className='sub'>打卡成绩：<span>{item.result}</span></div>
                  </div>
                )}
                <div className='right'>
                  <div className='sub'><span>{item.completeUser}</span>人完成</div>
                </div>
              </div>}

            </div>
            <div className='enter-icon'><img src='/static/img/interview/icon.png' /></div>
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
    }

  render () {
    const {list, isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        {!error && !isRender && <div className="page">
          <div className='header'>
            <img src='/static/img/interview/interview.png' />
          </div>
          <div className='title'>
            <h1>群面模拟第二期</h1>
          </div>
          <div className='interview-list'>
            {this.renderList(list)}
            {/*{this.renderLastDay(list)}*/}
          </div>
        </div>}
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
            width: 14px;
            height: 14px;
            margin-right: 0.25rem;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
