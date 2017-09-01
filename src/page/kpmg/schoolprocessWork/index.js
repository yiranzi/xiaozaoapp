import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';
import SchoolFooter from '../../../components/school/school-footer';

export default class schoolExp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[{title:"四大的Consulting和Advisory部门有什么区别？",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=404307133&idx=1&sn=c468936b7311e5862ed80f977ce5f0f2&scene=4"},
                {title:"「四大」到底为何吸引学生？",link:"https://www.zhihu.com/question/20949243/answer/201464792"},
                {title:"授权小灶发布 | 四大审计合伙人：毕马威审计行话指南，求对暗号！",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654875080&idx=3&sn=94fe1c85b6652bd0d535aabee010511f&scene=4"},
                {title:"税务篇：初入职场的四大人的一点分享",link:"https://www.linkedin.com/wukong-web/companyReflection/1079-300243?ts=1502763538807&trk=company_review_review_share_wechat"},
                {title:"要干就要干的漂亮！毕马威（纽约）教给我的那些道理",link:"https://www.linkedin.com/wukong-web/companyReflection/1079-302216?ts=1502763559468&trk=company_review_review_share_wechat"},
                {title:"咨询篇：你所不知道的KPMG Deal Advisory",link:"https://www.linkedin.com/wukong-web/companyReflection/1079-302200?ts=1502763582551&trk=company_review_review_share_wechat"},
                {title:"KPMG教会我的那些事儿",link:"https://www.linkedin.com/wukong-web/companyReflection/1079-200205?ts=1502763605415&trk=company_review_review_share_wechat"},
                {title:"审计 | One Year In KPMG",link:"https://www.linkedin.com/wukong-web/companyReflection/1079-302158?ts=1502763628273&trk=company_review_review_share_wechat"}]
        }
    }

    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/kpmg.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="毕马威"/>
                <SchoolNav fromType="work" processLink="/school/kpmg/schoolprocess" workLink="/school/kpmg/schoolWork" expLink="/school/kpmg/schoolExp"/>
                <List list={this.state.list}/>
            </div>
        );
    }
}