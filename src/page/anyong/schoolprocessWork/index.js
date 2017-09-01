import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[
                {title:"「四大」到底为何吸引学生？",link:"https://www.zhihu.com/question/20949243/answer/201464792",publishTime:"",tag:"工作体验"},
                {title:"四大的Consulting和Advisory部门有什么区别？",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=404307133&idx=1&sn=c468936b7311e5862ed80f977ce5f0f2&scene=4",publishTime:"",tag:"工作体验"},
                {title:"审计篇：在安永做审计的机会与局限",link:"https://www.linkedin.com/wukong-web/companyReflection/1073-600003?ts=1502762112768&trk=company_review_review_share_wechat",publishTime:"",tag:"工作体验"},
                {title:"安永是这样对待离职员工的",link:"https://www.linkedin.com/wukong-web/companyReflection/1073-302211?ts=1502762146310&trk=company_review_review_share_wechat",publishTime:"",tag:"工作体验"},
                {title:"税务篇：安永工作面面观",link:"https://www.linkedin.com/wukong-web/companyReflection/1073-302178?ts=1502762169793&trk=company_review_review_share_wechat",publishTime:"",tag:"工作体验"},
                {title:"咨询篇：安永税务咨询究竟在做什么？",link:"https://www.linkedin.com/wukong-web/companyReflection/1073-302177?ts=1502762194599&trk=company_review_review_share_wechat",publishTime:"",tag:"工作体验"},
                {title:"审计篇：逆水行舟，不进则退——我在安永的工作体验",link:"https://www.linkedin.com/wukong-web/companyReflection/1073-300181?ts=1502762216986&trk=company_review_review_share_wechat",publishTime:"",tag:"工作体验"},
                {title:"安永：一切由people first开始",link:"https://www.linkedin.com/wukong-web/companyReflection/1073-200156?ts=1502762246964&trk=company_review_review_share_wechat",publishTime:"",tag:"工作体验"},
                {title:"审计篇：青春十二载，我在安永收获的那些点滴",link:"https://www.linkedin.com/wukong-web/companyReflection/1073-302130?ts=1502762272009&trk=company_review_review_share_wechat",publishTime:"",tag:"工作体验"},
                {title:"审计篇：从北京到美国，我在安永审计获得的职业成长",link:"https://www.linkedin.com/wukong-web/companyReflection/1073-302129?ts=1502762297948&trk=company_review_review_share_wechat",publishTime:"",tag:"工作体验"},
                {title:"审计篇： 安永北京所待遇详情及审计业务详解",link:"http://bbs.yingjiesheng.com/thread-2103783-1-1.html",publishTime:"",tag:"工作体验"},
                {title:"咨询篇：在帕特侬工作 ",link:"http://bbs.yingjiesheng.com/thread-1994064-1-1.html",publishTime:"",tag:"工作体验"},
                {title:"咨询篇： 在Parthenon工作的日子3",link:"http://bbs.yingjiesheng.com/thread-1984373-1-1.html",publishTime:"",tag:"工作体验"}
            ]
        };
    }

    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/anyong.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="安永校招卡"/>
                <SchoolNav fromType="work" processLink="/schoolassistantanyong/schoolprocess" workLink="/schoolassistantanyong/schoolWork" expLink="/schoolassistantanyong/schoolExp"/>
                <List list={this.state.list} />
            </div>
        );
    }
}