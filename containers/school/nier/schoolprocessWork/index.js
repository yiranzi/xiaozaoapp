import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import List from '../../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '管理咨询顾问最常见的职业下一站', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874482&idx=1&sn=04d3a4a0267232543c9f8506926ed595&scene=4'} ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/nier.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='世界级知名公司'
          isOnlineApply companyName='尼尔森' />
        <SchoolNav fromType='work' processLink='/school/nier/schoolprocess' workLink='/school/nier/schoolWork' expLink='/school/nier/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
