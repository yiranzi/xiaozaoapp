import React from 'react';

export default class navigation extends React.Component {
  render () {
    return (
      <div className='wrapper'>
        <h2>小灶学员求职攻略合集</h2>
        <div>仅面向小灶学员开放</div>
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
          .container {
            display:flex;
          }
          img {
            width:80px;
            height:80px;
          }
          .right {
            display:flex;
            flex-direction:column;
            justify-content:center;
            margin-left:10px;
          }
          .right a + span {
            color:#BFBFBF;
            font-size:0.8rem;
            padding-left:10px;
          }
          .work,.exp {
            color:#79A1E1;
            font-size:0.8rem;
            position:relative;
            margin-left:5px;
          }
          .exp {
            margin-left:30px;
          }
          .work:before,.exp:before {
            content:"";
            width:4px;
            height:4px;
            border-radius:100%;
            border:1px solid #79A1E1;
            display:inline-block;
            position:absolute;
            top:5px;
            left:-8px;
          }
          .nav__footer {
            font-size:0.8rem;
            padding:30px;
            color:#cbcfe0;
            text-align:center;
          }
          .container {
            margin-top:20px;
            width: 90%;
            margin-left: auto;
            margin-right: auto;
          }
        `}</style>
      </div>
    );
  }
}
