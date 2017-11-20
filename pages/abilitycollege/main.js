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

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      exchangeDetail: {},
      buyDetail: {}
    }
  }
  componentDidMount = async () => {
    let exchangeDetail = await AxiosUtil.get('/api/study-card/exchangeDetail')
    let buyDetail = await AxiosUtil.get('/api/study-card/buyDetail')
    exchangeDetail = this.formData(exchangeDetail)
    this.setState({exchangeDetail: exchangeDetail, buyDetail: buyDetail})
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
  render () {
    const {exchangeDetail, buyDetail} = this.state
    return (
      <Layout>
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
        <div className='main'>
          <Header buyDetail={buyDetail} />
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