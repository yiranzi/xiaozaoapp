import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import TabList from '../../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title:"GZ事务所：致同+立信+正中珠江（相关笔试/面试）",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2071562&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["笔试","面试","",""]},
        {title:"立信江苏分所校招经验贴",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2018194&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["笔试","面试","",""]},
        {title:"毕业求职一路走来",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2013090&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["综合","","",""]},
        {title:"立信春招网投笔试面试offer经验",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2037696&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","笔试","面试",""]},
        {title:"【造福95后！2016校招综合经验",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2019095&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","笔试","面试",""]},
        {title:"立信会计师事务所（上海所）一路走来",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2012411&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","笔试","面试",""]}
      ]
    }
  }

  render () {
    let onlineApply = this.state.list.filter(function (item) {
      return item.tag.indexOf('网申') !== -1
    })
    let exam = this.state.list.filter(function (item) {
      return item.tag.indexOf('笔试') !== -1
    })
    let interview = this.state.list.filter(function (item) {
      return item.tag.indexOf('面试') !== -1
    })
    let comphensive = this.state.list.filter(function (item) {
      return item.tag.indexOf('综合') !== -1
    })
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/bdo.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='立信' />
        <SchoolNav fromType='exp' processLink='/school/bdo/schoolprocess' workLink='/school/bdo/schoolWork' expLink='/school/bdo/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
