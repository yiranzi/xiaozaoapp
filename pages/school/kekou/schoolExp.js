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
        {title:"【海外留学党】【marketing管培生】电面+OT笔经（内附logical题库答案）",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2002739&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["综合","","",""]},
        {title:"热腾腾的可口可乐面经",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506065093&ver=1&signature=lVYBds5vOdtnXhve4DooDMg9MxgO9xS7ENgy3v1zczN921EmERqXYyk7Tt3RunT5AKXczUngaOXNAVUTejVDGGxJiJebSleUgdqsWnn3BKAIskA5lxp-9*IFfC3EJa1dOiaeoYFaAYnn5WERQV3nbQ==",tag:["面试","","",""]},
        {title:"刚结束的热乎乎电面-2016飞扬计划MKT管培 ",link:"http://bbs.yingjiesheng.com/thread-2000622-1-1.html",tag:["面试","","",""]},
        {title:"飞扬计划电面",link:"http://bbs.yingjiesheng.com/thread-1999340-1-1.html",tag:["面试","","",""]},
        {title:"飞扬计划-Finance电面",link:"http://bbs.yingjiesheng.com/thread-1998960-1-1.html",tag:["面试","","",""]}
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
          <CompanyDetail headerimage='/static/school/kekou.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='可口可乐' />
          <SchoolNav fromType='exp' processLink='/school/kekou/schoolprocess' workLink='/school/kekou/schoolWork' expLink='/school/kekou/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
