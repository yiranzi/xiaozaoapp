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
        {title:"【面经】阿里-蚂蚁金服三轮面试总结",link:"http://www.jianshu.com/p/e65a114aa21b",tag:["面试","","",""]},
        {title:"蚂蚁金服面试经历（内含大量干货）",link:"https://zhuanlan.zhihu.com/p/27295042",tag:["面试","","",""]},
        {title:"18届校招最新面经：人生第一次技术面试蚂蚁金服",link:"https://zhuanlan.zhihu.com/p/27769491",tag:["面试","","",""]},
        {title:"2016阿里蚂蚁金服四面技术分享(拿到实习offer)",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506322224&ver=1&signature=GXvVIucdiEKWfjOKnPJ30NfyaXLsnBAHZgaVOBT3jOfAPf3eKMySSSh4q8YSsbMKafK7YLFmZiZICAk1BKfIa46gzoSVz-ny7fPwlB3yOnVuje7NxrJk*68Mpmu7bHcqDD6m*cWtyhaOpwrZoYK93w==",tag:["面试","","",""]},
        {title:"2017蚂蚁金服校招面试题目",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506322125&ver=413&signature=OoP5-nE1PzbX0VSQcvW8sxFdU-7Ch0V3nqTkFjny9xYvtws4ZqUwR5ZkkQT7y-XB*OLODaUJkLHVh5iZ*xpWkwlALsERixgPg5HIVgQ2VHNG-KqX11NeejaCTm9mMpkl&new=1",tag:["面试","","",""]},
        {title:"阿里-蚂蚁金服三轮面试总结",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506321937&ver=1&signature=2oM3ZWEkqz*rpHvSKuL3fWRl9pLU44Wxfk1Sxy-T3qfzaqmiZVFVoWhGt7ejTXPYg-2LenljSQHivLbtRK1gNXjZQuGyQWOW29CyGzggfCgV0p0TwM1ESRxBum4VCktBCxvsp87uFPPghrq0zsf-UWqLia665i6p2EgRzS1r8dc=",tag:["面试","","",""]},
        {title:"蚂蚁金服面试总结",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506321937&ver=413&signature=GOPOi8NnqsPxB0hLwJq57kBBxizQDVwEYshuhwjZFKi-ua8YpZQGU-IASuYLI4S4dfqwGizr37IaFgqprwNh0pI2XJZUus-McD9jcTpD7ej8Op*oPslNaRjWLYGTBtov&new=1",tag:["面试","","",""]},
        {title:"面经 | 蚂蚁金服面试全过程",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506321937&ver=413&signature=TDa-TR2WJN-ZA7GA4eNf9BOnGfwSRdhVto7PQwldrPcs25fvhnw06ooywmULb8KlSGk7rbn9lnZtz-SuEY7TNBew7HFiWjPssI7jrsA06CK9TLkRZFxVXcB5IXFW8m7t&new=1",tag:["面试","","",""]},
        {title:"公司体验16|在蚂蚁金服3年，不想离开",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506322332&ver=413&signature=Te8Iv0OfTZ-u*FgW*QSg34xRquH544MnLKhhSy7mJcVbOBrdMlbnQKo0UbSh8fraKR3tScXCYzoqf4giRTi255oCVV0AjM59-I4RxFVIXawiYUsuLHPZ9-Q*-ROjXKum&new=1",tag:["综合","","",""]}
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
      <Layout fromType='ant'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/ant.png' trade='互联网' tag=''
                         isOnlineApply companyName='蚂蚁金服' />
          <SchoolNav fromType='exp' processLink='/school/ant/schoolprocess' workLink='/school/ant/schoolWork' expLink='/school/ant/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
