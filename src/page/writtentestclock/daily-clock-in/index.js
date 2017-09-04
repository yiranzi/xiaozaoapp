import React from 'react';
import Theme from '../../../../config/theme';
import Footer from '../components/footer'
import UserAction from '../../../../src/action/writtentestclock/user';
export default class extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            dates: [],
            showTips: false,
            tipsMsg: '',
            showPage: false
        }
    }

    componentDidMount() {
        const _this = this;
        UserAction.getInfo()
        .then(info => {
            const { completeDay, startDay, endDay } = info
            const duringDay = endDay - startDay
            for(let i = completeDay.length; i <= duringDay; i++) {
                completeDay.push(0)
            }
            _this.setState({
                ...info,
                dates: completeDay,
                showPage: true
            })
        })
        .catch(error => {
            _this.setState({
                error: true,
                showPage: true,
                tipsMsg: error.message,
                showTips: true
            });
        })
    }
    
    renderDate = () => {
        return this.state.dates.map((item, index) => {
            const classname = 'date-item ' + (item && 'checked')
            return (
                <div key={index} className={classname}>
                    {index + 1}
                    <style jsx>{`
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
                    `}</style>
                </div>
            )
        })
    }
    

    render() {
        const { showPage } = this.state
        if(!showPage) return <div></div>

        const { no, groupNo, testResult, evaluationResult } = this.state
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
                            <img src={`/static/writtentestclock/qr-code/${groupNo}.jpg`}/>
                        </div>
                    </div>
                </div>
                <div className='sub-form'>
                    <div className='title'>我的成绩</div>  
                    <div className='content-wrapper'>
                        <div className='wrapper-trangle'><span></span></div>
                        <div>入学前测评：{evaluationResult || ''}</div>
                        <div>活动后测试：{testResult || ''}</div>

                    </div> 
                </div>
                <a className='prize'></a>
                <Footer/>
                <style jsx>{`
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
                    .prize {
                        background-image: url(/static/writtentestclock/prize.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        width: 200px;
                        height: 80px;
                    }
                    .study-no-title {
                        width: 55px;
                    }
                    .study-no {
                        display: inline-block;
                        word-break: break-all;
                    }
                `}</style>
               
            </div>
        );
    }
}