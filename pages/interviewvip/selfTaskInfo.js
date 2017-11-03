import React from 'react'
import InterviewLayout from '../../containers/interviewvip/layout'
import ThemeConfig from '../../config/theme'
import getCourseInfo from '../../util/getCourseInfo'

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
      let list = await getCourseInfo.getUserInfoAndList()
      let userInfo = getCourseInfo.getUserInfo()
      let allFinish
      let score
      for (let groups of list) {
        allFinish = true
        score = 0
        for (let topic of groups.group) {
          if (topic.over) {
            score += parseInt(topic.accuracy)
          } else {
            allFinish = false
            break
          }
        }
        // 如果一组都完成.一次发送请求获得结果.
        if (allFinish) {
          groups.score = score / groups.group.length
          groups.allFinish = allFinish
        } else {
          groups.allFinish = allFinish
        }
      }
      this.setState({
        userInfo: userInfo,
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

  renderGroupTitle (groupName, name) {
    let style = {
      marginRight: '20px'
    }
    return (<div key={groupName}>
      <span style={style}>{groupName}</span>
      <span>{name}</span>
    </div>)
  }

  renderGroupContain (content, index) {
    let style = {
      backgroundColor: '#fff',
      padding: '0.5rem',
      margin: '0.5rem auto 1rem auto',
      borderRadius: '6px',
      color: `${ThemeConfig.color.yellow}`
    }
    return (
      <div key={index}>
        <div style={style} >{content}</div>
        <style jsx>{`
      .topic-bar {
        width: 100%
        display: flex
        justify-content: space-between
      }
    `}</style>
      </div>)
  }

  renderList () {
    let list = this.state.list
    let arr = []
    list.forEach((groups, index) => {
      // 1 将组填入
      let {group, groupName, allFinish, score} = groups
      arr.push(this.renderGroupTitle(groupName, group[0].title))
      // 2 遍历 将分数填入
      if (allFinish) {
        arr.push(this.renderGroupContain(`正确率 - ${score}%`, index))
      } else {
        arr.push(this.renderGroupContain(`还未完成`, index))
      }
    })
    return arr
  }

  renderUserInfo () {
    return (
      <div>
        <div className='circle'>123</div>
        <style jsx>
          {`.circle{
            position: relative;
            border-radius: 1rem;
            background-color: ${ThemeConfig.color.yellow};
          }`}
        </style>
      </div>
    )
  }

  render () {
    const {list, isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        {!error && !isRender && <div className='page'>
          <div className='header'>
            <img src='/static/img/interviewvip/selfInfoBg.png' />
          </div>
          <div className='nick-name'>
            <span>{this.state.userInfo.nickName}</span>
          </div>
          <div className='interview-list'>
            {this.renderList(list)}
          </div>
        </div>}
        <style global jsx>{`
          .page{
          padding-bottom: 50px;
          width: 100%;
          }
          .header {
            margin: -1rem -1rem 1rem -1rem;
          }
          .header img{
            width: 100%;
          }
          .nick-name {
            text-align: center;
            color: ${ThemeConfig.color.yellow};
            margin-bottom: 1rem;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
