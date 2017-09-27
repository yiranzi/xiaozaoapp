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
        {title:"如何在搜狐打造一个最有影响力的媒体产品？",link:"https://www.linkedin.com/wukong-web/companyReflection/53280-200220?ts=1502724645755&trk=company_review_review_share_wechat"},
        {title:"互联网公司的法务都是做什么的？我在搜狐学到的事",link:"https://www.linkedin.com/wukong-web/companyReflection/53280-200216?ts=1502724666807&trk=company_review_review_share_wechat"},
        {title:"搜狐北京研发中心怎么样，在其中工作是一种什么体验？",link:"https://www.zhihu.com/question/29870979"},
        {title:"两进搜狐的体会：我在搜狐是怎么做新闻的",link:"https://www.linkedin.com/wukong-web/companyReflection/53280-302152?ts=1502724683678&trk=company_review_review_share_wechat"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='sohu'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/sohu.png' trade='互联网' tag='中国500强'
                         isOnlineApply companyName='搜狐' />
          <SchoolNav fromType='work' processLink='/school/sohu/schoolprocess' workLink='/school/sohu/schoolWork' expLink='/school/sohu/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
