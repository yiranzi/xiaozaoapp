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
        {title:"欧莱雅&联合利华的暑期实习面试回顾",link:"http://bbs.yingjiesheng.com/thread-2104806-1-1.html",tag:[" ","面试"," ",""]},
        {title:"来自双非院校的欧莱雅2017实习申请全纪录",link:"http://bbs.yingjiesheng.com/thread-2103580-1-1.html",tag:[" "," ","综合",""]},
        {title:"欧莱雅市场部实习岗网申到终面全程记录",link:"http://bbs.yingjiesheng.com/thread-2102063-1-1.html",tag:[" ","面试"," ",""]},
        {title:"2017欧莱雅summer intern HR岗面经分享",link:"http://bbs.yingjiesheng.com/thread-2100770-1-1.html",tag:[" "," ","综合",""]},
        {title:"欧莱雅2017进击的MT Offer经验",link:"http://bbs.yingjiesheng.com/thread-2091900-1-1.html",tag:["网申","面试","综合",""]},
        {title:"2017届欧莱雅MKT MT面试经验分享",link:"http://bbs.yingjiesheng.com/thread-2084540-1-1.html",tag:["网申","面试","综合",""]},
        {title:"欧莱雅供应链/生产运营MT暑期实习",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2047352&extra=page=1",tag:[" "," "," ",""]},
        {title:" L'Oreal 2016校招 - 网申到offer面经 ",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2016320&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","面试","综合",""]},
        {title:"记欧莱雅2015校招研发面试",link:"http://www.jianshu.com/p/b65f8fd2ceda",tag:["网申","面试","综合",""]}
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
      <Layout fromType='oliya'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/oulaiya.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='欧莱雅' />
          <SchoolNav fromType='exp' processLink='/school/olaiya/schoolprocess' workLink='/school/olaiya/schoolWork' expLink='/school/olaiya/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
