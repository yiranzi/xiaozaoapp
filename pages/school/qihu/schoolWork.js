import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[
        {title:"奇虎360教会的我5件小事",link:"https://www.linkedin.com/wukong-web/companyReflection/1413523-702002"},
        {title:"在360做产品经理的体验",link:"https://www.linkedin.com/wukong-web/companyReflection/1413523-300225?ts=1502759916347&trk=company_review_review_share_wechat"},
        {title:"360的工作环境与个人发展机遇",link:"https://www.linkedin.com/wukong-web/companyReflection/1413523-300206?ts=1502760009148&trk=company_review_review_share_wechat"},
        {title:"那些年，我在360工作的那些事",link:"https://www.linkedin.com/wukong-web/companyReflection/1413523-300191?ts=1502760076743&trk=company_review_review_share_wechat"},
        {title:"在 360 工作是怎样的体验？",link:"https://www.zhihu.com/question/24824414?rf=25559034"},
        {title:"专访奇虎360高级PM：为公司挣几个亿，经验都是从摔跟头开始",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1506322915&ver=1&signature=vTOwvBR-QekIXGE7oEoaC3EHrbBWzCnaRl51SsepbXnv7URY-3IC0Uu75JVC5AsZBDAhe59AiP5wypPLps7VAhPZ063ZOsp8RFyfA7bP5rua31mXNbF-Rc30Dylkb-yZ355DZMac9UCAo561De3cY6V*KWn7a4b1upaaXesePdE="},
        {title:"360公司初体验：你不曾了解的360",link:"https://www.linkedin.com/wukong-web/companyReflection/1413523-301185?ts=1502760121359&trk=company_review_review_share_wechat"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='qihu'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/qihu.png' trade='互联网' tag='中国500强'
                         isOnlineApply companyName='奇虎360' />
          <SchoolNav fromType='work' processLink='/school/qihu/schoolprocess' workLink='/school/qihu/schoolWork' expLink='/school/qihu/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
