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
                {title:"2016玛氏箭牌销售培训生求职经验分享",link:"http://bbs.yingjiesheng.com/thread-2020901-1-1.html",tag:["网申","笔试","面试","综合"]},
                {title:"从网申到终面",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2026329&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","笔试","面试","综合"]},
                {title:"【签约】开心的箭牌之旅",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2035240&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["求职","笔试","面试","综合"]},
                {title:"经验分享】玛氏箭牌面经",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1504599575&ver=1&signature=Fzad8q7aUsCtvQxqVLXkRS2HzY4X*WQOzGgT76KTN*gfLTRYBf5HmeiS2slWur-m1Tbj6gq0n7s5FPmaCqNTFDTRrMFTHe0zRP21ZMfesHEgiN93q93fDOjDFX7Q3-eE9eSJbYbchcN-pKePxHZfNA==",tag:["","","面试",""]},
                {title:"玛氏GMT群面面经（流程+建议）",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1504599575&ver=1&signature=wBhFZ3VdWcWc-UHLKDVLI61ml2b39OTFZ6rVylgbaMMX80M*bJ7G-PMoPhYq1LT5QKmSBaVtlKYQWPkrZ4O*lU8l5AVXnhAl9IcHk0tE53G0yWgpYQDkiT8v2vXvqKcG2JN4gUAc3Ugov9xMlUcdc1kyLmps0EIeFWTfbEkTLJg=",tag:["","","面试",""]},
                {title:"带你走一轮玛氏面试",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1504599746&ver=1&signature=O5anLnu*2Aeld*h4muGrymr61nQ9SXgBV68PTggtUXyWl10umBPm1G4BIuFqNW7yXSS7dNbiGA7GW-OjLi4xidLlnvsHeL*EtbutD3NVa1IMF1NEwDNQLBOBn9LNTyhxoPpwayAjByVcjmEWlFGmLn*QTj-4k-3IBS0HkT*b-f0=",tag:["","","","面试"]}
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
                <CompanyDetail headerimage="/static/school/mars.png" trade="消费品/零售/贸易" tag="世界级知名公司"
                               isOnlineApply={true} companyName="玛氏"/>
                <SchoolNav fromType="exp" processLink="/school/mars/schoolprocess" workLink="/school/mars/schoolWork" expLink="/school/mars/schoolExp"/>
                <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
            </div>
        );
    }
}