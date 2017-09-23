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
        {title:"卡夫亨氏热乎乎的AC面筋",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2018692&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","","",""]},
        {title:"直通笔试！卡夫亨氏HR答疑，现场给名额！",link:"http://m.qlchat.com/topic/260000087381428.htm",tag:["综合","","",""]}
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
      <Layout fromType='kafu'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/kafu.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='卡夫亨氏' />
          <SchoolNav fromType='exp' processLink='/school/kafu/schoolprocess' workLink='/school/kafu/schoolWork' expLink='/school/kafu/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
