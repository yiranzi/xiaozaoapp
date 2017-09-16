import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '埃森哲战略咨询教会我的三件事', link: 'https://www.linkedin.com/wukong-web/companyReflection/1033-301161?ts=1502761747508&trk=company_review_review_share_wechat'},
        {title: '记我“不成功”的咨询生涯', link: 'https://www.linkedin.com/wukong-web/companyReflection/1033-301166?ts=1502761736632&trk=company_review_review_share_wechat'},
        {title: '我爱A记：我与埃森哲的缘分', link: 'https://www.linkedin.com/wukong-web/companyReflection/1033-302153?ts=1502761727319&trk=company_review_review_share_wechat'},
        {title: '生存在“宇宙最大乙方”的三个法则', link: 'https://www.linkedin.com/wukong-web/companyReflection/1033-302174?ts=1502761715817&trk=company_review_review_share_wechat'},
        {title: '埃森哲：选择、认同和追求', link: 'https://www.linkedin.com/wukong-web/companyReflection/1033-300203?ts=1502761707621&trk=company_review_review_share_wechat'},
        {title: '三大业务，成就今天的埃森哲', link: 'https://www.linkedin.com/wukong-web/companyReflection/1033-300248?ts=1502761699900&trk=company_review_review_share_wechat'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/acc.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='2017世界500强'
          isOnlineApply companyName='埃森哲' />
        <SchoolNav fromType='work' processLink='/school/acc/schoolprocess' workLink='/school/acc/schoolWork' expLink='/school/acc/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
