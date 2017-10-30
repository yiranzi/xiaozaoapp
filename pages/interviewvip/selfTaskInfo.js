import React from 'react'
import Card from '../../components/card'
import InterviewLayout from '../../containers/interviewvip/layout'
import ThemeConfig from '../../config/theme'
import AxiosUtil from '../../util/axios'
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
      let list = await getCourseInfo.getList()
      let allFinish
      let finishArray
      console.log(list)
      // for (let groups of list) {
      //   allFinish = true
      //   finishArray = []
      //   console.log(groups)
      //   for (let topic of groups.group) {
      //     if (topic.over) {
      //       finishArray.push(topic.topicKey)
      //     } else {
      //       allFinish = false
      //       break
      //     }
      //     // 如果一组都完成.一次发送请求获得结果.
      //     if (allFinish) {
      //       groups.score = await this.getAnswerBtTopicKey(finishArray)
      //       groups.allFinish = allFinish
      //     } else {
      //       groups.allFinish = allFinish
      //       break
      //     }
      //   }
      // }
      console.log(list)
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

  getAnswerBtTopicKey = async function (finishArray) {
    let answer
    let score = 0
    for (let topicKey of finishArray) {
      answer = await AxiosUtil.get(`/api/interview/getByTopicKey/${topicKey}`)
      score += answer.accuracy
    }
    let averageScore = score/finishArray.length
    console.log(averageScore)
    return (averageScore)
  }

  renderGroupTitle (groupName) {
    return (<div>{groupName}</div>)
  }

  renderGroupContain (content) {
    let style = {
      backgroundColor: '#fff',
      padding: '0.5rem',
      margin: '0.5rem auto 1rem auto',
      borderRadius: '6px',
      color: `${ThemeConfig.color.yellow}`
    }
    return (
      <div>
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
    console.log(list)
    list.forEach((groups, index) => {
      // 1 将组填入
      let {group, groupName, allFinish, score} = groups
      arr.push(this.renderGroupTitle(groupName))
      // 2 遍历 将分数填入
      if (allFinish) {
        arr.push(this.renderGroupContain(`正确率${score}`))
      } else {
        arr.push(this.renderGroupContain(`还未完成`))
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
          <div className='interview-list'>
            {this.renderList(list)}
          </div>
        </div>}
        <style global jsx>{`
          .page{
          padding-bottom: 50px;
          width: 100%;
          }
          .header img{
            width: 100%;
          }
          .action {
            display: flex;
            justify-content: space-between;
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            padding: 1rem 2rem;
            box-sizing: border-box;
            background: #F9F9F9;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
