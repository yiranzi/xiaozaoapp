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
        {title:"携程面经",link:"http://www.jianshu.com/p/19616fa1b5ae",tag:["","面试","",""]},
        {title:"2017携程视觉交互设计师笔试经验",link:"http://bbs.yingjiesheng.com/thread-2054053-1-1.html",tag:["笔试","","",""]},
        {title:"2016携程笔试+大数据MT笔试全笔经",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2010414&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["笔试","","",""]},
        {title:"关于我如何拿到携程offer的过程记录",link:"https://www.douban.com/group/topic/102031561/",tag:["笔试","面试","综合",""]},
        {title:"2016MT笔试半死回来造福",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2060744&fromuid=443334",tag:["笔试","","",""]},
        {title:"刚刚做完大数据管培网测，题型记忆犹新，发出来，积RP,RP啊。",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2062462&fromuid=443334",tag:["网申","笔试","",""]},
        {title:"【大数据MT技术笔】来回忆一下题",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2067954&fromuid=443334",tag:["笔试","","",""]},
        {title:"看看学长学姐怎么过的携程面试，你也这么来！",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506320070&ver=1&signature=3VAs7WO8JjVDWjsRy5lXPGJ43bJbUWSPN7KDKgKt*MYok*Q3u5pSQKG9rwt*oiMLrLj15LnDthSSSjvXFASQb1CahLtTBWiO*had-0DZP68fygfVWnjdNhuze9Y1buiRGq-v4RZmOPNTM7hn23d1EDDhmIu0PJcibDLcRnW-EnI=",tag:["","面试","",""]},
        {title:"我的携程面试经历",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506320070&ver=413&signature=vczLJdqEs*WI4tVTBbnw0hmBdgtgXAOotPAi2TQIhzR8R7nGriiv5iGV5Hw8Pc596GAMTy1k8BeJQwFghXCfxT1eGknAl07RIaeoqlmQcyLMPkryb6n6HMdUmdqLM0wV&new=1",tag:["","面试","综合经验",""]},
        {title:"携程校招面试常见问题及其解析（1）",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506320070&ver=1&signature=ifggD7CwnyD7avsw4xcxBh5vrMCUd1P*mk3CFIjh23yb*CL6FVJ2u65DoOc1sfq8hOk02MwNaAKPqxl7QpasDaWvtP2PtpoNbB0G*n2V0W7xpPqBEkw-KK32Q7l50V2bN*h1s9phqtOvvQCbNpT3DyL-VKG8gslMfwXJC8k26qE=",tag:["","面试","综合",""]},
        {title:"携程校招面试常见问题及其解析（2）",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506320070&ver=1&signature=ifggD7CwnyD7avsw4xcxBh5vrMCUd1P*mk3CFIjh23zjLBx2hcuYFvM3jaT4UITfB0WjMIT-GTvprBWSFAevnAmHPnNVYMycq7YbCjSJrF-N0ENowmL2Zw0*kEQ1x39RB1BaVwdp09cOLQ5lTpSFvnW1CLy2UVCS-1aEI8uShvU=",tag:["","面试","综合",""]},
        {title:"面试|补招一定要看的携程面经~",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506320070&ver=1&signature=AEC9RwciHqrokTAM9r8MSHlnfkZmmVzpBQ-v1KRKyRhhZZ99pAuEhnjhwhsvTVhjJEpr429D7xbqafAlXhckqKDUdvPLAfXZQrJ*H5BI5IUwpnmfFbdu6MAQkXgx9TfzY8a1Mr2r*Sg86UDmC*ZeXOs9UTOVRRmDukhcw4o-dKg=",tag:["","面试","",""]},
        {title:"风采人物丨理科妹变身“携程设计师”大谈面试经——访火星时代1506期UI视觉设计学员范世丽",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506320354&ver=1&signature=v6Y28hXZuuXD*YKDrOxdNTz8CogPtXi3E4uFmHcgYRSh96jTkvzT0Sgm0PdWo8-sFL8CFKCyuAIzIyVo7IfCn6cZk2oPCUZIjEHWiq*sPHWttjVNZwnvPBdSGksOUKvyziDomhBRAg7u9b0C5xKERw==",tag:["","面试","综合",""]},
        {title:"【面试分享】2011年携程非技术类笔试面试经验分享",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506320354&ver=1&signature=GXvVIucdiEKWfjOKnPJ30NfyaXLsnBAHZgaVOBT3jOe3-Lrj*L8*5WsLeSRrYL7heZGkwBOiDDblemSmTmhwJel2Z-tETOGt7JYKQp*aiRWWFz8naPOmKObLrNZsO4kLGy5WHC-CLfTT6cyFoBQnYw==",tag:["","","综合",""]},
        {title:"【干货】携程笔经面经新鲜出炉！",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506320568&ver=1&signature=5CZTqucxl1AGSyIIsJpiOR-frBndfUohPWaFZ*dLqXNW*BTjMW7aNBQo1vWNfY3ImAbjrOli*KqJsncL7jVTZDzasx-qGIrCMsCwAxSe2DiF9hMu37BDcY5fSoGueWiWXvp9y5SSjJfkRTy31KELuaUhQ8nbT9en-FeES-YeV5A=",tag:["","面试","",""]},
        {title:"面经|我是如何拿到携程offer的",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506320568&ver=413&signature=TDa-TR2WJN-ZA7GA4eNf9BOnGfwSRdhVto7PQwldrPeFBsAYfEpHzh*ldzdJCQ9VbDS6QuE8ClspnCaYHZdk5fm3YokKpNyWlXDuIQVsqXGuXkVptQAaop5JtVXYFmix&new=1",tag:["笔试","面试","综合",""]}
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
      <Layout fromType='readBook'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/xiecheng.png' trade='互联网' tag='2017最具价值中国品牌100强'
                         isOnlineApply companyName='携程' />
          <SchoolNav fromType='exp' processLink='/school/xiecheng/schoolprocess' workLink='/school/xiecheng/schoolWork' expLink='/school/xiecheng/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
