import React from 'react';
import Footer from '../components/footer'
import ShareWx from '../../../components/sharewx';
import AnswerAction from '../../../../src/action/writtentestclock/answer';
import UserAction from '../../../../src/action/writtentestclock/user';

export default class AnswerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todayInfo: null,
            todayNo: 1,
            shareIsShow: false,
            exceeds: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 42, 44, 46, 48, 51, 54, 57, 60, 63, 65, 67, 69, 72, 75, 77, 80, 82, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 100]
        }
    }

    componentDidMount() {
        const _this = this;
        AnswerAction.getToday().then((res) => {
            _this.setState({todayInfo: res});
        });
        UserAction.getHistory().then((res) => {
            if(res.state == 200) {
                _this.setState({todayNo: res.completeDay.length + 1});
            }
        });
    }

    shareWx = () => {
        this.setState({
            shareIsShow: true
        });
    }

    render() {
        const {todayInfo} = this.state;
        const accuracy = !todayInfo ? 0 : todayInfo.writtenTestTopicDTOList.length == 0 ? 0 : Math.round(todayInfo.totalScore / todayInfo.writtenTestTopicDTOList.length * 100);
        return (
            <div className='square-form'>
                <ShareWx isShow={this.state.shareIsShow}/>
                <div className="square">
                    <div className="inner-square">
                        <div className='score'>成功坚持笔试修炼第<span className="day">{this.state.todayNo}</span>天</div>
                        <div className='score'>打卡成功！</div>
                        <div className='score'>您的今日笔试打卡成绩</div>
                    </div>
                </div>
                <div className="correct-rate">
                    <img className="correct-bg" src="/static/writtentestclock/clock_result_bg2.png"/>
                    <div className="data1">{accuracy}%正确率</div>
                    <div className="data2">击败了超过{this.state.exceeds[accuracy]}%的参与者</div>
                    <div className='btn-form'><a className='img' href="javascript:;" onClick={this.shareWx}>分享到朋友圈</a></div>
                </div>

                <Footer />
                <style jsx>{`
                    .written-test-clock {
                        padding: 0!important;
                    }
                    .square-form {

                    }
                    .flex-item {
                        flex: 1;
                        margin-top: 12rem;
                    }
                    .square {
                        width: 100%;
                        text-align: center;
                    }
                    .inner-square {
                        background-image: url(/static/writtentestclock/clock_result_bg.png);
                        background-size: 100% 100%;
                        padding: 55px 0 70px;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .score:first-child {

                    }
                    .score .day {
                        background-color: #45cd17;
                        border-radius: 50%;
                        margin: 0 6px;
                        color: #fff;
                        padding: 0 7px;
                    }
                    .btn-form {
                        margin: 30px 0;
                    }
                    .img {
                        display: block;
                        margin-top: 30px;
                        background-image: url(/static/writtentestclock/round-btn.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        width: 200px;
                        height: 50px;
                        margin: 0 auto;
                        color: #000;
                        text-align: center;
                        line-height: 35px;
                    }
                    .correct-rate {
                        margin-top: 30px;
                        position: relative;
                        text-align: center;
                    }
                    .correct-bg {
                        width: 85%;
                        height: auto;
                    }
                    .correct-rate .data1 {
                        position: absolute;
                        top: 1px;
                        text-align: center;
                        width: 100%;
                        color: #fff;
                    }
                    .correct-rate .data2 {
                        position: absolute;
                        top: 55px;
                        text-align: center;
                        width: 100%;
                        color: #fff;
                    }
                `}</style>
            </div>
        );
    }
}