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
                {title:"帮你分析咨询业申请的三大关卡：简历，case，behavior",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874334&idx=2&sn=762781c191074cd8b2ec929470218e89&scene=4",tag:["网申","面试","综合",""]},
                {title:"所有咨询公司面试可能用到的分析结构",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874378&idx=2&sn=64e33ef21995383ed13118e95b94a5f4&scene=4",tag:["综合","","",""]},
                {title:"想去咨询行业求职，需要做哪些准备？",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=405123300&idx=2&sn=4c1b63b593bc5bd3fc012ddc3b6fd52c&scene=4",tag:["综合","","",""]},
                {title:"麦肯锡2017大中華區校招全職offer",link:"http://bbs.yingjiesheng.com/thread-2099328-1-1.html",tag:["综合","","",""]},
                {title:"麦肯锡简略笔经回顾顺求面经",link:"http://bbs.yingjiesheng.com/thread-2054206-1-1.html",tag:["笔试","","",""]},
                {title:"麦肯锡想招什么样的人",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=404425132&idx=1&sn=c0b204751baeb001f7eb679b7e4fc9b6&scene=4",tag:["综合","","",""]},
                {title:"在麦肯锡工作是什么体验？",link:"https://mp.weixin.qq.com/s/ZgP3JNqyglbMt1363tWrPg",tag:["求职","","",""]},
                {title:"新鲜出炉的麦肯锡面经——2015.12.10",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2019638&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["笔试","面试","网申","综合"]},
                {title:"[笔试]麥肯錫PST筆試分享+誠徵CasePartner!",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2037495&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["笔试","","",""]},
                {title:"[笔试]16年9月PST刚过，简略笔经顺求PhoneInterview面经",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2054206&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["笔试","","",""]}
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
                <CompanyDetail headerimage="/static/school/mck.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="麦肯锡"/>
                <SchoolNav fromType="exp" processLink="/school/mck/schoolprocess" workLink="/school/mck/schoolWork" expLink="/school/mck/schoolExp"/>
                <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
            </div>
        );
    }
}