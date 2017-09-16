import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/zhitong.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='致同' />
        <SchoolNav fromType='school' processLink='/school/zhitong/schoolprocess' workLink='/school/zhitong/schoolWork' expLink='/school/zhitong/schoolExp' />
        <SchoolOnlinApplyTime time='已经开启，于9月18日截止' address='http://www.grantthornton.cn/cn/Careers/Graduates/%20Apply%20now/index.html' isTime='false' />
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
