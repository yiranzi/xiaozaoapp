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
        {title:"在欧莱雅工作是怎样的一种体验？",link:"https://www.zhihu.com/question/24723297"},
        {title:"别人家的公司福利，工作也能体验贵族生活",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506059991&ver=407&signature=5ID43PE-sxM9EGzRfmOmmwBRJviaLLasb39lBGuoq4tqBB9h-1SaQNDgh9EKuS4SRv3-Y9GXQ4peoaVrGxSyaCWNF5-hqLVBYUkc1yetjUfRvWiT0TPVNmcuLg80ME3S&new=1"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='olaiya'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/oulaiya.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='欧莱雅' />
          <SchoolNav fromType='work' processLink='/school/olaiya/schoolprocess' workLink='/school/olaiya/schoolWork' expLink='/school/olaiya/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
