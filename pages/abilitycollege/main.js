import React from 'react'
import Layout from '../../components/layout'
import LoadingIcon from '../../xz-components/loadingicon'
import AxiosUtil from '../../util/axios'
import DataUtils from '../../util/data'
import Header from '../../containers/abilitycollege/header'
import Footer from '../../components/footer'
import Schedule from '../../containers/abilitycollege/main/schedule'
import Plan from '../../containers/abilitycollege/main/plan'
import Course from '../../containers/abilitycollege/main/course'
import Patent from '../../containers/abilitycollege/main/patent'
import Teacher from '../../containers/abilitycollege/main/teacher'
import Study from '../../containers/abilitycollege/main/study'
import Comment from '../../containers/abilitycollege/main/comment'
import ToolsUtil from '../../util/tools'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      exchangeDetail: {},
      buyDetail: {},
      groupId: '',
      headimg: '',
      nickname: '',
      category: '',
      couponname: ''
    }
  }
  componentDidMount = async () => {
    let exchangeDetail = await AxiosUtil.get('/api/study-card/exchangeDetail')
    let buyDetail = await AxiosUtil.get('/api/study-card/buyDetail')
    exchangeDetail = this.formData(exchangeDetail)
    this.setState({exchangeDetail: exchangeDetail, buyDetail: buyDetail})

    let groupId = ToolsUtil.getQueryString('groupId')
    let headimg = ToolsUtil.getQueryString('headimg')
    let nickname = ToolsUtil.getQueryString('nickname')
    let category = ToolsUtil.getQueryString('category')
    let couponname = ToolsUtil.getQueryString('couponname')

    this.setState({
      groupId: groupId,
      headimg: headimg,
      nickname: nickname,
      category: category,
      couponname: couponname
    })
  }
  formData (exchangeDetail) {
    let json = {}
    exchangeDetail.map((item) => {
      let {title} = item
      let category

      if (title.match(/核心/)) {
        category = 'currency'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
      if (title.match(/职场/)) {
        category = 'work'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
      if (title.match(/求职/)) {
        category = 'job'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
      if (title.match(/最新/)) {
        category = '_new'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
      if (title.match(/最热/)) {
        category = 'hot'
        json[category] = json[category] || {}
        json[category].title = title

        json[category].content = json[category].content || []
        json[category].content.push(item)
      }
    })
    return json
  }
  jumpTo (groupId, headimg, nickname) {
    let string = ''
    string = string + groupId ? 'groupId=' + groupId : ''
    string = string + headimg ? 'headimg=' + headimg : ''
    string += nickname ? 'nickname=' + nickname : ''

    location.href = '/payment/buygether?' + string
  }
  render () {
    const {exchangeDetail, buyDetail, groupId, headimg, nickname, category, couponname} = this.state
    return (
      <Layout>
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
        <div className='main'>
          <Header buyDetail={buyDetail} />
          {category === 'invite' &&
            <div className='tips' onClick={() => { this.jumpTo(groupId, headimg, nickname) }}>
              <div><img src={headimg} /></div>
              <div style={{marginLeft: '0.5rem'}}>参加{nickname}的团，低至3折获取能力卡</div>
            </div>
          }
          {category === 'coupon' &&
            <div className='tips' onClick={() => { this.jumpTo(groupId, headimg, nickname) }}>
              <div><img src={headimg} /></div>
              <div style={{marginLeft: '0.5rem'}}>
                <p>接受{nickname}的邀请，获得{couponname}</p>
                <p>获取能力卡 立享9折</p>
              </div>
            </div>
          }
          <div className='content'>
            {DataUtils.isEmpty(exchangeDetail) ? <LoadingIcon /> : <Schedule exchangeDetail={this.state.exchangeDetail} />}
            <Plan />
            {DataUtils.isEmpty(exchangeDetail) ? <LoadingIcon /> : <Course exchangeDetail={this.state.exchangeDetail} />}
            <Patent />
            <Teacher />
            <Study />
            <Comment />
          </div>
          <Footer type='college' />
        </div>
        <style jsx>{`
          .main {
            background-color: #f0f2f6;
          }
          .content {
            padding-bottom: 7rem;
          }
          .tips {
            margin-top: 1rem;
            background-color: #c41616;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.85rem;
            color: #fff;
            padding: 0.5rem 0;
          }
          .tips img {
            width: 2rem;
            border-radius: 2rem;
            display: block;
          }
        `}</style>
        <style global jsx>{`
          h1 {
            font-size: 22px;
            font-weight: normal;
            color: #2f3138;
            display: inline-block;
            position: relative;
            padding-left: 1.25rem;
            margin-left: 1rem;
          }
          h1::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 6px;
            width: 6px;
            height: 24px;
            border-radius: 15px;
            background-color: #241d66;
          }
        `}</style>
      </Layout>
    )
  }
}