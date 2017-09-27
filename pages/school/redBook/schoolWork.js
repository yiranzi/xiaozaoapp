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
        {title:"在小红书，喝最烈的酒，与最牛的人，做最爱的事",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-302223?ts=1502720591931&trk=company_review_review_share_wechat"},
        {title:"在小红书做社区运营的体会",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-301249?ts=1502720610390&trk=company_review_review_share_wechat"},
        {title:"小红书，让我找到做广告的成就感",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-300231?ts=1502720627742&trk=company_review_review_share_wechat"},
        {title:"见证从未见证的时刻，我在小红书的近三年",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-300224?ts=1502720675670&trk=company_review_review_share_wechat"},
        {title:"在小红书，做一份内心深处热爱的工作",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-301223?ts=1502720755839&trk=company_review_review_share_wechat"},
        {title:"小红书3年：一场和自己较劲的旅程",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-300207?ts=1502720786540&trk=company_review_review_share_wechat"},
        {title:"小红书CTO：在重要选择上，抛开更多的“应该”和“最好”",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-200175?ts=1502720804726&trk=company_review_review_share_wechat"},
        {title:"我为什么从硅谷来到小红书",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-300154?ts=1502720825778&trk=company_review_review_share_wechat"},
        {title:"小红书——不仅仅是一家文艺的公司",link:"https://www.linkedin.com/wukong-web/companyReflection/10269563-301157?ts=1502720842900&trk=company_review_review_share_wechat"},
        {title:"小红书工作体验如何？你为什么加入小红书？",link:"https://www.zhihu.com/question/43636680"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='redBook'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/redBook.png' trade='互联网' tag='2017未来独角兽前150强'
                         isOnlineApply companyName='小红书' />
          <SchoolNav fromType='work' processLink='/school/redBook/schoolprocess' workLink='/school/redBook/schoolWork' expLink='/school/redBook/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
