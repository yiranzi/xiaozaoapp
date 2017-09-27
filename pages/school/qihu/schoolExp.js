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
        {title:"360搜索服务端-C++面经（一面+二面）",link:"http://www.jianshu.com/p/f3291f643768",tag:["面试","","",""]},
        {title:"面经---奇虎360",link:"http://www.jianshu.com/p/7577bc1f2549",tag:["面试","","",""]},
        {title:"奇虎360软件测试工程师三轮面试经验",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506322700&ver=413&signature=P8aZ*ga-CFab30NaNLCVyRU2i82sbTc1FcpjbpPfn7CcTxFadMu6gkKO85k7dfG47T4h5eDTRgtDiLfuMVYyaCrNnfZ39ZrxcjuPpqeo0vy1I4GiQd4GDogYcpz*wT6s&new=1",tag:["面试","","",""]},
        {title:"每个人都是一本书，简历就是目录——奇虎360HR总监谈学生简历与面试技巧",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506322833&ver=1&signature=-B5VhUnWI4DMLuF1ByyYNRJOs-NcAWd6zTN41-ieL5w2wkW9ZbQkn6O1UBHftl1-L6JF*w89NsJbWbLPEinMbIdRmNFljDEsm*uRGQtde9kDJqTA1s*qb-Z-k*GiBJzZ6if5D6ZOQJPqKzUMUzDSXw==",tag:["面试","","",""]},
        {title:"大二实习瞄上奇虎360产品经理",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506323003&ver=1&signature=tWIFWzLiO-PdtTDYFUcbdsdtTKZ*DWT3VBlrOiO1IbbEwu0nosJSq6qWH69m0H4Ayn7q7eYb5CUpyA0XNlFm3WshScG5UvFLGLX4kAKJZzBBUl6kE4Wz1SsuCmF-b1kkUoxYUOdUu*ZTTBL2G*Qh*w==",tag:["面试","","",""]},
        {title:"互联网校招季（一）:360面试官教你准备神之简历",link:"https://zhuanlan.zhihu.com/p/22658765",tag:[" ","","",""]},
        {title:"我是如何获得360软件工程师工作的",link:"https://zhuanlan.zhihu.com/p/27341070",tag:[" ","","",""]}
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
          <CompanyDetail headerimage='/static/school/qihu.png' trade='互联网' tag='中国500强'
                         isOnlineApply companyName='奇虎360' />
          <SchoolNav fromType='exp' processLink='/school/qihu/schoolprocess' workLink='/school/qihu/schoolWork' expLink='/school/qihu/schoolExp' />
          <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
        </div>
      </Layout>
    )
  }
}
