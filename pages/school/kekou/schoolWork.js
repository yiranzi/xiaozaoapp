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
        {title:"Coca-Cola教给我的最大一课",link:"https://www.linkedin.com/wukong-web/companyReflection/1694-302156?ts=1502781057669&trk=company_review_review_share_wechat`"},
        {title:"听学长学姐说，在可口可乐工作是一种怎样的体验?",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506064955&ver=407&signature=zN-ga-J3notGJqCEzqmjH48AOZqyA9yFNEJnwlwKBL7I*1a7kF-m26Sx5v4MIL6xJYf*wYjdp8XbTG0Sfa*F-tsFTRP-35-EBDr7j--u3-8Y5SFjfzu4eIhgCk3K67uR&new=1"},
        {title:"浙大学姐在可口可乐的工作体验",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506064955&ver=1&signature=ERzw47Q*WGX0ACU5YtAhr*axkmuxevTFHFoVU7E3LGH9*sonBfD7AW7lO5S2TZF6L4xcLTaIS5x9G5LM0RDilJpssbfb*5hTJ2M5WoKV-j7ZsBxBTO8J5ueNYduGh4QI5lG2iM0TQ1b1SgqiFxeRdpOumSjFQGacw8H3xK9*E58="}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='kekou'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/kekou.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='可口可乐' />
          <SchoolNav fromType='work' processLink='/school/kekou/schoolprocess' workLink='/school/kekou/schoolWork' expLink='/school/kekou/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
