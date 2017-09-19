import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../../components/school/schoolFooter'
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/nier.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='世界级知名公司'
          isOnlineApply companyName='尼尔森' />
        <SchoolNav fromType='school' processLink='/school/nier/schoolprocess' workLink='/school/nier/schoolWork' expLink='/school/nier/schoolExp' />
        <SchoolOnlinApplyTime time='请登录尼尔森官网查看' address='http://careers.nielsen.com/' isTime='false' />
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
