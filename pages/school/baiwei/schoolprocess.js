import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='baiwei'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/baiwei.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='百威英博' />
          <SchoolNav fromType='school' processLink='/school/baiwei/schoolprocess' workLink='/school/baiwei/schoolWork' expLink='/school/baiwei/schoolExp' />
          <SchoolOnlinApplyTime time='9月已开启，10月结束网申' address='http://www.abi-gmt.net/frame.html?page=gmt_project' isTime='true' />
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
