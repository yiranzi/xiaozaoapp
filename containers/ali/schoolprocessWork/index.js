import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '一名小小的“一年香”阿里人所感受到的阿里文化和价值观', link: 'https://www.linkedin.com/wukong-web/companyReflection/14160-302186?ts=1502761360732&trk=company_review_review_share_wechat'},
        {title: '在淘宝做用户研究的工作状态是这样的', link: 'https://www.linkedin.com/wukong-web/companyReflection/14160-301213?ts=1502761386443&trk=company_review_review_share_wechat'},
        {title: '在阿里健康做数据分析师是种怎样的体验？', link: 'https://www.linkedin.com/wukong-web/companyReflection/14160-301203?ts=1502761410906&trk=company_review_review_share_wechat'},
        {title: '市场、小编到数据分析：我的阿里6年', link: 'https://www.linkedin.com/wukong-web/companyReflection/14160-301196?ts=1502761461438&trk=company_review_review_share_wechat'},
        {title: '回头感受阿里移动', link: 'https://www.linkedin.com/wukong-web/companyReflection/14160-301189?ts=1502761489803&trk=company_review_review_share_wechat'},
        {title: '我眼中的UC：阿里之中，但又在阿里之外', link: 'https://www.linkedin.com/wukong-web/companyReflection/14160-302124?ts=1502761514414&trk=company_review_review_share_wechat'},
        {title: '关于一名新人如何在阿里获得成功', link: 'https://www.linkedin.com/wukong-web/companyReflection/14160-301147?ts=1502761537682&trk=company_review_review_share_wechat'},
        {title: '在阿里巴巴当HR是怎样一种体验？', link: 'https://www.zhihu.com/question/26981318'},
        {title: '在阿里巴巴工作是怎样一番体验？', link: 'https://www.zhihu.com/question/22394450'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/ali.jpg' trade='互联网' tag='2017世界500强'
          isOnlineApply companyName='阿里巴巴' />
        <SchoolNav fromType='work' processLink='/school/ali/schoolprocess' workLink='/school/ali/schoolWork' expLink='/school/ali/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
