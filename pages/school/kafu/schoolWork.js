import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[
        {title:"我们生怕你错过这家巴菲特押宝的顶尖快消公司！",link:"http://t.cn/RVQV8bV"},
        {title:"卡夫亨氏——行你就上，最 Aggressive 的管培项目",link:"http://t.cn/RVQV9XW"},
        {title:"【管培生分享-培训篇】梦想多大 舞台就多大",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2049376&extra=page%3D1%26filter%3Ddigest%26digest%3D1"},
        {title:"经验｜在卡夫亨氏做管培生是一种什么体验？",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506063985&ver=1&signature=du-37EPv6wcq0ZbeUg3cwJfSZeDhGaBX*jK5Sc29ZWPYAc3pQfvKYbnc-NFO5zIdTttrqB6KPefqxn*9NPuYsvjeliy9O0T3-crXGGVR0C4qKqcpy7UqukwGd9uq6oYVyJmTEaEF8Rekd3fyA85J4R0WJHfeWUAq*0WG1kgEPq0="}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='kafu'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/kafu.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='卡夫亨氏' />
          <SchoolNav fromType='work' processLink='/school/kafu/schoolprocess' workLink='/school/kafu/schoolWork' expLink='/school/kafu/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
