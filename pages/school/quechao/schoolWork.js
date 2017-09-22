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
        {title:"如果你也想去雀巢做市场管培生…",link:"https://www.linkedin.com/wukong-web/companyReflection/1393-302170?ts=1502725296610&trk=company_review_review_share_wechat"},
        {title:"留住人才，150年历史的雀巢是这么干的！",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506061068&ver=407&signature=Ec3z7psPmGdv2MK86l-eSpXtx8uisrBbv5IfVG5e8suhlfRm3r24EmyMdFXvo3VvQ8aExTODJdAPljqLOJzi3Dh4hHXxVW*SMeFEuRsL5hI4g1kH1HdRBwJ7-Nmesxhp&new=1"},
        {title:"想成为雀巢管培生，他们的故事一定要听！【第一期】",link:"https://mp.weixin.qq.com/s?__biz=MzA4NTgwODMzNg==&mid=209732401&idx=1&sn=835d7255bcf8dfd0d30d36af5caaca2d&mpshare=1&scene=1&srcid=0922mKL6F3gTYSKcxUa6G7ev#rd"},
        {title:"想成为雀巢管培生，他们的故事一定要听！【第二期】",link:"https://mp.weixin.qq.com/s?__biz=MzA4NTgwODMzNg==&mid=209880993&idx=1&sn=774b40c24b5a3b67239cce2ab464df3c&mpshare=1&scene=1&srcid=0922sWD29FxnIj0vwiek42Wn#rd"},
        {title:"想成为雀巢管培生，他们的故事一定要听！【第三期】",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506061153&ver=1&signature=ZsDNz0IhCyL202SiHFDpqLHvj92VSa60kpqMaANw5L0KWiL3vDVBDz-iRrcuLc24Z1OwJt2tug5NaVz7h-W3qgUaWEl5IfPF5o4G8DAMC35mfoirOw3RWFS8ulDLVxF2jIwWXroapH*7gUO0YEl-Fw=="},
        {title:"想成为雀巢管培生，他们的故事一定要听！【第四期】",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506061153&ver=1&signature=ZsDNz0IhCyL202SiHFDpqLHvj92VSa60kpqMaANw5L1BeEsqLpg-a6cUaCIdz4iKcKFKtz5y7DAMQnFRGeUij*lldMbi5vbMWBB1Fe4DXrHCmICtdzg8R5Z9Iw7kxGn0t18IokoVI3AqJngN0fwavQ=="},
        {title:"想成为雀巢管培生，他们的故事一定要听！【第五期】",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506061227&ver=1&signature=ZsDNz0IhCyL202SiHFDpqLHvj92VSa60kpqMaANw5L0S1IgexVKlcfRFpZBw3tkUnwsfeHjKc6vzocr7*UdrRZW5t4X2hF1VtPC64e3ErVaDPiVKnQJILZSxnefGMjgVAee2kMI0R7HSKknlx0mTyg=="},
        {title:"想成为雀巢管培生，他们的故事一定要听！【第六期】",link:"https://mp.weixin.qq.com/s?__biz=MzA4NTgwODMzNg==&mid=400395450&idx=2&sn=8c591b24628474ee47f3070e9afc9d83&mpshare=1&scene=1&srcid=0922UfPwMugTtrUvoff1CQ6i#rd"},
        {title:"想成为雀巢管培生，他们的故事一定要听！【第七期】",link:"https://mp.weixin.qq.com/s?__biz=MzA4NTgwODMzNg==&mid=400475099&idx=2&sn=041b72a6eb636f8ba708611ac77221d8&mpshare=1&scene=1&srcid=09223NaVqXqYx2Qd92rcX38Y#rd"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='quechao'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/quechao.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='雀巢' />
          <SchoolNav fromType='work' processLink='/school/quechao/schoolprocess' workLink='/school/quechao/schoolWork' expLink='/school/quechao/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
