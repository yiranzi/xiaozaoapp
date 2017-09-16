import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '汇丰银行（HSBC）软件研发的工作怎么样？', link: 'https://www.zhihu.com/question/40842986'},
        {title: '汇丰银行2年的管理培训生到底培训的是啥？', link: 'https://www.linkedin.com/wukong-web/companyReflection/1241-301219?ts=1502766228589&trk=company_review_review_share_wechat'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/hsbc.png' trade='银行/证券/基金/保险/投资公司' tag='2017世界500强'
          isOnlineApply companyName='汇丰银行' />
        <SchoolNav fromType='work' processLink='/school/hsbc/schoolprocess' workLink='/school/hsbc/schoolWork' expLink='/school/hsbc/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
