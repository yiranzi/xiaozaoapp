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
        {title:"快消管培生面试经验分享",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506061227&ver=1&signature=JsHNMjKNfc*ZHd680lgJ4RFDKVdtx4ycsbndmqMwctjoarcvakY7*H0ojCmAuvfyjmLg8vlXjRO2MmRYTHt2FXoLTM9X-LdSTptmUL3*T-ZqABAntxjzBPWyB*KFh-T*581Lg4v6jqZEWFEP**V7XQ==",tag:["网申","面试","",""]},
        {title:"面经｜快消之雀巢&高露洁",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506061669&ver=1&signature=iWu7SLv3XjLBC9B0kgy6cWz9T*c5PoLG6GQt4iP6oSjdjw1GkF11QpGFVf2S17B*BX3vFsx5fggfnVtdpkQnSUJa--2nVfZydmvKycE1uyX1M-WaayHzNP7k0lsSFti7rGJu*dgLSvwkU2nXC0MshJUNjyaxNyGHg-e9PAmWh1o=",tag:[" ","面试 ","",""]},
        {title:"[经验分享]雀巢HR面谈面试",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506061669&ver=1&signature=Fzad8q7aUsCtvQxqVLXkRS2HzY4X*WQOzGgT76KTN*hFut0nNYcDRt6IjhO0s*NeTIcCZk6h-V9ukUiPx4NiqaY4GZsvErUK4ubxWBKEaie-WSnHh1hJvEN-852D5*E5GiKMlZO6PBY8EwPDu-P9Xw==",tag:[" ","面试 ","",""]},
        {title:"雀巢，市场部管理培训生，面试经验",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506061669&ver=1&signature=ndlOL*FmgwP3zm859UToQMM0jjW3Owsx0BJ07BuZZ*w5VmrVYuLCywyHJhRTVRdYF4Q7cs9pA0pVQXyctKoVvZurSBoHANcVhbp3shVBu*Qn67uNIVm-CsVH2*LK8lKHMLJl48774isVUcxlXCvGww==",tag:[" ","面试 ","",""]},
        {title:"雀巢的面试题全都在这了，拿不到 offer 不要来见我",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506061874&ver=1&signature=IfB2Ryov5Uxl09f5efuAvR*DO6fcEZJUjT1rgFGSyYliD9d*kST*JOt9bf4kxAzLSKrU7cx6dwrE6gq3eynLoI9Q0CL5Q2yMsmynELlP9b2X5YF2hatOKFAJ8Vww6zIONE01H0O-yTBp*gSMUNQ4fGIlmjj9vrip-P5-KVLO-74=",tag:[" ","面试 ","",""]}
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
      <Layout fromType='quechao'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/quechao.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='雀巢' />
          <SchoolNav fromType='exp' processLink='/school/quechao/schoolprocess' workLink='/school/quechao/schoolWork' expLink='/school/quechao/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
