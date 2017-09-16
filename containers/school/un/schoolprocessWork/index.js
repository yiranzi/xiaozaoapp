import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import List from '../../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '在招商银行工作是一种怎样的体验？', link: 'https://www.zhihu.com/question/26738012'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/un1.png' trade='消费品/零售/贸易' tag='2017世界500强'
          isOnlineApply companyName='联合利华' />
        <SchoolNav fromType='work' processLink='/school/un/schoolprocess' workLink='/school/un/schoolWork' expLink='/school/un/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
