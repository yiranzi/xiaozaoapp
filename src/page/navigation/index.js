import React from 'react';
import NavBlock from './navBlock';
import Header from './header';
export default class navigation extends React.Component {
  constructor (props) {
    super(props);
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
        {companyName: '尼尔森', time: '请登录尼尔森官网查看', tag: ['咨询'], image: '/static/school/nier.png', href: '/school/nier/schoolprocess'}
      ],
      trade: ['四大事务所', '快消', '咨询', '互联网', '银行/证券/基金/保险/投资公司', '医疗/健康/制药', '汽车/车联网/智能交通', '金融', '会计师事务所/咨询/法律/其他专业服务', '会计师事务所']
    };
  }
  render () {
    function renderHeader (company, title) {
      return company.filter(item => item.tag.includes(title)).map((item, key) =>
        <NavBlock CompanyName={item.companyName} Image={item.image} Time={item.time} Href={item.href} key={key} />);
    }
    function renderBlock (item) {
      switch (item) {
        case '四大事务所': return sida;
        case '快消': return kuaixiao;
        case '咨询': return zixun;
        case '互联网': return hulianwang;
        case '银行/证券/基金/保险/投资公司': return bank;
        case '医疗/健康/制药': return med;
        case '汽车/车联网/智能交通': return car;
        case '金融': return fin;
        case '会计师事务所/咨询/法律/其他专业服务': return kuaiji;
        case '会计师事务所': return kuai;
      }
    }
    const sida = renderHeader(this.state.company, '四大事务所');
    const kuaixiao = renderHeader(this.state.company, '快消');
    const zixun = renderHeader(this.state.company, '咨询');
    const hulianwang = renderHeader(this.state.company, '互联网');
    const bank = renderHeader(this.state.company, '银行/证券/基金/保险/投资公司');
    const med = renderHeader(this.state.company, '医疗/健康/制药');
    const car = renderHeader(this.state.company, '汽车/车联网/智能交通');
    const fin = renderHeader(this.state.company, '金融');
    const kuaiji = renderHeader(this.state.company, '会计师事务所/咨询/法律/其他专业服务');
    const kuai = renderHeader(this.state.company, '会计师事务所');
    return (
      <div className='wrapper'>
        <h2>小灶学员求职攻略合集</h2>
        <div>仅面向小灶学员开放</div>
<<<<<<< 3004cee318ef336f39b8393311f4e6c51b43cdba
        <section className='block'>
          <header>四大事务所</header>
          <div className='container'>
            <img src='/static/school/kpmg.png' />
            <div className='right'>
              <div><a>毕马威</a><span>2018校招已于9月初开启</span></div>
              <div><a className='work' href='/school/kpmg/schoolWork'>工作体验</a><a className='exp'
                href='/school/kpmg/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
          <div className='container'>
            <img src='/static/school/pwccn.png' />
            <div className='right'>
              <div><a>普华永道</a><span>2018校招已于8月15日开启</span></div>
              <div><a className='work' href='/school/pwccn/schoolWork'>工作体验</a><a className='exp'
                href='/school/pwccn/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
          <div className='container'>
            <img src='/static/school/de.png' />
            <div className='right'>
              <div><a>德勤</a><span>2018校招已于9月1日开启</span></div>
              <div><a className='work' href='/school/de/schoolWork'>工作体验</a><a className='exp'
                href='/school/de/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
          <div className='container'>
            <img src='/static/school/anyong.png' />
            <div className='right'>
              <div><a>安永</a><span>2018校招已于9月1日开启</span></div>
              <div><a className='work' href='/school/anyong/schoolWork'>工作体验</a><a className='exp'
                href='/school/anyong/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
        </section>
        <section className='block'>
          <header>快消</header>
          <div className='container'>
            <img src='/static/school/mars.png' />
            <div className='right'>
              <div><a>玛氏</a><span>2018校招已于9月4日开启</span></div>
              <div><a className='work' href='/school/mars/schoolWork'>工作体验</a><a className='exp'
                href='/school/mars/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
          <div className='container'>
            <img src='/static/school/un1.png' />
            <div className='right'>
              <div><a>联合利华</a><span>2018校招已于9月1日开启</span></div>
              <div><a className='work' href='/school/un/schoolWork'>工作体验</a><a className='exp'
                href='/school/un/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
          <div className='container'>
            <img src='/static/school/pg.png' />
            <div className='right'>
              <div><a>宝洁</a><span>2018校招9月9日开启</span></div>
              <div><a className='work' href='/school/pg/schoolWork'>工作体验</a><a className='exp' href='/school/pg/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
        </section>
        <section className='block'>
          <header>咨询</header>
          <div className='container'>
            <img src='/static/school/mercer.png' alt='' />
            <div className='right'>
              <div><a>美世咨询</a><span>2018校招预计10月份开启</span></div>
              <div><a className='work' href='/school/mercer/schoolWork'>工作体验</a><a className='exp'
                href='/school/mercer/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
          <div className='container'>
            <img src='/static/school/mck.png' />
            <div className='right'>
              <div><a>麦肯锡</a><span>2018校招预计10月份开启</span></div>
              <div><a className='work' href='/school/mck/schoolWork'>工作体验</a><a className='exp'
                href='/school/mck/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
        </section>
        <section className='block'>
          <header>互联网</header>
          <div className='container'>
            <img src='/static/school/jd.png' alt='' />
            <div className='right'>
              <div><a>京东</a><span>2018校招已于7月22日开启</span></div>
              <div><a className='work' href='/school/jd/schoolWork'>工作体验</a><a className='exp'
                href='/school/jd/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
          <div className='container'>
            <img src='/static/school/ali.jpg' alt='' />
            <div className='right'>
              <div><a>阿里巴巴</a><span>2018校招已于07月21日开启</span></div>
              <div><a className='work' href='/school/ali/schoolWork'>工作体验</a><a className='exp'
                                                                               href='/school/ali/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
        </section>
        <section className='block'>
          <header>银行/证券/基金/保险/投资公司</header>
          <div className='container'>
            <img src='/static/school/zhaoshang.jpg' alt='' />
            <div className='right'>
              <div><a>招商银行</a><span>2018校招已于7月22日开启</span></div>
              <div><a className='work' href='/school/zhaoshang/schoolWork'>工作体验</a><a className='exp'
                href='/school/zhaoshang/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
          <div className='container'>
            <img src='/static/school/zhada.png' alt='' />
            <div className='right'>
              <div><a>渣打银行</a><span>2018校招尚未开启</span></div>
              <div><a className='work' href='/school/zhada/schoolWork'>工作体验</a><a className='exp'
                                                                                      href='/school/zhada/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
        </section>
        <section className='block'>
          <header>医疗/健康/制药</header>
          <div className='container'>
            <img src='/static/school/qiangsheng.jpg' alt='' />
            <div className='right'>
              <div><a>强生</a><span>2018校招已于9月1日开启</span></div>
              <div><a className='work' href='/school/qiangsheng/schoolWork'>工作体验</a><a className='exp'
                href='/school/qiangsheng/schoolExp'>面经/笔经</a>
              </div>
            </div>
          </div>
        </section>
=======
        {this.state.trade.map((item, key) => <Header title={item} key={key}>{renderBlock(item)}</Header>) }
>>>>>>> update:add company and refactor the code
        <div className='nav__footer'>
          <p>更多企业的攻略和工作体验讲在9月初上线</p>
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
    );
  }
}
