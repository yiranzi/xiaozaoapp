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
        {title:"在市值300多亿美金的公司工作，是种怎样的体验？",link:"https://mp.weixin.qq.com/s?src=11&timestamp=1506320793&ver=413&signature=Jz616O9KX38yyPvST7dpUHVre77rZLLYKFU9PSCq65faXJj5CEDS9xU2WcQ8xAVd0kZ7eRYOQRPIlaVh2sL5dGt5VzeJhxcTOtD*-u31*iFvVTuBgVWvucCo7zNNRmTl&new=1"},
        {title:"我的青春我的携程之陈浩然",link:"https://v.qq.com/x/page/p03280tqsh1.html"},
        {title:"我的青春我的携程-王迪",link:"https://v.qq.com/x/page/l033219fkcj.html"},
        {title:"我的青春我的携程-罗飞",link:"https://v.qq.com/x/page/j0344wc3wvh.html"},
        {title:"携程校招宣传片——携程MT来了",link:"http://v.youku.com/v_show/id_XMjkxODQ2ODA5Ng==.html?spm=a2h0k.8191407.0.0&from=s1.8-1-1.2"},
        {title:"在携程就职是怎样的体验？",link:"https://www.zhihu.com/question/24718960/answer/145119957"},
        {title:"应届生怎么进携程工作？",link:"https://www.zhihu.com/question/38617627"},
        {title:"应届生加入携程做后台产品经理的经历",link:"https://www.linkedin.com/wukong-web/companyReflection/112959-1001002?ts=1502720444505&trk=company_review_review_share_wechat"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='xiecheng'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/xiecheng.png' trade='互联网' tag='2017最具价值中国品牌100强'
                         isOnlineApply companyName='携程' />
          <SchoolNav fromType='work' processLink='/school/xiecheng/schoolprocess' workLink='/school/xiecheng/schoolWork' expLink='/school/xiecheng/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
