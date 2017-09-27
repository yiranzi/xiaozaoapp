import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='qihu'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/qihu.png' trade='互联网' tag='中国500强'
                         isOnlineApply companyName='奇虎360' />
          <SchoolNav fromType='school' processLink='/school/qihu/schoolprocess' workLink='/school/qihu/schoolWork' expLink='/school/qihu/schoolExp' />
          <SchoolOnlinApplyTime time='08月14日开启' address='http://campus.chinahr.com/2017/qihu360/positions.asp' isTime='true' />
          <SchoolFooter />
        </div>
        <style jsx>{`
          .main-section {
            background-color:#F9F9F9;
          }
        `}</style>
      </Layout>
    )
  }
}
