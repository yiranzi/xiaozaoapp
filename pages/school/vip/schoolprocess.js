import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='vip'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/vip.png' trade='互联网' tag='2017全球250强零售商'
                         isOnlineApply companyName='唯品会' />
          <SchoolNav fromType='school' processLink='/school/vip/schoolprocess' workLink='/school/vip/schoolWork' expLink='/school/vip/schoolExp' />
          <SchoolOnlinApplyTime time='2017年07月22日开启网申' address='http://campus.vip.com/' isTime='true' />
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
