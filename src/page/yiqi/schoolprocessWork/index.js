import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '一汽大众销售岗工作体验？', link: 'https://www.zhihu.com/question/28319310'},
        {title: '在上海大众、一汽大众公司工作是一种怎样的体验？', link: 'https://www.zhihu.com/question/24545997'} ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/yiqi.png' trade='汽车/车联网/智能交通' tag='2017世界500强'
          isOnlineApply companyName='一汽大众' />
        <SchoolNav fromType='work' processLink='/school/yiqi/schoolprocess' workLink='/school/yiqi/schoolWork' expLink='/school/yiqi/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
