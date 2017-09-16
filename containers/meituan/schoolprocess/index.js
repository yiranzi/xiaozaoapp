import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/meituan.png' trade='互联网' tag='2016中国互联网前100强'
          isOnlineApply companyName='美团点评' />
        <SchoolNav fromType='school' processLink='/school/meituan/schoolprocess' workLink='/school/meituan/schoolWork' expLink='/school/meituan/schoolExp' />
        <SchoolOnlinApplyTime time='已于8月20日开启网申' address='http://campus.meituan.com/' isTime='false' />
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
