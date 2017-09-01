import React from 'react';
import ShareWx from '../../../components/sharewx';

export default class TestResultPage extends React.Component {
    constructor(props) {
        super(props);

        const {testInfo} = this.props;
        this.state = {
            shareIsShow: false
        }
    }

    shareWx = () => {
        this.state = {
            shareIsShow: !this.state.shareIsShow
        }
    }

    renderCss = () => {
        return (
            <style jsx>{`
                .written-test-clock {
                    padding: 0!important;
                }
                .test-result {
                    padding: 50px 15px;
                    position: relative;
                }
                .result-bg {
                    width: 100%;
                }
                .result-content {
                    position: absolute;
                    top: 90px;
                    width: 100%;
                    text-align: center;
                }
                .test-result .btn1 {

                }
                .test-result .btn1 img {
                    width: 160px;
                    margin: 20px 0;
                }
                .test-result .btn2 {

                }
                .test-result .btn2 img {
                    width: 200px;
                    margin: 20px 0 15px;
                }
                .test-result .text1 {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
                .test-result .text2 {
                    font-size: 14px;
                    color: #333;
                }
                .test-result .text2 .small {
                    font-size: 10px;
                    color: #aaa;
                }
            `}</style>
        )
    }

    render() {
        const {testInfo} = this.props;
        console.log(testInfo);
        //const accuracy = Math.round(testInfo.totalScore / testInfo.writtenTestTopicDTOList.length * 100);
        return (
            <div>
                <ShareWx isShow={this.state.shareIsShow}/>
                <div className="test-result">
                    <img className="result-bg" src="/static/test_result_bg.png"/>
                    <div className="result-content">
                        <div className="text1">恭喜您本次测试答对{this.props.testInfo.totalScore}道题<br/>总正确率xx%！</div>
                        <div className="text2">小伙伴，你的笔试答题战斗力<br/>超过了xx%的笔试打卡学习者！</div>
                        <a className='btn1' href="javascript:;" onClick={this.shareWx}><img src="/static/share.png"/></a>
                        <div className="text2">实力总是需要有人见证的！<br/>（从这一刻开始改变）<br/>少侠，笔试训练也是一个打怪升级的过程</div>
                        <br/>
                        <div className="text2"><span className="small">//////////</span> 您目前最适合进入 <span className="small">//////////</span><br/>
                            全能提升基础班
                        </div>
                        <a className='btn2' href="/writtentestclock/test-result"><img src="/static/start_writtentest.png"/></a>
                    </div>
                </div>
                {this.renderCss()}
            </div>
        );
    }
}