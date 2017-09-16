import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '如何在滴滴成为一名“T型能力”人才？', link: 'https://www.linkedin.com/wukong-web/companyReflection/6472832-200212?ts=1502764428426&trk=company_review_review_share_wechat'},
        {title: '你能承受多大不安，就能学到多少本事｜那些滴滴教会我的事', link: 'https://www.linkedin.com/wukong-web/companyReflection/6472832-300195?ts=1502764452406&trk=company_review_review_share_wechat'},
        {title: '为什么在滴滴工作一年相当于别的地方工作十年？', link: 'https://www.linkedin.com/wukong-web/companyReflection/6472832-301159?ts=1502764491629&trk=company_review_review_share_wechat'},
        {title: '滴滴打车：我们是站在互联网浪潮之巅的小桔人', link: 'https://www.linkedin.com/wukong-web/companyReflection/6472832-200149?ts=1502764515364&trk=company_review_review_share_wechat'},
        {title: '在市值 350 亿美元公司实习是一种什么体验？', link: 'https://mp.weixin.qq.com/s/ESIdcz2YVVFfTH8SxxhAng'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/didi.png' trade='互联网' tag='2016中国互联网前100强'
          isOnlineApply companyName='滴滴出行' />
        <SchoolNav fromType='work' processLink='/school/didi/schoolprocess' workLink='/school/didi/schoolWork' expLink='/school/didi/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
