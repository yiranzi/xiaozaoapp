import React from 'react';
import Footer from '../components/footer'
import ShareWx from '../../../components/sharewx';

export default class AnswerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shareIsShow: false
        }
    }

    shareWx = () => {
        this.setState({
            shareIsShow: true
        });
    }

    renderCss = () => {
        return (
            <style jsx >{`
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
                .big {
                    font-size: 70px;
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
        )
    }


    render() {
        const {testInfo} = this.props;
        console.log(testInfo);
        //const accuracy = Math.round(testInfo.totalScore / testInfo.writtenTestTopicDTOList.length * 100);
        return (
            <div className='square-form'>
                <ShareWx isShow={this.state.shareIsShow}/>
                <div className="square">
                    <div className="inner-square">
                        <div className='score'>成功坚持笔试修炼第<span className="day">3</span>天</div>
                        <div className='score'>打卡成功！</div>
                        <div className='score'>您的今日笔试打卡成绩</div>
                    </div>
                </div>
                <div className="correct-rate">
                    <img className="correct-bg" src="/static/writtentestclock/clock_result_bg2.png"/>
                    <div className="data1">xx%正确率</div>
                    <div className="data2">击败了超过xx%的参与者</div>
                    <div className='btn-form'><a className='img' href="javascript:;" onClick={this.shareWx}>分享到朋友圈</a></div>
                </div>

                <Footer />
                {this.renderCss()}
            </div>
        );
    }
}