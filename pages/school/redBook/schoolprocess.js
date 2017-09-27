import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='redBook'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/redBook.png' trade='互联网' tag='2017未来独角兽前150强'
                         isOnlineApply companyName='小红书' />
          <SchoolNav fromType='school' processLink='/school/redBook/schoolprocess' workLink='/school/redBook/schoolWork' expLink='/school/redBook/schoolExp' />
          <SchoolOnlinApplyTime time='已于9月7日开始' address='http://xiaohongshu.zhiye.com/Campus' isTime='true' />
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
