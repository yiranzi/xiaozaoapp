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
                {title:"联合利华2016校招上海CD面试经验分享",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2007156&extra=page=1",tag:["面试","","",""]},
                {title:"联合利华的管培生有什么要求？",link:"https://www.zhihu.com/question/24527961",tag:["","","","综合"]},
                {title:"[面试]造福社会，联合利华VI面试内容分享。",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2063958&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"[面试]从网申到VI",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2060659&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","笔试","面试","综合"]},
                {title:"[面试]上海CD一面分享",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2007156&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"[综合经验]联合利华—浙江个护面经—Offer通知",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2029843&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","笔试","",""]},
                {title:"[面试]人生第一场求职面试——U家foodsolutionmkt",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2006358&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"联合利华面经|从网申到AC面",link:"https://mp.weixin.qq.com/s?src=3&timestamp=1504600299&ver=1&signature=8MktR6lU88wDBtj0XTvs0JC48PoOnryd8wrv7ZeE-ou14NzAMSkBZFx47FOFT4EvNLSeLHG6uex7hzv2mT-AIS3sEwu5NgsFfI0XcW0L1Edlvhkzhu-gEHtKKeN-PqHxmQG6EoDtho789L7dNGS7V5wrdkUujRMQ9fNJ40M15PI=",tag:["网申","笔试","面试",""]}
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
                <CompanyDetail headerimage="/static/school/un.png" trade="消费品/零售/贸易" tag="2017世界500强"
                               isOnlineApply={true} companyName="联合利华"/>
                <SchoolNav fromType="exp" processLink="/school/un/schoolprocess" workLink="/school/un/schoolWork" expLink="/school/un/schoolExp"/>
                <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
            </div>
        );
    }
}