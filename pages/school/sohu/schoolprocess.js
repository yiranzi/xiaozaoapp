import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='sohu'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/redBook.png' trade='互联网' tag='中国500强'
                         isOnlineApply companyName='搜狐' />
          <SchoolNav fromType='school' processLink='/school/sohu/schoolprocess' workLink='/school/sohu/schoolWork' expLink='/school/sohu/schoolExp' />
          <SchoolOnlinApplyTime time='08月07日开启' address='http://company.dajie.com/nb/minisite/sohu_2017/index.html' isTime='true' />
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
