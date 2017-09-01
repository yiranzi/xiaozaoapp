import React from 'react';
import Theme from '../../../../config/theme';
import Footer from '../components/footer'
export default class extends React.Component {

    constructor(props) {
        super(props)
        const { completeDay, startDay, endDay } = props.info
        const duringDay = endDay - startDay
        for(let i = completeDay.length; i < duringDay; i++) {
            completeDay.push(0)
        }
        this.state = {
            dates: completeDay
        }
    }
    
    renderDate = () => {
        return this.state.dates.map((item, index) => {
            const classname = 'date-item ' + (item && 'checked')
            return (
                <div key={index} className={classname}>{index + 1}</div>
            )
        })
    }
    
    renderGlobalCss() {
        return (
            <style jsx global>{`
                .written-test-clock {
                    padding: 0!important;
                }
                .daily-clock-in-form {
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    flex-direction: column;
                }
                .sub-form {
                    width: 90vw;
                    padding: 0 10px;
                    margin-bottom: 30px;
                }
                .sub-form:first-child {
                    margin-top: 30px;
                }
                .date-form {
                    display: flex;
                }
                .date-item {
                    height: 52px;
                    width: -webkit-fill-available;
                    margin-right: 1px;
                    background: rgb(191, 192, 193);
                    color: #fff;
                    text-align: center;
                    line-height: 52px;
                }
                .checked {
                    background: ${Theme.color.writtentestclockmain};
                }
                .content-wrapper {
                    padding: 25px 15px;
                    border: 1px solid ${Theme.color.writtentestclockmain};
                    position: relative;
                }
                .flex-wrapper {
                    display: flex;
                    padding: 25px 126px 25px 15px;
                }
                .wrapper-trangle {
                    position: absolute;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-bottom: 20px solid ${Theme.color.writtentestclockmain};
                    top: -20px;
                    left: 65px;
                }
                .wrapper-trangle span {
                    display: block;
                    position: absolute;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-bottom: 20px solid rgb(29, 29, 29);
                    top: 2px;
                    left: -15px;
                }
                .qr-code {
                    background: #fff;
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    right: 1rem;
                    top: 1rem;
                    border: 1px solid ${Theme.color.writtentestclockmain};
                }
                .qr-code img{
                    width: 100px;
                    height: 100px;
                }
                .comment{
                    white-space:normal;
                    word-break:break-all;
                    word-wrap:break-word; 
                }
                .prize {
                    background-image: url(/static/prize.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    width: 10rem;
                    height: 4rem;
                }
                .study-no-title {
                    width: 55px;
                }
                .study-no {
                    display: inline-block;
                    word-break: break-all;
                }
            `}</style>
        )
    }

    render() {

        const { no, groupNo, testResult, evaluationResult } = this.props.info
        return (
            <div className='daily-clock-in-form'>
                <div className='sub-form'>
                    <div className='title'>打卡记录</div>
                    <div className='date-form'>{this.renderDate()}</div>
                </div>
                <div className='sub-form'>
                    <div className='title'>我的信息</div>
                    <div className='content-wrapper flex-wrapper'>
                        <div className='study-no-title'>学号：</div><span className='study-no'>{no}</span>
                        <div className='wrapper-trangle'><span></span></div>
                        <div className='qr-code'>
                            <img src='/static/demo-qr-code.png'/>
                        </div>
                    </div>
                </div>
                <div className='sub-form'>
                    <div className='title'>我的成绩</div>  
                    <div className='content-wrapper'>
                        <div className='wrapper-trangle'><span></span></div>
                        <div>入学前测评：</div>
                        <div className='comment'>{evaluationResult || ''}</div>
                        <div>活动后测试：</div>
                        <div className='comment'>{testResult || ''}</div>

                    </div> 
                </div>
                <a className='prize'></a>
                <Footer/>
                {this.renderGlobalCss()}
               
            </div>
        );
    }
}