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
        {title:"在百威英博工作是一种怎样的体验",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506067627&ver=407&signature=fWeACiBWFiVfnzr9Pk9iRwCgNO6FAV3LddM9IyLjGgrhNyRGPr6IotR1gIv63umOTBr7x0irFmGDb4DnL-hHEYWjRm7BxKV6o00ewCvvim96*I*oYRVNKSc7PFobxkiW&new=1"},
        {title:"百威英博红星培训生怎么样？",link:"https://www.zhihu.com/question/22417714"},
        {title:"我眼中的3G资本和百威英博文化——新生说大型线上分享实录",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506068393&ver=1&signature=Xq2jlSioCGKGPcZ8viB37H*uDLljTNJmwSK4q-YAhJb0pEhAN9jeU9WqDbGx9W3xmxSsbMBkBNV9F-BqfFAEb9upiwynraw4Op1P-sK9UOFxB193P04zscp9ugcmyE8J3oCfRqxDrw8AsiRMc4vFRAkWTljI-Htvd*YsejnOn2s="},
        {title:"百威英博如何打造人才工厂？——《赋能式投资》节选",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506067988&ver=1&signature=Xq2jlSioCGKGPcZ8viB37H*uDLljTNJmwSK4q-YAhJZJGK6HPaz4Jt6Mr1Z9HFqtM-ryRL3Z9V63ecrpMSPPSHLj1ohODPurNNgQ3Wq12g-4dSWWTaYo9r8u8tHcUEceS793hGSq-MFJFm0qAKTWkMFB6JE5ecUXWRnFh-rBXtk="}      ]
    }
  }
  render () {
    return (
      <Layout fromType='baiwei'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/baiwei.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='百威英博' />
          <SchoolNav fromType='work' processLink='/school/baiwei/schoolprocess' workLink='/school/baiwei/schoolWork' expLink='/school/baiwei/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
