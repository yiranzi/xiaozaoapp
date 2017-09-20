import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../../components/school/schoolFooter'
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/bain.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='2017Vault咨询公司'
          isOnlineApply companyName='贝恩' />
        <SchoolNav fromType='school' processLink='/school/bain/schoolprocess' workLink='/school/bain/schoolWork' expLink='/school/bain/schoolExp' />
        <SchoolOnlinApplyTime time='已于9月6日发布校招职位' address='http://www.bain.cn/job.php?act=applications' isTime='false' />
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
