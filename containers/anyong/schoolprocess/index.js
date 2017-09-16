import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/anyong.png' trade='会计师事务所/咨询/法律' tag='世界级知名公司'
          isOnlineApply companyName='安永' />
        <SchoolNav fromType='school' processLink='/school/anyong/schoolprocess' workLink='/school/anyong/schoolWork' expLink='/school/anyong/schoolExp' />
        <SchoolOnlinApplyTime time='9月1开启网申' address='' isTime='false' />
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
