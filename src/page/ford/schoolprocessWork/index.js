import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '福特汽车管培岗的校招攻略', link: 'https://www.linkedin.com/wukong-web/companyReflection/1483-200218?ts=1502764975694&trk=company_review_review_share_wechat'}
      ]
    }
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/ford.png' trade='汽车/车联网/智能交通' tag='2017世界500强'
          isOnlineApply companyName='福特' />
        <SchoolNav fromType='work' processLink='/school/ford/schoolprocess' workLink='/school/ford/schoolWork' expLink='/school/ford/schoolExp' />
        <List list={this.state.list} />
      </div>
    )
  }
}
