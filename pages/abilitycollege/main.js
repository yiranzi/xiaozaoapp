import React from 'react'
import Layout from '../../components/layout'
import Loading from '../../xz-components/loading'
import AxiosUtil from '../../util/axios'
import DataUtils from '../../util/data'
import Header from '../../containers/abilitycollege/header'
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
      exchangeDetail: {}
    }
  }
  componentDidMount = async () => {
    let exchangeDetail = await AxiosUtil.get('/api/study-card/exchangeDetail')
    exchangeDetail = this.formData(exchangeDetail)
    this.setState({exchangeDetail: exchangeDetail})
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
    if (DataUtils.isEmpty(this.state.exchangeDetail)) return (<Layout><Loading /></Layout>)
    return (
      <Layout>
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
        <div className='main'>
          <Header />
          <div className='content'>
            <Schedule exchangeDetail={this.state.exchangeDetail} />
            <Plan />
            <Course exchangeDetail={this.state.exchangeDetail} />
            <Patent />
            <Teacher />
            <Study />
            <Comment />
          </div>
        </div>
        <style jsx>{`
          .main {
            background-color: #f0f2f6;
          }
        `}</style>
        <style global jsx>{`
          h1 {
            font-weight: normal;
            color: #2f3138;
            display: inline-block;
            position: relative;
            padding-left: 15px;
            margin-left: 1rem;
          }
          h1::before {
            content: '';
            position: absolute;
            left: 0;
            top: 8px;
            width: 8px;
            height: 30px;
            border-radius: 15px;
            background-color: #241d66;
          }
        `}</style>
      </Layout>
    )
  }
}