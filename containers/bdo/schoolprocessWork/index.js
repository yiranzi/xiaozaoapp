import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '鸡血女王和贝恩的四个W——贝恩三年教会我的事', link: 'https://www.linkedin.com/wukong-web/companyReflection/2114-302173?ts=1502763269723&trk=company_review_review_share_wechat'},
        {title: '我为什么选择加入贝恩？', link: 'https://www.linkedin.com/wukong-web/companyReflection/2114-302165?ts=1502763292382&trk=company_review_review_share_wechat'},
        {title: '浅谈MBB之间的区别，以及我为什么选择了贝恩', link: 'https://www.linkedin.com/wukong-web/companyReflection/2114-200157?ts=1502763317362&trk=company_review_review_share_wechat'},
        {title: 'Bain教给我的那些事', link: 'https://www.linkedin.com/wukong-web/companyReflection/2114-200154?ts=1502763340278&trk=company_review_review_share_wechat'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/bain.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='2017Vault咨询公司'
          isOnlineApply companyName='贝恩' />
        <SchoolNav fromType='work' processLink='/school/bain/schoolprocess' workLink='/school/bain/schoolWork' expLink='/school/bain/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
