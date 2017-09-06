import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';
import SchoolFooter from '../../../components/school/school-footer';

export default class schoolExp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[{title:"「四大」到底为何吸引学生？",link:"https://www.zhihu.com/question/20949243/answer/201464792"},
                {title:"四大的Consulting和Advisory部门有什么区别？",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=404307133&idx=1&sn=c468936b7311e5862ed80f977ce5f0f2&scene=4"},
                {title:"咨询篇：我在德勤得到的压力与成长",link:"https://www.linkedin.com/wukong-web/companyReflection/1038-300194?ts=1502764193272&trk=company_review_review_share_wechat"},
                {title:"咨询篇：在德勤风险咨询部门学到的最重要几课",link:"https://www.linkedin.com/wukong-web/companyReflection/1038-200201?ts=1502764101562&trk=company_review_review_share_wechat"},
                {title:"审计篇：如何做一个“聪明”的审计从业者？",link:"https://www.linkedin.com/wukong-web/companyReflection/1038-300192?ts=1502764218332&trk=company_review_review_share_wechat"},
                {title:"税务篇：非财务人的德勤非典型工作体会",link:"https://www.linkedin.com/wukong-web/companyReflection/1038-302157?ts=1502764244164&trk=company_review_review_share_wechat"},
                {title:"咨询篇：最新！刚刚结束在德勤ERS部门的实习，和大家分享一下",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654875549&idx=2&sn=9da9295a7aa943e3033a3a596752637b&chksm=f3bda576c4ca2c602d09eaab0a1ba8e1cd5baf3c46f3873e16781bdbd663070af58a28bf3e6e&scene=4"},
                {title:"审计篇：美国会计硕士后加入德勤纽约是种怎样的体验？",link:"https://www.linkedin.com/wukong-web/companyReflection/1038-301220?ts=1502764079742&trk=company_review_review_share_wechat"}
            ]
        };
    }

    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/de.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="德勤"/>
                <SchoolNav fromType="work" processLink="/school/de/schoolprocess" workLink="/school/de/schoolWork" expLink="/school/de/schoolExp"/>
                <List list={this.state.list}/>
            </div>
        );
    }
}