import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import TabList from '../../../components/school/TabList';
import SchoolFooter from '../../../components/school/school-footer';

export default class schoolExp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[
                {title:"普华永道英国伦敦实习申请经历回顾",link:"http://bbs.yingjiesheng.com/thread-2104217-1-1.html",tag:["网申","笔试","面试","综合"]},
                {title:"TAX|普华永道UKAC面会议分享",link:"http://bbs.yingjiesheng.com/thread-2050883-1-1.html",tag:["面试","","",""]},
                {title:"普华永道英国graduatescheme申请分享",link:"http://bbs.yingjiesheng.com/thread-2046569-1-1.html",tag:["网申","笔试","面试","综合"]},
                {title:"审计|普华永道的审计offer",link:"http://bbs.yingjiesheng.com/thread-2046592-1-1.html",tag:["面试","","","综合"]},
                {title:"TAX|普华永道HKtax--CSI四轮流程面试分享",link:"http://bbs.yingjiesheng.com/thread-2035438-1-1.html",tag:["面试","","",""]},
                {title:"普华永道从Leap到Offer，终于等到你",link:"http://bbs.yingjiesheng.com/thread-1979185-1-1.html",tag:["面试","","","综合"]},
                {title:"TAX|PwC北京所2017春季补招offer经验分享",link:"http://bbs.yingjiesheng.com/thread-2096112-1-1.html",tag:["网申","面试","",""]},
                {title:"误闯误撞进水房——我的PWC之旅",link:"http://bbs.yingjiesheng.com/thread-2035238-1-1.html",tag:["网申","笔试","面试","综合"]},
                {title:"PwC伦敦所offer的一路全干货分享",link:"http://bbs.yingjiesheng.com/thread-2027995-1-1.html",tag:["网申","笔试","面试","综合"]},
                {title:"2016校园招聘申请pwc深圳所的全过程",link:"http://bbs.yingjiesheng.com/thread-2010011-1-1.html",tag:["网申","笔试","面试","综合"]},
                {title:"独家！普华SuperDay来啦！一天4个环节，每个环节都很重要！",link:"https://mp.weixin.qq.com/s/g0bdBba-TCgfJVk4oZdhBw",tag:["面试","","",""]},
                {title:"PwCDeals|OT面试分享+干货",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2074346&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","笔试","",""]},
                {title:"[笔试]pwc2016青岛所春招笔试（含英文写作部分题目汇总）",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2040048&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["笔试","","",""]},
                {title:"TAX|PWCtax笔试+面试详细",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2005887&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["笔试","面试","",""]},
                {title:"TAX|PWCHKtax--CSI2016spring四轮流程面试",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2035438&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"Audit|HKAuditSuperday更新：已拿到offer",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2006658&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"普华永道校招＋笔试＋群面＋par面＋offer全流程",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2043539&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"干货！PWC爱丁堡telephoneinterview新鲜面经！",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2035199&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"Assurance|经过1年的沉浮，终于拿到pwcoffer啦～",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2016678&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"Consulting|11.6SH收到offer啦，分享面经攒人品！",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2004887&extra=page%3D2%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]}
            ]
        };
    }

    render() {
        let onlineApply = this.state.list.filter(function (item) {
            return item.tag.indexOf("网申") !== -1;
        })
        let exam = this.state.list.filter(function (item) {
            return item.tag.indexOf("笔试") !== -1;
        })
        let interview = this.state.list.filter(function (item) {
            return item.tag.indexOf("面试") !== -1;
        })
        let comphensive = this.state.list.filter(function (item) {
            return item.tag.indexOf("综合") !== -1;
        })
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/pwccn.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="普华永道"/>
                <SchoolNav fromType="exp" processLink="/school/pwccn/schoolprocess/index.html" workLink="/school/pwccn/schoolWork/index.html" expLink="/school/pwccn/schoolExp/index.html"/>
                <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
            </div>
        );
    }
}