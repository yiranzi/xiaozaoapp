import React from 'react'
import NavBlock from './navBlock'
import Header from './header'
export default class navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      company: [
        {companyName: '毕马威', time: '2018校招已于9月初开启', tag: ['四大事务所'], image: '/static/school/kpmg.png', href: '/school/kpmg/schoolprocess'},
        {companyName: '普华永道', time: '2018校招已于8月15日开启', tag: ['四大事务所'], image: '/static/school/pwccn.png', href: '/school/pwccn/schoolprocess'},
        {companyName: '德勤', time: '2018校招已于9月1日开启', tag: ['四大事务所'], image: '/static/school/de.png', href: '/school/de/schoolprocess'},
        {companyName: '安永', time: '2018校招已于9月1日开启', tag: ['四大事务所'], image: '/static/school/anyong.png', href: '/school/anyong/schoolprocess'},
        {companyName: '玛氏', time: '2018校招已于9月4日开启', tag: ['快消'], image: '/static/school/mars.png', href: '/school/mars/schoolprocess'},
        {companyName: '联合利华', time: '2018校招已于9月1日开启', tag: ['快消'], image: '/static/school/un1.png', href: '/school/un/schoolprocess'},
        {companyName: '宝洁', time: '2018校招9月9日开启', tag: ['快消'], image: '/static/school/pg.png', href: '/school/pg/schoolprocess'},
        {companyName: '美世咨询', time: '2018校招预计10月份开启', tag: ['咨询'], image: '/static/school/mercer.png', href: '/school/mercer/schoolprocess'},
        {companyName: '麦肯锡', time: '2018校招预计10月份开启', tag: ['咨询'], image: '/static/school/mck.png', href: '/school/mck/schoolprocess'},
        {companyName: '京东', time: '2018校招已于7月22日开启', tag: ['互联网'], image: '/static/school/jd.png', href: '/school/jd/schoolprocess'},
        {companyName: '阿里巴巴', time: '2018校招已于07月21日开启', tag: ['互联网'], image: '/static/school/ali.jpg', href: '/school/ali/schoolprocess'},
        {companyName: '美团点评', time: '2018校招已于8月20日开启', tag: ['互联网'], image: '/static/school/meituan.png', href: '/school/meituan/schoolprocess'},
        {companyName: '招商银行', time: '2018校招已于7月22日开启', tag: ['银行/证券/基金/保险/投资公司'], image: '/static/school/zhaoshang.jpg', href: '/school/zhaoshang/schoolprocess'},
        {companyName: '汇丰银行', time: '2018校招已于9月6日开启', tag: ['金融'], image: '/static/school/hsbc.png', href: '/school/hsbc/schoolprocess'},
        {companyName: '渣打银行', time: '2018校招尚未开启', tag: ['银行/证券/基金/保险/投资公司'], image: '/static/school/zhada.png', href: '/school/zhada/schoolprocess'},
        {companyName: '强生', time: '2018校招已于9月11日开启', tag: ['医疗/健康/制药'], image: '/static/school/qiangsheng.jpg', href: '/school/qiangsheng/schoolprocess'},
        {companyName: '埃森哲', time: '2018校招尚未开启', tag: ['咨询'], image: '/static/school/acc.png', href: '/school/acc/schoolprocess'},
        {companyName: '贝恩', time: '2018校招已开启', tag: ['咨询'], image: '/static/school/bain.png', href: '/school/bain/schoolprocess'},
        {companyName: '滴滴出行', time: '已于8月31日开启网申', tag: ['互联网'], image: '/static/school/didi.png', href: '/school/didi/schoolprocess'},
        {companyName: '福特', time: '已于9月8日开启网申', tag: ['汽车/车联网/智能交通'], image: '/static/school/ford.png', href: '/school/ford/schoolprocess'},
        {companyName: '一汽大众', time: '已于8月30日开启网申', tag: ['汽车/车联网/智能交通'], image: '/static/school/yiqi.png', href: '/school/yiqi/schoolprocess'},
        {companyName: '立信', time: '已于8月18日开启网申', tag: ['会计师事务所/咨询/法律/其他专业服务'], image: '/static/school/bdo.png', href: '/school/bdo/schoolprocess'},
        {companyName: '天职', time: '预计9月中下旬开启网申', tag: ['会计师事务所/咨询/法律/其他专业服务'], image: '/static/school/tianzhi.png', href: '/school/tianzhi/schoolprocess'},
        {companyName: '致同', time: '已经开启，于9月18日截止', tag: ['会计师事务所'], image: '/static/school/zhitong.png', href: '/school/zhitong/schoolprocess'},
        {companyName: '尼尔森', time: '请登录尼尔森官网查看', tag: ['咨询'], image: '/static/school/nier.png', href: '/school/nier/schoolprocess'},
        {companyName: '欧莱雅', time: '9月1日开启网申，10月26日结束网申', tag: ['消费品/零售/贸易'], image: '/static/school/oulaiya.png', href: '/school/olaiya/schoolprocess'},
        {companyName: '雀巢', time: '9月开启网申，12月结束', tag: ['消费品/零售/贸易'], image: '/static/school/quechao.png', href: '/school/quechao/schoolprocess'},
        {companyName: '卡夫亨氏', time: '9月11日开始网申，10月20日结束', tag: ['消费品/零售/贸易'], image: '/static/school/kafu.png', href: '/school/kafu/schoolprocess'},
        {companyName: '可口可乐', time: '9月4日开始网申，10月21日结束', tag: ['消费品/零售/贸易'], image: '/static/school/kekou.png', href: '/school/kekou/schoolprocess'},
        {companyName: '百威英博', time: '9月已开启，10月结束', tag: ['消费品/零售/贸易'], image: '/static/school/baiwei.png', href: '/school/baiwei/schoolprocess'},
        {companyName: '蚂蚁金服', time: '', tag: ['互联网'], image: '/static/school/ant.png', href: '/school/ant/schoolprocess'},
        {companyName: '奇虎360', time: '08月14日开启', tag: ['互联网'], image: '/static/school/qihu.png', href: '/school/qihu/schoolprocess'},
        {companyName: '搜狐', time: '08月07日开启', tag: ['互联网'], image: '/static/school/sohu.png', href: '/school/sohu/schoolprocess'},
        {companyName: '腾迅', time: '07月27日开启', tag: ['互联网'], image: '/static/school/tt.png', href: '/school/tt/schoolprocess'},
        {companyName: '唯品会', time: '07月22日开启网申', tag: ['互联网'], image: '/static/school/vip.png', href: '/school/vip/schoolprocess'},
        {companyName: '携程', time: '2017年08月22日开启网申', tag: ['互联网'], image: '/static/school/xiecheng.png', href: '/school/xiecheng/schoolprocess'},
        {companyName: '小红书', time: '已于9月7日开始', tag: ['互联网'], image: '/static/school/redBook.png', href: '/school/redBook/schoolprocess'}
      ],
      trade: ['四大事务所', '快消', '咨询', '互联网', '银行/证券/基金/保险/投资公司', '医疗/健康/制药', '汽车/车联网/智能交通', '金融', '会计师事务所/咨询/法律/其他专业服务', '会计师事务所','消费品/零售/贸易']
    }
  }
  render () {
    function renderHeader (company, title) {
      return company.filter(item => item.tag.includes(title)).map((item, key) =>
        <NavBlock CompanyName={item.companyName} Image={item.image} Time={item.time} Href={item.href} key={key} />)
    }
    function renderBlock (item) {
      switch (item) {
        case '四大事务所': return sida
        case '快消': return kuaixiao
        case '咨询': return zixun
        case '互联网': return hulianwang
        case '银行/证券/基金/保险/投资公司': return bank
        case '医疗/健康/制药': return med
        case '汽车/车联网/智能交通': return car
        case '金融': return fin
        case '会计师事务所/咨询/法律/其他专业服务': return kuaiji
        case '会计师事务所': return kuai
        case '消费品/零售/贸易': return xiaofei
      }
    }
    const sida = renderHeader(this.state.company, '四大事务所')
    const kuaixiao = renderHeader(this.state.company, '快消')
    const zixun = renderHeader(this.state.company, '咨询')
    const hulianwang = renderHeader(this.state.company, '互联网')
    const bank = renderHeader(this.state.company, '银行/证券/基金/保险/投资公司')
    const med = renderHeader(this.state.company, '医疗/健康/制药')
    const car = renderHeader(this.state.company, '汽车/车联网/智能交通')
    const fin = renderHeader(this.state.company, '金融')
    const kuaiji = renderHeader(this.state.company, '会计师事务所/咨询/法律/其他专业服务')
    const kuai = renderHeader(this.state.company, '会计师事务所')
    const xiaofei = renderHeader(this.state.company, '消费品/零售/贸易')
    return (
      <div className='wrapper'>
        <h2>小灶学员求职攻略合集</h2>
        <div>仅面向小灶学员开放</div>
        {this.state.trade.map((item, key) => <Header title={item} key={key}>{renderBlock(item)}</Header>) }
        <div className='nav__footer'>
          <p>更多企业的攻略和工作体验将会陆续上线</p>
          你有什么建议，可以添加小灶产品经理Frank反馈(微信:xiaozaoPM)
        </div>
        <style jsx>{`
          h2 {
            text-align:center;
            font-weight:300;
            margin-top:15px;
          }
          h2 + div {
            color:#BFBFBF;
            font-size:0.9rem;
            text-align:center;
          }
          .block {
            margin:10px 20px;
          }
          header {
            background-color:#F4F6FA;
            color:#838589;
            margin-top:10px;
            padding:5px 0px 5px 15px;
            border-radius:10px;
            border:1px solid #BFBFBF;
          }
          .nav__footer {
            font-size:0.8rem;
            padding:30px;
            color:#cbcfe0;
            text-align:center;
          }
        `}</style>
      </div>
    )
  }
}
