import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='tt'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/tt.png' trade='互联网' tag='2017世界500强'
                         isOnlineApply companyName='腾迅' />
          <SchoolNav fromType='school' processLink='/school/tt/schoolprocess' workLink='/school/tt/schoolWork' expLink='/school/tt/schoolExp' />
          <SchoolOnlinApplyTime time='07月27日开启' address='https://mp.weixin.qq.com/s/JCEteuimxbymTb0wX7izmQ' isTime='true' />
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
