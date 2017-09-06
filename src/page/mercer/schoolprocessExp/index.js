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
                {title:"美世咨询BD的caseinterview——压力面激发组员性格特征",link:"https://zhuanlan.zhihu.com/p/25357535",tag:["面试","","",""]},
                {title:"意外收割美世咨询实习Offer，分享下面试经验",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654880098&idx=1&sn=9ef9d7bbab735397c5bac0e9a2405729&chksm=f3bdcb89c4ca429f5f81b0bbcdbf19f7322b8fae7869be6909ffcd17cc99438e5d22ecd7f3e0&mpshare=1&scene=1&srcid=0426q7t2ujRqUACiPgINXmu7#rd",tag:["面试","","",""]},
                {title:"帮你分析咨询业申请的三大关卡：简历，case，behavior",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874334&idx=2&sn=762781c191074cd8b2ec929470218e89&scene=4",tag:["网申","面试","综合",""]},
                {title:"所有咨询公司面试可能用到的分析结构",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874378&idx=2&sn=64e33ef21995383ed13118e95b94a5f4&scene=4",tag:["综合","","",""]},
                {title:"想去咨询行业求职，需要做哪些准备？",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=405123300&idx=2&sn=4c1b63b593bc5bd3fc012ddc3b6fd52c&scene=4",tag:["综合","","",""]},
                {title:"一个3分钟咨询顾问的中文自我介绍｜小灶学堂第2期",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=403798731&idx=1&sn=0033f57d07ad94ab78a8831d27b26bc4&scene=4",tag:["面试","","",""]}
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
                <CompanyDetail headerimage="/static/school/mercer.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="美世咨询"/>
                <SchoolNav fromType="exp" processLink="/school/mercer/schoolprocess" workLink="/school/mercer/schoolWork" expLink="/school/mercer/schoolExp"/>
                <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
            </div>
        );
    }
}