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
        {title:"在蚂蚁金服做产品经理的工作体会",link:"https://www.linkedin.com/wukong-web/companyReflection/15245628-302181?ts=1502779620001&trk=company_review_review_share_wechat"},
        {title:"一个习惯外企文化的人，在蚂蚁金服工作是怎样一番体验？",link:"https://www.linkedin.com/wukong-web/companyReflection/15245628-301190?ts=1502779636926&trk=company_review_review_share_wechat"},
        {title:"如何在支付宝做好一名设计师",link:"https://www.linkedin.com/wukong-web/companyReflection/15245628-302154?ts=1502779673283&trk=company_review_review_share_wechat"},
        {title:"台湾姑娘在阿里",link:"https://www.linkedin.com/wukong-web/companyReflection/15245628-200159?ts=1502779718429&trk=company_review_review_share_wechat"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='vip'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/ant.png' trade='互联网' tag=''
                         isOnlineApply companyName='蚂蚁金服' />
          <SchoolNav fromType='work' processLink='/school/ant/schoolprocess' workLink='/school/ant/schoolWork' expLink='/school/ant/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
