import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../../components/school/schoolFooter'
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/ali.jpg' trade='互联网' tag='2017世界500强'
          isOnlineApply companyName='阿里巴巴' />
        <SchoolNav fromType='school' processLink='/school/ali/schoolprocess' workLink='/school/ali/schoolWork' expLink='/school/ali/schoolExp' />
        <SchoolOnlinApplyTime time='7月22开启网申' address='https://campus.alibaba.com/positionList.htm' isTime='false' />
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
