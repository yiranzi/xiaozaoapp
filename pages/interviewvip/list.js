import React from 'react'
import {Button} from 'react-weui'
import Card from '../../components/card'
import FixFooter from '../../components/fixfooter'
import InterviewLayout from '../../containers/interviewvip/layout'
import ThemeConfig from '../../config/theme'
import AxiosUtil from '../../util/axios'

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
      let list = await AxiosUtil.get('/api/interview/getList')
      list = this.formatList(list)
      this.setState({
        list: list,
        isRender: false
      })
    } catch (e) {
      // 未付费 渲染报错信息.不渲染列表
      this.setState({
        error: e.message,
        isRender: false
      })
    }
  }

  formatList (list) {
    let json = {}
    let currentOver
    let groupNames = []
    list.map((item, index) => {
      let {groupName} = item
      groupNames.push(groupName)
      json[groupName] = json[groupName] || []
      // 记录当前做到第几题
      if (item.over) {
        currentOver = index
      }
      // 现在可以做第几题
      if (index - currentOver === 1) {
        item.canDo = true
      }
      json[groupName].push(item)
    })
    // 如果没有做过任何题，默认第一可做第一套
    if (!currentOver) {
      json[groupNames[0]][0].canDo = true
    }
    return json
  }

  renderEnterState (topicKey, canDo, over) {
    if (over) {
      return (
        <a href={`/interviewvip/review?topicKey=${topicKey}`}>
          <img src='/static/img/interviewvip/list/finish.png' />
        </a>
      )
    } else if (canDo) {
      return (
        <a href={`/interviewvip/intro?topicKey=${topicKey}`}>
          <img src='/static/img/interviewvip/list/doing.png' />
        </a>
      )
    } else {
      return <img src='/static/img/interviewvip/list/lock.png' />
    }
  }

  renderListItem (item) {
    let content = (
      <div className='item'>
        <div className='text'>
          <div className='sub-title'>{item.title}</div>
          <div className='sub-content'>{item.completeUser}人已做完</div>
        </div>
        <div className='icon'>{this.renderEnterState(item.topicKey, item.canDo, item.over)}</div>
        <style jsx>{`
          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .item .sub-content {
            color: ${ThemeConfig.color.yellow};
          }
        `}</style>
      </div>
    )
    return (<div onClick={this.goNext.bind(this, item.over, item.topicKey)}>
      <Card content={content} />
      </div>)
  }

  goNext (over, topicKey) {
    if (over) {
      location.href = `/interviewvip/review?topicKey=${topicKey}`
    } else {
      location.href = `/interviewvip/intro?topicKey=${topicKey}`
    }
  }

  renderListContent (list) {
    let content = []
    for (let groupName in list) {
      content.push(<div key={groupName} className='topic-key'>{groupName}</div>)
      list[groupName].map((item, index) => {
        content.push(this.renderListItem(item))
      })
    }
    return content
  }

  renderButton () {
    return (
      <div className='button-group'>
        <Button>打卡规则</Button>
        <Button className='mid' onClick={() => { location.href = '/interviewvip/interview' }}>选择模拟面试</Button>
        <Button onClick={() => { location.href = '/interviewvip/selfTaskInfo' }}>打卡成绩</Button>
        <style jsx>{`
          .button-group {
            display: flex;
          }
        `}</style>
        <style global jsx>{`
          .weui-btn {
            padding: 0 !important;
          }
          .weui-btn+.weui-btn {
            margin-top: 0 !important;
          }
          .weui-btn_primary {
            background-color: ${ThemeConfig.color.blue} !important;
            font-size: 14px !important;
          }
          .weui-btn_primary.mid {
            margin: 0 0.5rem !important;
          }
        `}</style>
      </div>
    )
  }

  render () {
    const {list, isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div className='list'>
          <div className='header'>
            <img src='/static/img/interviewvip/main.jpg' />
          </div>
          <div className='content'>
            <div className='start-time'>开始时间：11月1日</div>
            <section>
              <div className='title'>第一部分：7大模块核心群面技能</div>
              <div className='sub-content'>{this.renderListContent(list)}</div>
            </section>
            <section className='part'>
              <div className='title'>第二部分：6 人线上群面实战</div>
              <div className='sub-content'>
                <ul>
                  <li><span>群面方式</span>：线上微信群</li>
                  <li><span>分组方式</span>：6 人一组，根据学员模块训练的成绩进行分组，保证最真实的群面模拟环境</li>
                  <li><span>参与规则</span>：参加线上模拟需要先完成所有模块的学习，学完后模拟更有效哦</li>
                  <li><span>群面时间</span>：群面时间：多时段选一（每个时间段开放 300 个名额，为保证群面效果，完成课程学习才可报名群面啦！请务必确认参加哦）</li>
                </ul>
              </div>
            </section>
            <section className='part'>
              <div className='title'>第三部分：4 场群面答疑讲座</div>
              <div className='sub-content'>
                <ul>
                  <li>1 场群面线上模拟案例解析+答疑</li>
                  <li>3 场行业（四大、快消、金融）群面讲解，包括：</li>
                  <ul className='list-style'>
                    <li>行业群面案例的形式</li>
                    <li>行业群面考察点</li>
                    <li>行业群面应对策略</li>
                  </ul>
                  <li>PS. 具体讲座时间请关注“小灶求职顾问”通知哦</li>
                </ul>
              </div>
            </section>
          </div>
          <FixFooter content={this.renderButton()} />
        </div>
        <style jsx>{`
          .list .header img {
            width: 100%;
          }
          .list .content {
            padding: 1rem;
            padding-bottom: 5rem;
          }
          .list .content .start-time {
            border-bottom: 1px solid ${ThemeConfig.color.border};
            padding-bottom: 0.25rem;
          }
          section .title {
            margin-top: 1rem;
            font-weight: bold;
          }
          section.part {
            margin-top: 2rem;
          }
          section.part .sub-content {
            margin-top: 1rem;
          }
          section.part .sub-content span {
            font-weight: bold;
          }
          li {
            list-style: none;
            line-height: 180%;
            color: ${ThemeConfig.color.content};
          }
          .list-style li {
            list-style: inside;
          }
        `}</style>
        <style global jsx>{`
          .interviewvip {
            padding: 0 !important;
          }
          .interviewvip .list section .topic-key {
            font-weight: bold;
            margin-top: 1rem;
          }
          .interviewvip .list section .icon img {
            width: 2.5rem;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
