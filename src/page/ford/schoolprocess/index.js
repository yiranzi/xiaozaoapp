import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/ford.png' trade='汽车/车联网/智能交通' tag='2017世界500强'
          isOnlineApply companyName='福特' />
        <SchoolNav fromType='school' processLink='/school/ford/schoolprocess' workLink='/school/ford/schoolWork' expLink='/school/ford/schoolExp' />
        <SchoolOnlinApplyTime time='已于9月8日开启网申' address='http://campus.51job.com/ford/job.htm' isTime='false' />
        <SchoolFooter />
        <style jsx>{`
          .main-section {
            background-color:#F9F9F9;
          }
        `}</style>
      </div>
    )
  }
}
