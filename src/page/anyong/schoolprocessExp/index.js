import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';
export default class schoolExp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [
                {title:"审计 | 上海安永slp经验与感悟（都是肺腑之言啊）",link:"http://bbs.yingjiesheng.com/thread-2109511-1-1.html",publishTime:"",tag:"求职攻略"},
                {title:"Tax | 安永HK所us tax 视频面试流程攒人品",link:"http://bbs.yingjiesheng.com/thread-2109215-1-1.html",publishTime:"",tag:"求职攻略"},
                {title:"还愿！已签约安永来分享一路走来的经验",link:"http://bbs.yingjiesheng.com/thread-2103515-1-1.html",publishTime:"",tag:"求职攻略"},
                {title:"安永2017年3月春招补录面经流程",link:"http://bbs.yingjiesheng.com/thread-2094571-1-1.html",publishTime:"",tag:"求职攻略 "},
                {title:"审计 | 安永2017校园招聘全程笔经面经",link:"http://bbs.yingjiesheng.com/thread-2072289-1-1.html",publishTime:"",tag:"求职攻略"},
                {title:"Tax | 安永SLP2016北京Tax，纪念第一个正式offer",link:"http://bbs.yingjiesheng.com/thread-2049212-1-1.html",publishTime:"",tag:"求职攻略"},
                {title:"安永slp求职经验总结",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2047729&extra=page%3D1%26filter%3Dauthor%26orderby%3Ddateline",publishTime:"",tag:"求职攻略"},
                {title:"审计 | 安永北京审计求职全程经验，良心回馈愿能助力",link:"http://bbs.yingjiesheng.com/thread-2002937-1-1.html",publishTime:"",tag:"求职攻略"},
                {title:"安永FIDS2016届夏季招聘经验",link:"http://bbs.yingjiesheng.com/thread-1975709-1-1.html",publishTime:"",tag:"求职攻略"},
                {title:" Advisory | 刚面完安永的People Advisory Services，和大家分享一下经验",link:"https://mp.weixin.qq.com/s/KFoay7azDoFjO8r__OxQOg",publishTime:"2016/12/19",tag:"求职攻略"},
                {title:"刚入职安永，分享求职安永和可口可乐的经验给大家",link:"https://mp.weixin.qq.com/s/8n_cJSHv-n6KxjakNXZo3w",publishTime:"2016/11/18",tag:"求职攻略"},
                {title:"10 月 29 日面经！安永实习广州群面「如何为某超市制定扩张计划？」",link:"https://mp.weixin.qq.com/s/hvpaBUbSfM_K6GFzs46OtA",publishTime:"2016-11-02 ",tag:"求职攻略"},
                {title:"独家获取前安永经理撰写的「 四大面试解读」",link:"https://mp.weixin.qq.com/s/ZYAj6EC3kK3jlm7mzXTr6Q",publishTime:" 2016-10-24 ",tag:"求职攻略"},
                {title:"安永寒假实习的offer之路和后续实习种种感受",link:"https://mp.weixin.qq.com/s/SNlo4Cv8dMbWE33GZhSHqA",publishTime:"2016/10/23",tag:"求职攻略"},
                {title:"审计 | 安永audit寒假实习&return offer par面",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2109859&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2017/8/2 23:09",tag:"求职攻略"},
                {title:"审计 | EY+北京所+审计介绍",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2103783&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2017/6/3 20:40",tag:"求职攻略"},
                {title:"审计 | EY安永（郑州） 全过程 含PWC、DTT、KPMG",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2082539&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/12/4 17:44",tag:"求职攻略"},
                {title:"分享EY全程经验",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2100498&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2017/4/28 11:24",tag:"求职攻略"},
                {title:"安永E&Y（Zhengzhou） AC面+M面+PAR面 算是一点点经验吧",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2078206&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/11/27 16:41",tag:"求职攻略"},
                {title:"从寒假实习到提前收获正式Offer——网申第一天 和你聊聊我的经历",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2052069&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/9/1 21:54",tag:"求职攻略"},
                {title:"安永 offer get，回馈应届生",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2089437&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2017/1/4 22:15",tag:"求职攻略"},
                {title:"审计 |［已offer］2017校招BJ所审计全经验！",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2088485&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/12/29 10:45",tag:"求职攻略"},
                {title:"ax | 安永网申-笔试-面试-Offer全过程分享",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2086321&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/12/17 22:26",tag:"求职攻略"},
                {title:"Advisory | 9月开始投了四次EY，终于拿到offer，感激一切（补招经历分享+嘚啵嘚啵的感悟）",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2030122&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/1/19 11:51",tag:"求职攻略"},
                {title:"advisory | SH IT risk advisory（ac+m+par面经）等offer（包含DTT)",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2081315&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/11/30 16:17",tag:"求职攻略"},
                {title:"Tax | BJ TAX 跑完全程 收到offer  回馈论坛 保证干货！",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2072537&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/11/17 17:57",tag:"求职攻略"},
                {title:"审计 | BJ审计AC面+Par面面经，感谢应届生（已收offer）",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2068325&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/11/7 21:55",tag:"求职攻略"},
                {title:"advisory |  Risk北京所 AC+Par走完 一点经验分享",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2070063&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/11/11 16:43",tag:"求职攻略"},
                {title:"审计 | 安永 Audit网申+笔试+AC面+Par面+Tax经理面+Par面 经验大礼包",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2072289&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/11/17 0:25",tag:"求职攻略"},
                {title:"审计 | 校招句号，回赠论坛。SZ 安永offer",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2069673&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/11/10 18:54",tag:"求职攻略"},
                {title:"2016.7.13上海SLP面经",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2048765&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/7/24 23:24",tag:"求职攻略"},
                {title:"审计 | [已拿offer]2016广州SLP一日经验分享",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2048711&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/7/22 21:01",tag:"求职攻略"},
                {title:"审计 | 从寒假实习到2017全职offer",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2054035&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/9/17 22:49",tag:"求职攻略"},
                {title:"Tax | 2016SLP BJ Tax 纪念第一个正式offer",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2049212&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/7/31 19:29",tag:"求职攻略"},
                {title:"2016 EY GZ SLP 经验心得",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2049168&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/7/29 19:08",tag:"求职攻略"},
                {title:"2016.07.09 - 厦门SLP分享 - Phoebe",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2048400&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/7/20 16:32",tag:"求职攻略"},
                {title:"安永SLP经验分享",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2045813&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/6/17 18:57",tag:"求职攻略"},
                {title:"Advisory | 春招EY BJ 咨询FSRM 全流程",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2037948&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/4/7 15:56",tag:"求职攻略"},
                {title:"安永 SLP GZ 综合经验总结 已拿Offer",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2049681&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/8/4 22:35",tag:"求职攻略"},
                {title:"7.11广州场slp分享(offer get)",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2047872&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/7/14 20:12",tag:"求职攻略"},
                {title:"税务 | 2016.7.13 上海所已拿offer SLP总结",link:"http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2049061&extra=page%3D1%26filter%3Ddigest%26digest%3D1",publishTime:"2016/7/28 10:28",tag:"求职攻略"},
                {title:"Parthonon EY 电面",link:"http://bbs.yingjiesheng.com/thread-2058028-1-1.html",publishTime:"",tag:"求职攻略"},
                {title:"如何用系统思维实践“MECE分析法”",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654873335&idx=1&sn=bdac2cbadb4342c0ccc6bcd7b42a8178&scene=4",publishTime:"2016/4/29",tag:"求职攻略"},
                {title:"管理咨询顾问最常见的职业下一站",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874482&idx=1&sn=04d3a4a0267232543c9f8506926ed595&scene=4",publishTime:" 2016-07-03 ",tag:"求职攻略"},
                {title:"5分钟学习战略项目的内容、流程与方法",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874730&idx=1&sn=f35666c846f4b4cbad58a97532e2d520&scene=4",publishTime:"2016-07-22 ",tag:"求职攻略"},
                {title:"帮你分析咨询业申请的三大关卡：简历，case，behavior",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874334&idx=2&sn=762781c191074cd8b2ec929470218e89&scene=4",publishTime:"2016/6/24",tag:"求职攻略"},
                {title:"我为何从工程师转型成为咨询顾问？｜小灶学堂第9期",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654873862&idx=1&sn=8d87d0998298eb1917a70400777deea7&scene=4",publishTime:"2016/5/24",tag:"求职攻略"},
                {title:"所有咨询公司面试可能用到的分析结构",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874378&idx=2&sn=64e33ef21995383ed13118e95b94a5f4&scene=4",publishTime:"2016/6/26",tag:"求职攻略"},
                {title:"想去咨询行业求职，需要做哪些准备？",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=405123300&idx=2&sn=4c1b63b593bc5bd3fc012ddc3b6fd52c&scene=4",publishTime:"2016/2/16",tag:"求职攻略"},
                {title:"结构化思考工具 | 麦肯锡顾问的黄金思考方法",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874100&idx=1&sn=b04faf523a4bee9e0d51bc39fdeef661&scene=4",publishTime:"2016/6/12",tag:"求职攻略"},
                {title:"咨询从业人员解决问题的方法论有哪些？",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874210&idx=1&sn=b7c1443ff033c3b4442d774ebe410a3f&scene=4",publishTime:"2016-06-22 ",tag:"求职攻略"},
                {title:"一个3分钟咨询顾问的中文自我介绍｜小灶学堂第2期",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=403798731&idx=1&sn=0033f57d07ad94ab78a8831d27b26bc4&scene=4",publishTime:"2016/1/3",tag:"求职攻略"},
                {title:"干货贴 | 行业研究不会做？咨询顾问来教你（一）",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654875286&idx=1&sn=325c72b734e95a880b661a135f1e3989&chksm=f3bda47dc4ca2d6b558a8c99cc3e08a370e7d0abc1f27e26ef787023ade42dc8b5ed458f81f0&scene=4",publishTime:"2016/8/23",tag:"求职攻略"},
                {title:"干货贴 | 行业研究不会做？咨询顾问来教你（二）",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654875655&idx=3&sn=92d3a9385942b3a0dfce455c92b71168&chksm=f3bdbaecc4ca33fa7ec3c5e1410447ce545389e54fd1cfeb003552c7cee7c3072c51ab1e7d4c&scene=4",publishTime:"2016/9/17",tag:"求职攻略"},
                {title:"干货贴 | 行业研究不会做？咨询顾问来教你（三）",link:"https://mp.weixin.qq.com/s/VdcUsjJTNV8k9Q7UQScIhw",publishTime:"2016/11/1",tag:"求职攻略"}
            ]
        };
    }

    render(){
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/anyong.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="安永校招卡"/>
                <SchoolNav fromType="exp" processLink="/school/anyong/schoolprocess" workLink="/school/anyong/schoolWork" expLink="/school/anyong/schoolExp"/>
                <List list={this.state.list} />
            </div>
        );
    }
}