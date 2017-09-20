import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import List from '../../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '采访复旦-麻省理工国际MBA：外资商业银行客户经理职场经验分享（下）', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654873187&idx=1&sn=8f4b4f01b6c026ca067f90aaf833e672&scene=4'},
        {title: '采访复旦-麻省理工国际MBA：外资商业银行客户经理职场经验分享（上）', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654873183&idx=1&sn=6f8c5f56404e0385de6053059ad312d0&scene=4'},
        {title: '在渣打银行工作是怎样一番体验？', link: 'https://www.zhihu.com/question/24395599'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/zhada.png' trade='银行/证券/基金/保险/投资公司' tag='2016世界500强'
          isOnlineApply companyName='渣打银行' />
        <SchoolNav fromType='work' processLink='/school/zhada/schoolprocess' workLink='/school/zhada/schoolWork' expLink='/school/zhada/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
