import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import List from '../../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '快销巨头宝洁的企业文化：我们到底需要什么样的人？', link: 'https://www.linkedin.com/wukong-web/companyReflection/1116-300210?ts=1502763166432&trk=company_review_review_share_wechat'},
        {title: '在宝洁（P&G）实习是一种怎样体验？', link: 'https://www.zhihu.com/question/41735763'},
        {title: '在P&G宝洁的财务部门工作是一种什么体验？', link: 'https://www.zhihu.com/question/25546377'},
        {title: '宝洁九年半，离开后的感悟（整理版）', link: 'http://www.jianshu.com/p/dd3394516055'},
        {title: '一个宝洁老兵的心路历程', link: 'http://www.jianshu.com/p/f4a1856d0e96'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/pg.png' trade='消费品/零售/贸易' tag='2017世界500强'
          isOnlineApply companyName='宝洁' />
        <SchoolNav fromType='work' processLink='/school/pg/schoolprocess' workLink='/school/pg/schoolWork' expLink='/school/pg/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
