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
        {title:"2017唯品会综合管培广州笔面经回顾",link:"http://bbs.yingjiesheng.com/thread-2065765-1-1.html",tag:["网申","笔试","面试","综合"]},
        {title:"唯品会助理运营专员拿到offer",link:"http://bbs.yingjiesheng.com/thread-2056719-1-1.html",tag:["","","面试","综合"]},
        {title:"在唯品会做买手的工作体验是怎样的？",link:"https://www.zhihu.com/question/20674092",tag:["工作体验","","",""]},
        {title:"唯品会2017春招商务管培（项目管理方向）面试全部流程分享，攒人品~",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2096785&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","笔试","面试","综合经验"]},
        {title:"2017唯品会综合管培广州【笔试】【霸一面】【二面】【终面】",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2065765&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","笔试","面试","综合经验"]},
        {title:"唯品会2015校招offer面经",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1983667&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["","","面试",""]},
        {title:"唯品会面试经验",link:"http://www.job592.com/pay/comms26115338.html",tag:["","","面试","综合"]},
        {title:"在广州唯品会工作如何？",link:"https://www.zhihu.com/question/20544496",tag:["综合","","",""]},
        {title:"纪念——人生第一次校招（唯品会）面试",link:"https://zhuanlan.zhihu.com/p/29523077",tag:["","","面试","综合"]},
        {title:"唯品会架构师面试经验分享？",link:"https://www.zhihu.com/question/55622227",tag:["","","面试","综合"]},
        {title:"唯品会校招，面试官都问了哪些问题？",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506321295&ver=413&signature=1V*Lf78ySwK5lnmFew7lSsD*AuJBrx47Z7GHnEVM1NPiamT24FXgI9PrAWtxjeoxymAg3SrBsr4k4s1IX4uuFV3z7nEBrXEpRxS8v3QdOdXCq1MHZbIZPyRQmJSfL0uQ&new=1",tag:["","","面试","综合"]},
        {title:"分享以为程序员的唯品会面试经历",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506321345&ver=413&signature=pWizCEIlU7a7RvlYRVme2N4Pz4EYdxznq7BgL7nFvdQ7q3YYTIwG6iFqnd*uWu*UKILUZFfE-z1B3psnQ7UJzM2nAE4RUZ8sQ-LqjlPx4Nqy*vILcReMntnQ5AlWtDoe&new=1",tag:["","","面试",""]},
        {title:"女程序员崔冰洁的唯品会面试经历",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506321345&ver=1&signature=HVOA-6mFQ5puD1bkR99x9sQ2*F8kAIUekpg6AMU4wk3n4f7qB1XlTsFMrkkLOl8ST22aZBQxPS2aVo*bvTq09x3BDvRUA4DjrMTU8-Y18x-MzIbMs7qGX0OaKc*cigPmfzNhmv-SM5nhn0dWAZCsK6*4DuJPliORvewGVZJB0yE=",tag:["","","面试",""]},
        {title:"唯品会面试问了什么问题？",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506321345&ver=1&signature=cV3SksolV*uQSh-aHQOH4tStUtT2zgIkKaxi0EYoUQDvFSmX5HpabO3EeXkyAsNfogVGB2YvxsEAKm0GtFF1JEmIAo0V*9atWxr9P*16A9pmprqLnDMwhxeGGYwqVQhWkXXUsWn-OTNpbthSonHY0xsoTFrAjiwx4Amjufhh3nI=",tag:["","","面试",""]},
        {title:"唯品会|Java方向求职面试经过（含面试题）",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506321345&ver=413&signature=DxmTlXwXqxoN1SYfwdpOo*SOaPrGZMB07BPP1veZIeY7fH5ebUYDIFnCd9zZpEi3YAeUPGkVEt47f1DV8tw8u9**PGT0MCISJDU324Dg5jEdMgiqbG5TTNMKm6qEKVXE&new=1",tag:["","","面试","综合"]},
        {title:"web前端程序员面试唯品会前端成功案例分享",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506321514&ver=413&signature=xzejBmDBEtczjBNJHHY1fBX65XG3gMTv7bxNmyJCLK3x3aQDpIgP4bg4BHzK2FWH4cpu7ckhSnYKu2iCskQW3cjHzPxx*qmEWYVjwMa4KulB3*74lc42ZPCeLCgIaRBg&new=1",tag:["","","面试",""]},
        {title:"唯品会物流管培群面记录（内附群面真题）",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506321582&ver=413&signature=UQUzg9DvmsLtqQ4nPYVcubqFSSsKfcqykPNU7Hcpa1sUO9sSoB6qhkc3UkkRPRHSKGtixoMBIOSuoRs*yYHtn8K0hTUrAURbm2PtBNhNJZ2ERH7TmKNX96jWPk61KQ4K&new=1",tag:["","","面试","综合"]},
        {title:"【面经】唯品会广州综合管培生一面+二面",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506321582&ver=1&signature=0fhb4n6uHABzk52oexj3gZlhQuqvoap92XtFlyMxYUr-sBJGUCzJJprZutVgwMeubi4wknd3jsFMA*MtouBnYjZ3pfg2mLVaOCXx9MCPHMFXtOMYpRHqjVMKfMBvynAxBiGBQiPvff9jzrxe8wDJMqJ49Nl*ugLFSJ4xxvCcYCE=",tag:["","","面试","综合"]}
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
      <Layout fromType='vip'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/vip.png' trade='互联网' tag='2017全球250强零售商'
                         isOnlineApply companyName='唯品会' />
          <SchoolNav fromType='exp' processLink='/school/vip/schoolprocess' workLink='/school/vip/schoolWork' expLink='/school/vip/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
