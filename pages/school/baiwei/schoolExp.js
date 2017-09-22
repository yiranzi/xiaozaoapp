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
        {title:"拖延症晚期患者的百威英博供应链经验贴",link:"http://bbs.yingjiesheng.com/thread-2034735-1-1.html",tag:["综合经验","","",""]},
        {title:"百威英博GMT面试过程感悟及经验",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506067738&ver=1&signature=lVYBds5vOdtnXhve4DooDMg9MxgO9xS7ENgy3v1zczPTSkM9DZW7TnJpa-*VNul9sNOIfuysmjXU48kQ4uZjK98wljbk1e01Zh1UGkU507MTVIRLNAcqH0CN1OirBN1MwbpdsrdrufZiiXHVUfZgEw==",tag:["面试","","",""]}
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
      <Layout fromType='baiwei'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/baiwei.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='百威英博' />
          <SchoolNav fromType='exp' processLink='/school/baiwei/schoolprocess' workLink='/school/baiwei/schoolWork' expLink='/school/baiwei/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
