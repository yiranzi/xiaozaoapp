import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[
        {title:"在腾讯开发QQIM的工作体验是怎样的？",link:"https://www.zhihu.com/question/20672463"},
        {title:"腾讯，一家「大学」style的公司",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-301237?ts=1502723898332&trk=company_review_review_share_wechat"},
        {title:"腾讯新人初体验",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-301221?ts=1502723944145&trk=company_review_review_share_wechat"},
        {title:"为什么你也要去腾讯工作",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-301206?ts=1502723999865&trk=company_review_review_share_wechat"},
        {title:"有想法有创意有决心，那就加入腾讯吧！",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-302175?ts=1502724042962&trk=company_review_review_share_wechat"},
        {title:"18年了，它依旧有爱——我记忆深处的腾讯",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-302164?ts=1502724102844&trk=company_review_review_share_wechat"},
        {title:"设计师眼中生机勃勃的腾讯",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-300175?ts=1502724140784&trk=company_review_review_share_wechat"},
        {title:"那些腾讯人会刷屏，以及不会晒朋友圈的二三事",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-301168?ts=1502724188902&trk=company_review_review_share_wechat"},
        {title:"那些年我感受到的：鹅厂的温度，阿里的布局",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-301164?ts=1502724206023&trk=company_review_review_share_wechat"},
        {title:"在腾讯工作的体验如何，最大的挑战是什么？",link:"https://www.zhihu.com/question/19618419"},
        {title:"腾讯、百度等大公司的程序员一天是生活都是怎样的？",link:"https://www.zhihu.com/question/19914614"},
        {title:"在腾讯广州研究院工作的感觉如何？可以接触到哪些产品?",link:"https://www.zhihu.com/question/20420420"},
        {title:"在微信工作是怎样一番体验？",link:"https://www.zhihu.com/question/24173799"},
        {title:"在微信从事产品设计工作是怎样一番体验？",link:"https://www.zhihu.com/question/24190146"},
        {title:"从4A人到鹅厂人之新体验",link:"https://www.linkedin.com/wukong-web/companyReflection/166328-301155?ts=1502724284580&trk=company_review_review_share_wechat"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='tt'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/tt.png' trade='互联网' tag='2017世界500强'
                         isOnlineApply companyName='腾迅' />
          <SchoolNav fromType='work' processLink='/school/tt/schoolprocess' workLink='/school/tt/schoolWork' expLink='/school/tt/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
