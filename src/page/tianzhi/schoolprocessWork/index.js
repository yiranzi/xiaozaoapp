import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/tianzhi.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='天职' />
        <SchoolNav fromType='work' processLink='/school/tianzhi/schoolprocess' workLink='/school/tianzhi/schoolWork' expLink='/school/tianzhi/schoolExp' />
        {/* <List list={this.state.list} /> */}
      </div>
    )
  }
}
