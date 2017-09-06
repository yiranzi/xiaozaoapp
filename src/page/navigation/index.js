import React from 'react';

export default class navigation extends React.Component {
    render(){
        return (
            <div className="wrapper">
                <h2>小灶学员求职攻略合集</h2>
                <div>仅面向小灶学员开放</div>
                <section className="block">
                    <header>四大事务所</header>
                    <div className="container">
                        <img src="/static/school/kpmg.png" />
                        <div className="right">
                            <div><a>毕马威</a><span>2018校招已与9月初开启</span></div>
                            <div><a className="work" href="/school/kpmg/schoolWork/index.html">工作体验</a><a className="exp" href="/school/kpmg/schoolExp/index.html">面经/笔经</a></div>
                        </div>
                    </div>
                    <div className="container">
                        <img src="/static/school/pwccn.png" />
                        <div className="right">
                            <div><a>普华永道</a><span>2018校招已与8月15日开启</span></div>
                            <div><a className="work" href="/school/pwccn/schoolWork/index.html">工作体验</a><a className="exp" href="/school/pwccn/schoolExp/index.html">面经/笔经</a></div>
                        </div>
                    </div>
                    <div className="container">
                        <img src="/static/school/de.png" />
                        <div className="right">
                            <div><a>德勤</a><span>2018校招已与9月1日开启</span></div>
                            <div><a className="work" href="/school/de/schoolWork/index.html">工作体验</a><a className="exp" href="/school/de/schoolExp/index.html">面经/笔经</a></div>
                        </div>
                    </div>
                    <div className="container">
                        <img src="/static/school/anyong.png" />
                        <div className="right">
                            <div><a>安永</a><span>2018校招已与9月1日开启</span></div>
                            <div><a className="work" href="/school/anyong/schoolWork/index.html">工作体验</a><a className="exp" href="/school/anyong/schoolExp/index.html">面经/笔经</a></div>
                        </div>
                    </div>
                </section>
                <section className="block">
                    <header>快消</header>
                    <div className="container">
                        <img src="/static/school/mars.png" />
                        <div className="right">
                            <div><a>玛氏</a><span>2018校招已与9月初开启</span></div>
                            <div><a className="work" href="/school/mars/schoolWork/index.html">工作体验</a><a className="exp" href="/school/mars/schoolExp/index.html">面经/笔经</a></div>
                        </div>
                    </div>
                    <div className="container">
                        <img src="/static/school/un1.png" />
                        <div className="right">
                            <div><a>联合利华</a><span>2018校招已与8月15日开启</span></div>
                            <div><a className="work" href="/school/un/schoolWork/index.html">工作体验</a><a className="exp" href="/school/un/schoolExp/index.html">面经/笔经</a></div>
                        </div>
                    </div>
                </section>
                <section className="block">
                    <header>咨询</header>
                    <div className="container">
                        <img src="/static/school/mercer.png" alt=""/>
                        <div className="right">
                            <div><a>美世咨询</a><span>2018校招已与9月初开启</span></div>
                            <div><a className="work" href="/school/mercer/schoolWork/index.html">工作体验</a><a className="exp" href="/school/mercer/schoolExp/index.html">面经/笔经</a></div>
                        </div>
                    </div>
                    <div className="container">
                        <img src="/static/school/mck.png" />
                        <div className="right">
                            <div><a>麦肯锡</a><span>2018校招已与8月15日开启</span></div>
                            <div><a className="work" href="/school/mck/schoolWork/index.html">工作体验</a><a className="exp" href="/school/mck/schoolExp/index.html">面经/笔经</a></div>
                        </div>
                    </div>
                </section>
                <div className="nav__footer">
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
                        margin:0 20px;
                    }
                    header {
                        background-color:#F4F6FA;
                        color:#838589;
                        margin-top:10px;
                        padding:5px 0px 5px 15px;
                        border-radius:5px;
                        border:1px solid #BFBFBF;
                    }
                    .container {
                        display:flex;
                    }
                    img {
                        width:100px;
                        height:100px;
                    }
                    .right {
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        margin-left:5px;
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
                `}</style>
            </div>
        );
    }
}