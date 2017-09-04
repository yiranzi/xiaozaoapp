import React from 'react';
import ShareWx from '../../../components/sharewx';
import AnswerAction from '../../../../src/action/writtentestclock/answer';

export default class TestResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            testInfo: null,
            shareIsShow: false,
            exceeds: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 42, 44, 46, 48, 51, 54, 57, 60, 63, 65, 67, 69, 72, 75, 77, 80, 82, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 100],
            showPage: false
        }
    }

    componentDidMount() {
        const _this = this;
        AnswerAction.getEvaluation().then((res) => {
            _this.setState({
                testInfo: res,
                showPage: true
            });
        });
    }

    shareWx = () => {
        this.setState({
            shareIsShow: true
        });
    }

    render() {
        if(!this.state.showPage) return <div></div>
        const {testInfo} = this.state;
        const content = this.state.testInfo.totalScore >= 65 ? '实力总是需要有人见证的！' : '从这一刻开始改变！'
        const accuracy = !testInfo ? 0 : (!testInfo.writtenTestTopicDTOList || testInfo.writtenTestTopicDTOList.length == 0) ? 0 : Math.round(testInfo.totalScore / testInfo.writtenTestTopicDTOList.length * 100);
        return (
            <div>
                <ShareWx isShow={this.state.shareIsShow}/>
                <div className="test-result">
                    <img className="result-bg" src="/static/writtentestclock/test_result_bg.png"/>
                    <div className="result-content">
                        <div className="text1">恭喜您本次测试答对 {this.state.testInfo ? this.state.testInfo.totalScore : 0} 道题<br/>总正确率{accuracy}%！</div>
                        <div className="text2">小伙伴，你的笔试答题战斗力<br/>超过了{this.state.exceeds[accuracy]}%的笔试打卡学习者！</div>
                        <a className='btn1' href="javascript:;" onClick={this.shareWx}><img src="/static/writtentestclock/share.png"/></a>
                        <div className="text2">{content}<br/>少侠，笔试训练也是一个打怪升级的过程</div>
                        <br/>
                        <div className="text2"><span className="small">//////////</span> 您目前最适合进入 <span className="small">//////////</span><br/>
                            全能提升基础班
                        </div>
                        <a className='btn2' href="/writtentestclock/clock-in-intro"><img src="/static/writtentestclock/start_writtentest.png"/></a>
                    </div>
                </div>
                <style jsx>{`
                    .written-test-clock {
                        padding: 0!important;
                    }
                    .test-result {
                        padding: 50px 0;
                        position: relative;
                    }
                    .result-bg {
                        width: 100%;
                    }
                    .result-content {
                        position: absolute;
                        top: 80px;
                        left: 8px;
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
            </div>
        );
    }
}