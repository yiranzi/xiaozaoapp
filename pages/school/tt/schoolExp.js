import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import TabList from '../../../components/school/TabList'
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[
        {title:"在小红书面试是怎样一种体验",link:"https://zhuanlan.zhihu.com/p/22555479",tag:["面试","","",""]},
        {title:"给小红书未来工程师的面试秘籍",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506319027&ver=1&signature=bvYs2Q44exsuYsBCd-15jOICl-1nJ3k5LZxBr*w4u18h3YmMEK2fFIsEtHUuJf4Sy4DCselYx8WauJ2hl38fNdZ2EMJ2EtVk66Xxonn0sSCyBhERioOdjmlYCnQkrOZMNp-VGQhSmuTSXbIv*jVwqqTO3APhXLjQzUOl5oQGDVc=",tag:["面试","","",""]},
        {title:"小红书实习面试经验帖",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506319027&ver=1&signature=bI0XB6DGM2g4aoJRfvsBG9ntwavo1aNwuTACsaDEfr5mS1aFP6kxmA-0GuBnAxg4jQ3zmvNEwpMX9nrLE28-SuKlDXDV2vO3SuvqU-N4*dn0s-S60epd8ayJy8-1BLPZAGRiUdZueJERrLtOwZLZz61u-XEdrV5Y63Zb6jzObl4=",tag:["综合","","",""]},
        {title:"水哥避坑小红书,七步幻化三大申请套路",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506319538&ver=1&signature=5wtL*lI95X0lPDH3p2THzGGb3G90shKp4CpJ434fDxP0jj2nC*5NVgrVuLf9hV1MrSK4tTY*sZCdFUhDCId7gJK4YJcUgceMECIQ96fke7NIs3In7LpcZk-XzvQUM1Kxmnq6qD-aqcvdyapwU8566RUhTjR7pTVazE-ZGreybgU=",tag:["综合","","",""]}
      ]
    }
  }
  render () {
    let onlineApply = this.state.list.filter(function (item) {
      return item.tag.indexOf('网申') !== -1
    })
    let exam = this.state.list.filter(function (item) {
      return item.tag.indexOf('笔试') !== -1
    })
    let interview = this.state.list.filter(function (item) {
      return item.tag.indexOf('面试') !== -1
    })
    let comphensive = this.state.list.filter(function (item) {
      return item.tag.indexOf('综合') !== -1
    })
    return (
      <Layout fromType='tt'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/tt.png' trade='互联网' tag='2017世界500强'
                         isOnlineApply companyName='腾迅' />
          <SchoolNav fromType='exp' processLink='/school/tt/schoolprocess' workLink='/school/tt/schoolWork' expLink='/school/tt/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
