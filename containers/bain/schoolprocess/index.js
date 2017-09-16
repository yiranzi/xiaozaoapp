import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/bdo.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='立信' />
        <SchoolNav fromType='school' processLink='/school/bdo/schoolprocess' workLink='/school/bdo/schoolWork' expLink='/school/bdo/schoolExp' />
        <SchoolOnlinApplyTime time='已于8月18日开启网申' address='http://www.bdo.com.cn/en-gb/careers' isTime='false' />
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
