import React from 'react';
import Theme from '../../../../config/theme';
import { Flex, FlexItem } from 'react-weui';
import Footer from '../components/footer'

export default class AnswerPage extends React.Component {
    constructor(props) {
        super(props)

    }

    renderGlobalCss = () => {
        return (
            <style global jsx >{`
                .square-form {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
                .flex-item {
                    flex: 1;
                    margin-top: 12rem;
                }
                .square {
                    box-sizing: border-box;
                    height: 300px;
                    width: 300px;
                    border: 1px solid;
                    margin: 0 auto;
                    padding: 15px;

                }
                .inner-square {
                    height: 100%;
                    width: 100%;
                    background: #fff;
                    border: 1px solid #ccc;
                    color: #000;
                    text-align: center;
                }
                .score {
                    font-size: 20px;
                    font-weight: bold;
                }
                .score:first-child {
                    margin-top: 40px;
                }
                .big {
                    font-size: 70px;
                }
                .btn-form {
                    margin-top: 30px;
                }
                .img {
                    display: block;
                    margin-top: 30px;
                    background-image: url(/static/round-btn.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    width: 200px;
                    height: 50px;
                    margin: 0 auto;
                    color: #000;
                    text-align: center;
                    line-height: 35px;
                }
            `}</style>
        )
    }


    render() {
        return (
            <div className='square-form'>
                <div className="square">
                    <div className="inner-square">
                        <div className='score'>成功坚持笔试修炼第x天</div>
                        <div className='score'>打卡成功！</div>
                        <div className='score'>XXX您的今日笔试打卡成绩</div>
                        <div className='score big'>99分</div>
                    </div>
                    
                </div>
                <div className='btn-form'><a className='img'>分享到朋友圈</a></div>
                
                <Footer />
                {this.renderGlobalCss()}
            </div>
        );
    }
}