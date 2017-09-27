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
        {title:"“搜狐”技术面经",link:"http://www.jianshu.com/p/b6bd27b5a142",tag:["","笔试","面试",""]},
        {title:"面经|搜狐面试全攻略，面试官想问的都在这里",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506323481&ver=413&signature=DxmTlXwXqxoN1SYfwdpOo*SOaPrGZMB07BPP1veZIebn9FP9l*1aX2cCU-F0bqvCfOG685DH*zsVpcBicSBpLPBWTsmX9yhFGDGljrDf--kBE-oXMpWDtzpWgmNVk2HU&new=1",tag:["","","面试",""]},
        {title:"记今天搜狐笔试面试经历",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506323642&ver=1&signature=bIUVHSMWC10iTyXr8dLC2QBjImiFirYpY*bW3XXWnkKlWk2fCaxjcoF--3b*hiUoLHrPCiWzBkalK9ZN14djfDRNi3R-D6Td5nNoFvJ32Re2r*2J0DqFE0jYH3BoO-EMAuYDFwA70anSFxxJkq80CdeTlPyVk1Xoc1UZYONHNhI=",tag:["","","面试","综合"]},
        {title:"实习体验师丨在搜狐工作是一种怎样的体验？",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506323712&ver=1&signature=LWzPVC1Lo2rgeru89HV3NyYyqbagbMl5sycBz-8CekD6I8adA1CgqV2cTje5ed7ir*IbBfV34U7A4HeuHXv2dWq6GWai6JgYanZMoXjOnUQ6DWN0GYp-BGAbUXW7JYnp83GhwCS4D0q2GtiO-B3Yfw==",tag:["","工作体验","",""]},
        {title:"搜狐14年暑期实习产品经理笔试小记",link:"http://www.jianshu.com/p/caf6a5fff559",tag:["","笔试","",""]},
        {title:"活在秋招里|搜狐一站式面试分享",link:"http://www.jianshu.com/p/79a36ff1d039",tag:["","","面试","综合"]},
        {title:"“搜狐”面经",link:"http://www.jianshu.com/p/b6bd27b5a142",tag:["","笔试","面试",""]},
        {title:"[笔试] 2018搜狐笔试产品方向",link:"http://bbs.yingjiesheng.com/thread-2112473-1-1.html",tag:["","笔试","",""]},
        {title:"[面试]搜狐无线产品专员一面经历",link:"http://bbs.yingjiesheng.com/thread-1583881-1-1.html",tag:["","","面试","综合"]},
        {title:"2010年10月搜狐产品专员笔试题",link:"http://bbs.yingjiesheng.com/thread-708902-1-1.html",tag:["","笔试","",""]},
        {title:"[综合经验]搜狐家..武汉..一点小总结..攒人品..",link:"http://bbs.yingjiesheng.com/thread-1544628-1-2.html",tag:["网申","笔试","面试","综合"]},
        {title:"[综合经验]解答应届毕业生应聘搜狐的过程中的一些问题！希望对大家有一定的帮助！",link:"http://bbs.yingjiesheng.com/thread-249782-1-6.html",tag:["","","","综合"]},
        {title:"[面试]南京网游服务顾问面试归来~~~",link:"http://bbs.yingjiesheng.com/thread-285596-1-8.html",tag:["","","面试",""]}
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
      <Layout fromType='sohu'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/sohu.png' trade='互联网' tag='中国500强'
                         isOnlineApply companyName='搜狐' />
          <SchoolNav fromType='exp' processLink='/school/sohu/schoolprocess' workLink='/school/sohu/schoolWork' expLink='/school/sohu/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
