import React from 'react'
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
      let {nickname, interviewListDetailDTOList} = await AxiosUtil.get('/api/interview/userInfo')
      this.setState({
        userInfo: nickname,
        list: interviewListDetailDTOList,
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

  renderList () {
    let list = this.state.list
    let styleTitle = {
      marginRight: '20px'
    }
    let styleContent = {
      backgroundColor: '#fff',
      padding: '0.5rem',
      margin: '0.5rem auto 1rem auto',
      borderRadius: '6px',
      color: `${ThemeConfig.color.yellow}`
    }
    return list.map((ele, index) => {
      return (<div key={index}>
        <div>
          <span style={styleTitle}>{ele.groupName}</span>
          <span>{ele.title}</span>
        </div>
        <div style={styleContent}>{ele.accuracy ? `正确率 - ${ele.accuracy}%` : `还未完成`}</div>
      </div>)
    })
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
            <span>{this.state.userInfo}</span>
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
