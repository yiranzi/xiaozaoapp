import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import TabList from '../../../components/school/TabList';

export default class schoolExp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          list:[{title:"2017毕马威春季精英计划网申与笔试之旅",link:"",tag:["网申","笔试","",""]},
              {title:"我的2017秋招之路-毕马威、普华永道和安永",link:"",tag:["面试","","",""]},
              {title:"毕马威香港——從M面到簽約的13天经历",link:"",tag:["面试","","",""]},
              {title:"毕马威（KPMG）2017校招笔试回忆",link:"",tag:["笔试","","",""]},
              {title:"税务|毕马威tax补招之笔试面试全过程",link:"",tag:["面试","","",""]},
              {title:"KPMG英国Telephoneinterview经验",link:"",tag:["面试","","",""]},
              {title:"审计|毕马威2016秋招审计面经全程分享",link:"",tag:["网申","笔试","面试",""]},
              {title:"审计|毕马威香港2016校招应聘经历",link:"",tag:["面试","","",""]},
              {title:"审计|毕马威北京所Audit2016校招提前批面经",link:"",tag:["面试","","","综合"]},
              {title:"咨询|KPMGFRMadvisory求职经验",link:"",tag:["面试","","",""]},
              {title:"审计|那些年，我和毕马威的故事",link:"",tag:["网申","面试","",""]},
              {title:"10月17日面经！毕马威经理面「如何以加盟店的形式拆分中国市场」",link:"",tag:["面试","","",""]},
              {title:"高能分享|毕马威通关：笔试+M面+Par面",link:"",tag:["面试","","",""]},
              {title:"审计|2016KPMG英国auditOT＋电面＋AC＋par面walkthrough",link:"",tag:["笔试","面试","",""]},
              {title:"2017SH所精英计划网申+笔试+面试经验",link:"",tag:["网申","笔试","面试",""]},
              {title:"[笔试]2017.04.24精英计划BJ所网申+笔经＋资料分享",link:"",tag:["网申","笔试","",""]},
              {title:"咨询|KPMGITAOFFER【OT+面试全经验】回馈+干货",link:"",tag:["网申","笔试","面试","综合"]},
              {title:"[笔试]2017KPMG校招笔试回忆",link:"",tag:["笔试","","",""]},
              {title:"27/06/2016-KPMG英国UK-TELEPHONEINTERVIEW-TECHNOLOGYDELIVERY",link:"",tag:["面试","","","综合"]},
              {title:"税务|GZTax补招（从笔试到par面）希望给后来人有帮助",link:"",tag:["面试","","",""]},
              {title:"毕马威一生推——美国面经",link:"",tag:["面试","","",""]},]
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
        console.log(comphensive);
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/kpmg.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="毕马威校招卡"/>
                <SchoolNav fromType="exp" processLink="/school/kpmg/schoolprocess" workLink="/school/kpmg/schoolWork" expLink="/school/kpmg/schoolExp"/>
                <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
            </div>
        );
    }
}