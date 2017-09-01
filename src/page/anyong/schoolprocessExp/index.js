import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';
import TabList from '../../../components/school/TabList';
import SchoolFooter from '../../../components/school/school-footer';

export default class schoolExp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [
                {title:"Tax|安永HK所ustax视频面试流程攒人品",link:"http://bbs.yingjiesheng.com/thread-2109215-1-1.html",tag:["面试","","",""]},
                {title:"安永2017年3月春招补录面经流程",link:"http://bbs.yingjiesheng.com/thread-2094571-1-1.html",tag:["面试","","",""]},
                {title:"审计|安永2017校园招聘全程笔经面经",link:"http://bbs.yingjiesheng.com/thread-2072289-1-1.html",tag:["网申","面试","",""]},
                {title:"Tax|安永SLP2016北京Tax，纪念第一个正式offer",link:"http://bbs.yingjiesheng.com/thread-2049212-1-1.html",tag:["面试","","",""]},
                {title:"审计|安永北京审计求职全程经验，良心回馈愿能助力",link:"http://bbs.yingjiesheng.com/thread-2002937-1-1.html",tag:["网申","面试","",""]},
                {title:"安永FIDS2016届夏季招聘经验",link:"http://bbs.yingjiesheng.com/thread-1975709-1-1.html",tag:["面试","","",""]},
                {title:"Advisory|刚面完安永的PeopleAdvisoryServices，和大家分享一下经验",link:"https://mp.weixin.qq.com/s/KFoay7azDoFjO8r__OxQOg",tag:["面试","","",""]},
                {title:"刚入职安永，分享求职安永和可口可乐的经验给大家",link:"https://mp.weixin.qq.com/s/8n_cJSHv-n6KxjakNXZo3w",tag:["面试","","",""]},
                {title:"10月29日面经！安永实习广州群面「如何为某超市制定扩张计划？」",link:"https://mp.weixin.qq.com/s/hvpaBUbSfM_K6GFzs46OtA",tag:["面试","","",""]},
                {title:"独家获取前安永经理撰写的「四大面试解读」",link:"https://mp.weixin.qq.com/s/ZYAj6EC3kK3jlm7mzXTr6Q",tag:["面试","","",""]},
                {title:"审计|EY+北京所+审计介绍",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2103783&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","","综合"]},
                {title:"审计|EY安永（郑州）全过程含PWC、DTT、KPMG",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2082539&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"Advisory|9月开始投了四次EY，终于拿到offer，感激一切（补招经历分享+嘚啵嘚啵的感悟）",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2030122&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","面试","",""]},
                {title:"advisory|SHITriskadvisory（ac+m+par面经）等offer（包含DTT)",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2081315&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"Tax|BJTAX跑完全程收到offer回馈论坛保证干货！",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2072537&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","面试","",""]},
                {title:"审计|安永Audit网申+笔试+AC面+Par面+Tax经理面+Par面经验大礼包",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2072289&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["网申","面试","",""]},
                {title:"审计|校招句号，回赠论坛。SZ安永offer",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2069673&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"Advisory|春招EYBJ咨询FSRM全流程",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2037948&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
                {title:"税务|2016.7.13上海所已拿offerSLP总结",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2049061&extra=page%3D1%26filter%3Ddigest%26digest%3D1",tag:["面试","","",""]},
            ]
        };
    }

    render(){
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
                <CompanyDetail headerimage="/static/school/anyong.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="安永"/>
                <SchoolNav fromType="exp" processLink="/school/anyong/schoolprocess" workLink="/school/anyong/schoolWork" expLink="/school/anyong/schoolExp"/>
                <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
            </div>
        );
    }
}